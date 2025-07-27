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
        this.accounts[targetAccountId].balance += amount

        return this.accounts[sourceAccountId].balance
    }
}

module.exports = BankingSystem;
