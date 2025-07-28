const BankingSystemInterface = require('./bankingSystemInterface');

class BankingSystem extends BankingSystemInterface {
    constructor() {
        super();

        this.accounts = {};
        this.allPayments = [];
        this.transactionHistory = {};
        this.mergeHistory = {};
    }

    createAccount(timestamp, accountId) {
        if (this.accounts[accountId]) return false;

        this.accounts[accountId] = {
            balance: 0,
            totalOutgoing: 0,
            createdAt: timestamp
        };

        this.transactionHistory[accountId] = [];

        return true
    }

    deposit(timestamp, accountId, amount) {
        if (!this.accounts[accountId]) return null

        //execute payments that are scheduled before current transaction
        this._executeScheduledPayments(timestamp)

        this.accounts[accountId].balance += amount

        this._addToTransactionHistory(timestamp, accountId, amount, "Deposit")

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

        this._addToTransactionHistory(timestamp, sourceAccountId, amount, "OutgoingTransfer")
        this._addToTransactionHistory(timestamp, targetAccountId, amount, "IncomingTransfer")

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

    mergeAccounts(timestamp, accountId1, accountId2) {
        if (!this.accounts[accountId1] || !this.accounts[accountId2]) return false
        if (accountId1 == accountId2) return false

        console.log("merging", accountId1 + " & " + accountId2)

        //execute pending scheduled transactions before given timestamp
        this._executeScheduledPayments(timestamp)

        //find accts
        const acct1 = this.accounts[accountId1]
        const acct2 = this.accounts[accountId2]

        // console.log(accountId1 + " txnHistory before merge:", this.transactionHistory[accountId1])

        //combine balance and total outgoing
        acct1.balance += acct2.balance
        acct1.totalOutgoing += acct2.totalOutgoing

        //find all scheduled payments for acct2 and set to acct1
        const pmts = this.allPayments.filter(pmt => pmt.accountId == accountId2)
        for (let pmt of pmts) pmt.accountId = accountId1

        //keep track of merging

        delete this.accounts[accountId2]

        // console.log(accountId1 + " txnHistory after merge:", this.transactionHistory[accountId1])


        return true
    }

    getBalance(timestamp, accountId, timeAt) {
        if (!this.accounts[accountId]) return null

        console.log("getBalance for " + accountId)
        // console.log({ timestamp })
        // console.log({ timeAt })
        this._executeScheduledPayments(timestamp)

        //filter for account's txns at certain timestamp
        let balance = 0
        let txnsAtTimestamp = this.transactionHistory[accountId].filter(txn => {
            return txn.accountId == accountId && txn.timestamp <= timeAt
        })

        //
        for (const txn of txnsAtTimestamp) {
            if (txn.txnType == "Deposit" || txn.txnType == "IncomingTransfer") balance += txn.amount
            else balance -= txn.amount
        }

        console.log({ balance })

        return balance
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
                // console.log("IN EXECUTE")
                account.balance -= pte.amount
                account.totalOutgoing += pte.amount
                this._addToTransactionHistory(pte.executionTime, pte.accountId, pte.amount, "Payment")
                pte.currentStatus = "Executed"
            }
        }
    }

    _addToTransactionHistory(timestamp, accountId, amount, txnType) {
        const txn = {
            accountId: accountId,
            amount: amount,
            txnType: txnType,
            timestamp: timestamp
        }

        this.transactionHistory[accountId].push(txn)
    }

}

module.exports = BankingSystem;
