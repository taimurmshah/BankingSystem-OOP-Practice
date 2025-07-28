const BankingSystemInterface = require('./bankingSystemInterface');

class BankingSystem extends BankingSystemInterface {
    constructor() {
        super();

        this.accounts = {};
        this.allPayments = [];
    }

    createAccount(timestamp, accountId) {
        if (this.accounts[accountId]) return false;

        this.accounts[accountId] = {
            balance: 0,
            totalOutgoing: 0,
            createdAt: timestamp
        }

        return true
    }

    deposit(timestamp, accountId, amount) {
        if (!this.accounts[accountId]) return null

        //execute payments that are scheduled before current transaction
        this._executeScheduledPayments(timestamp)

        this.accounts[accountId].balance += amount

        return this.accounts[accountId].balance
    }

    transfer(timestamp, sourceAccountId, targetAccountId, amount) {
        //execute scheduled payments before moving forward
        this._executeScheduledPayments(timestamp)

        //if either account doesn't exist
        if (!this.accounts[sourceAccountId] || !this.accounts[targetAccountId]) return null
        //if the accountIds are the same
        if (sourceAccountId == targetAccountId) return null
        //insufficient funds
        if (this.accounts[sourceAccountId].balance < amount) return null

        this.accounts[sourceAccountId].balance -= amount
        this.accounts[sourceAccountId].totalOutgoing += amount

        this.accounts[targetAccountId].balance += amount

        return this.accounts[sourceAccountId].balance
    }

    schedulePayment(timestamp, accountId, amount, delay) {
        // this._executeScheduledPayments(timestamp)
        if (!this.accounts[accountId]) return null

        const paymentId = "payment" + (this.allPayments.length + 1).toString()

        const payment = {
            id: paymentId,
            accountId: accountId,
            amount: amount,
            currentStatus: "Scheduled",
            timestamp: timestamp,
            delay: delay,
            executionTime: timestamp + delay
        }

        //all payments "table"
        this.allPayments.push(payment)

        return paymentId
    }

    cancelPayment(timestamp, accountId, paymentId) {

        const foundPayment = this.allPayments.filter(p => {
            return p.id == paymentId && p.accountId == accountId
        })

        //if payment doesn't exist
        if (foundPayment.length != 1) return false;

        const payment = foundPayment[0]
        //wrong account
        if (payment.accountId != accountId) return false;
        //already canceled
        if (payment.currentStatus != "Scheduled") return false;

        payment.currentStatus = "Canceled"

        this._executeScheduledPayments(timestamp)

        return true
    }

    topSpenders(timestamp, n) {
        this._executeScheduledPayments(timestamp)
        let sortedAccounts = this._sortTopSpenders()

        if (n < sortedAccounts.length) sortedAccounts = sortedAccounts.slice(0, n)

        return this._formatAccounts(sortedAccounts)
    }

    _sortTopSpenders() {
        return Object.entries(this.accounts).sort((acctA, acctB) => {
            // console.log({ acctA })
            const amtA = acctA[1].totalOutgoing
            const amtB = acctB[1].totalOutgoing

            if (amtA == amtB) {
                return acctA[0].localeCompare(acctB[0])
            }
            else return amtB - amtA
        })
    }

    _formatAccounts(accounts) {
        return accounts.map(a => {
            return `${a[0]}(${a[1].totalOutgoing})`
        })
    }

    _executeScheduledPayments(timestamp) {
        let paymentsToExecute = this.allPayments.filter(p => ((p.executionTime <= timestamp) && (p.currentStatus == "Scheduled")))

        if (paymentsToExecute.length > 1) { paymentsToExecute.sort((a, b) => a.executionTime - b.executionTime) }

        while (paymentsToExecute.length > 0) {
            const pte = paymentsToExecute.shift()
            const account = this.accounts[pte.accountId]

            if (account.balance < pte.amount) {
                pte.currentStatus = "InsufficientFunds"
            } else {
                account.balance -= pte.amount
                account.totalOutgoing += pte.amount
                pte.currentStatus = "Executed"
            }
        }
    }


}

module.exports = BankingSystem;
