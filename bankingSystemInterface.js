/**
 * `BankingSystem` interface.
 */
class BankingSystemInterface {
    constructor() {
    }

    /**
     * Should create a new account with the given identifier if it
     * does not already exist.
     * Returns `true` if the account was successfully created or
     * `false` if an account with `accountId` already exists.
     *
     * @param {number} timestamp
     * @param {string} accountId
     * @returns {boolean}
     */
    createAccount(timestamp, accountId) {
        // default implementation
        return false;
    }

    /**
     * Should deposit the given `amount` of money to the specified
     * `accountId`.
     * Returns the total amount of money in the account after the
     * query has been processed.
     * If the specified account does not exist, should return
     * `null`.
     *
     * @param {number} timestamp
     * @param {string} accountId
     * @param {number} amount
     * @returns {number | null}
     */
    deposit(timestamp, accountId, amount) {
        // default implementation
        return null;
    }

    /**
     * Should transfer the given amount of money from account
     * `sourceAccountId` to account `targetAccountId`.
     * Returns the balance of `sourceAccountId` if the transfer was
     * successful or `null` otherwise.
     *   * Returns `null` if `sourceAccountId` or `targetAccountId`
     *   doesn't exist.
     *   * Returns `null` if `sourceAccountId` and `targetAccountId`
     *   are the same.
     *   * Returns `null` if account `sourceAccountId` has
     *   insufficient funds to perform the transfer.
     *
     * @param {number} timestamp
     * @param {string} sourceAccountId
     * @param {string} targetAccountId
     * @param {number} amount
     * @returns {number | null}
     */
    transfer(timestamp, sourceAccountId, targetAccountId, amount) {
        // default implementation
        return null;
    }

    /**
     * Should return identifiers of the top `n` accounts with the
     * highest amount of outgoing transactions - the total amount
     * of money either transferred out of or paid/withdrawn (via
     * the **schedulePayment** operation which will be introduced
     * in level 3) - sorted in descending order, or in case of a
     * tie, sorted alphabetically by `accountId` in ascending
     * order.
     * The output should be a list of strings in the following
     * format: `["<accountId1>(<totalOutgoing1>)", "<accountId2>(<t
     * otalOutgoing2>)", ..., "<accountIdN>(<totalOutgoingN>)"]`.
     *   * If less than `n` accounts exist in the system, then return
     *   all their identifiers (in the described format).
     *
     * @param {number} timestamp
     * @param {number} n
     * @returns {string[]}
     */
    topSpenders(timestamp, n) {
        // default implementation
        return [];
    }

    /**
     * Should schedule a payment which will be performed at
     * `timestamp + delay`.
     * Returns a string with a unique identifier for the scheduled
     * payment in the following format: `"payment[ordinal number of
     *  the scheduled payment across all accounts]"` - e.g.,
     * `"payment1"`, `"payment2"`, etc.
     * If `accountId` doesn't exist, should return `null`.
     * The payment is skipped if the specified account has
     * insufficient funds when the payment is performed.
     * Additional conditions:
     *   * Successful payments should be considered outgoing
     *   transactions and included when ranking accounts using the
     *   `topSpenders` operation.
     *   * Scheduled payments should be processed **before** any
     *   other transactions at the given timestamp.
     *   * If an account needs to perform several scheduled payments
     *   simultaneously, they should be processed in order of
     *   creation - e.g., `"payment1"` should be processed before
     *   `"payment2"`.
     *
     * @param {number} timestamp
     * @param {string} accountId
     * @param {number} amount
     * @param {number} delay
     * @returns {string | null}
     */
    schedulePayment(timestamp, accountId, amount, delay) {
        // default implementation
        return null;
    }

    /**
     * Should cancel the scheduled payment with `paymentId`.
     * Returns `true` if the scheduled payment is successfully
     * canceled.
     * If `paymentId` does not exist or was already canceled, or if
     * `accountId` is different from the source account for the
     * scheduled payment, returns `false`.
     * Note that scheduled payments must be performed before any
     * `cancelPayment` operations at the given timestamp.
     *
     * @param {number} timestamp
     * @param {string} accountId
     * @param {string} paymentId
     * @returns {boolean}
     */
    cancelPayment(timestamp, accountId, paymentId) {
        // default implementation
        return false;
    }

    /**
     * Should merge `accountId2` into `accountId1`.
     * Returns `true` if accounts were merged successfully, or
     * `false` otherwise.
     * Specifically:
     *   * Returns `false` if `accountId1` is equal to `accountId2`.
     *   * Returns `false` if either `accountId1` or `accountId2`
     *   doesn't exist.
     *   * The balance of `accountId2` should be added to the balance
     *   of `accountId1`.
     *   * All existing scheduled payments for `accountId2` should be
     *   scheduled for `accountId1`.
     *   * After the merge, it must be possible to cancel any
     *   existing scheduled payments for `accountId2` by replacing
     *   `accountId2` with `accountId1`.
     *   * `topSpenders` operations should recognize merged accounts
     *   - the total outgoing transactions for merged accounts should
     *   be the sum of all money transferred and/or withdrawn in both
     *   accounts.
     *   * `accountId2` should be removed from the system after the
     *   merge.
     *
     * @param {number} timestamp
     * @param {string} accountId1
     * @param {string} accountId2
     * @returns {boolean}
     */
    mergeAccounts(timestamp, accountId1, accountId2) {
        // default implementation
        return false;
    }

    /**
     * Should return the total amount of money in the account
     * `accountId` at the given timestamp `timeAt`.
     * If the specified account did not exist at `timeAt`, should
     * return `null`.
     *   * If queries have been processed at timestamp `timeAt`,
     *   `getBalance` must reflect the account balance **after** the
     *   query has been processed.
     *   * If the account was merged into another account, the merged
     *   account should inherit its balance history.
     *
     * @param {number} timestamp
     * @param {string} accountId
     * @param {number} timeAt
     * @returns {number | null}
     */
    getBalance(timestamp, accountId, timeAt) {
        // default implementation
        return null;
    }
}

module.exports = BankingSystemInterface;
