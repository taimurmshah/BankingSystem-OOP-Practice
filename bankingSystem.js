const BankingSystemInterface = require('./bankingSystemInterface');

class BankingSystem extends BankingSystemInterface {
    constructor() {
        super();

        this.accounts = {};
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

        this.accounts[accountId].balance += amount

        return this.accounts[accountId].balance
    }

    transfer(timestamp, sourceAccountId, targetAccountId, amount) {
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

    topSpenders(timestamp, n) {
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
}

module.exports = BankingSystem;
