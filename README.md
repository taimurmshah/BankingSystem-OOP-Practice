# Banking System Implementation

## Overview

Your task is to implement a simplified version of a banking system. All operations that should be supported are listed below.

**Important Notes:**
- Solving this task consists of several levels. Subsequent levels are opened when the current level is correctly solved.
- You always have access to the data for the current and all previous levels.
- You are not required to provide the most efficient implementation. Any code that passes the unit tests is sufficient.
- All operations will have a `timestamp` parameter — a stringified timestamp in milliseconds. It is guaranteed that all timestamps are unique and are in a range from `1` to `10^9`.
- Operations will be given in order of strictly increasing timestamps.

## Project Structure

```
JustWorks/
├── bankingSystem.js           # Main implementation file (extend BankingSystemInterface)
├── bankingSystemInterface.js  # Interface with method signatures and documentation
├── package.json              # Dependencies (chai for testing)
├── main.sh                   # Run all tests
├── run_single_test.sh        # Run specific test cases
└── specs/                    # Test files for each level
    ├── level1Tests.js
    ├── level2Tests.js
    ├── level3Tests.js
    ├── level4Tests.js
    └── sandboxTests.js
```

## Running Tests

- **Run all tests:** `bash main.sh`
- **Run specific test:** `bash run_single_test.sh "<test_case_name>"`

## Level Requirements

### Level 1: Basic Banking Operations
**Objective:** The banking system should support creating new accounts, depositing money into accounts, and transferring money between two accounts.

**Methods to implement:**
1. `createAccount(timestamp, accountId)`
   - Create a new account with the given identifier
   - Returns `true` if successful, `false` if account already exists

2. `deposit(timestamp, accountId, amount)`
   - Deposit money to the specified account
   - Returns the total balance after deposit, or `null` if account doesn't exist

3. `transfer(timestamp, sourceAccountId, targetAccountId, amount)`
   - Transfer money between accounts
   - Returns source account balance after transfer, or `null` if:
     - Either account doesn't exist
     - Source and target are the same
     - Insufficient funds in source account

### Level 2: Account Ranking
**Objective:** The banking system should support ranking accounts based on the total value of outgoing transactions.

**Methods to implement:**
4. `topSpenders(timestamp, n)`
   - Return top `n` accounts with highest outgoing transactions
   - Format: `["accountId1(totalOutgoing1)", "accountId2(totalOutgoing2)", ...]`
   - Sort by total outgoing (descending), then by accountId (ascending) for ties
   - Include all accounts if fewer than `n` exist

### Level 3: Scheduled Payments
**Objective:** The banking system should allow scheduling payments and checking the status of scheduled payments.

**Methods to implement:**
5. `schedulePayment(timestamp, accountId, amount, delay)`
   - Schedule a payment to be executed at `timestamp + delay`
   - Returns unique payment ID in format `"payment1"`, `"payment2"`, etc.
   - Returns `null` if account doesn't exist
   - Payment is skipped if insufficient funds when executed
   - Scheduled payments are processed before other transactions at the same timestamp
   - Multiple payments from same account are processed in creation order

6. `cancelPayment(timestamp, accountId, paymentId)`
   - Cancel a scheduled payment
   - Returns `true` if successfully canceled
   - Returns `false` if payment doesn't exist, already canceled, or wrong account
   - Scheduled payments are processed before cancellation operations

### Level 4: Account Merging & Balance History
**Objective:** The banking system should support merging two accounts while retaining both accounts' balance and transaction histories.

**Methods to implement:**
7. `mergeAccounts(timestamp, accountId1, accountId2)`
   - Merge `accountId2` into `accountId1`
   - Returns `true` if successful, `false` if:
     - Accounts are the same
     - Either account doesn't exist
   - `accountId2`'s balance is added to `accountId1`
   - All scheduled payments from `accountId2` transfer to `accountId1`
   - Transaction histories are combined for `topSpenders`
   - `accountId2` is removed after merge

8. `getBalance(timestamp, accountId, timeAt)`
   - Get account balance at a specific past timestamp
   - Returns balance after all operations at `timeAt`, or `null` if account didn't exist
   - Must work with merged accounts (inherit balance history)

## Implementation Guidelines

1. **Extend the Interface:** Your `BankingSystem` class should extend `BankingSystemInterface`
2. **Handle Edge Cases:** Pay attention to null returns and error conditions
3. **Maintain State:** Track account balances, transaction histories, and scheduled payments
4. **Process Order:** Handle scheduled payments before other operations at the same timestamp
5. **Data Persistence:** Maintain historical data for balance queries and merging operations

## Testing Strategy

- Start with Level 1 and ensure all tests pass before moving to Level 2
- Use `bash run_single_test.sh "<specific_test>"` to debug individual test cases
- Each level builds upon the previous, so ensure solid implementation at each stage
- Test edge cases thoroughly, especially for error conditions

## Getting Started

1. Implement methods one by one starting with Level 1
2. Run tests frequently to validate your implementation
3. Use the interface documentation in `bankingSystemInterface.js` for detailed method specifications
4. Focus on correctness first, optimization second 