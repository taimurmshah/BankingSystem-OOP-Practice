const chai = require('chai');
chai.config.truncateThreshold = 0;
const { expect } = chai;
const BankingSystem = require('../bankingSystem');

/**
 * The test suit below includes 10 tests for Level 4.
 *
 * All have the same score.
 * You are not allowed to modify this file,
 * but feel free to read the source code
 * to better understand what is happening in every specific case.
 */
describe('Level 4 tests', () => {

    let system;

    beforeEach(() => {
        system = new BankingSystem();
    });

    it('Test level 4 case 01 deletes account 2 and combines balances', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.deposit(3, 'account1', 1000)).to.deep.equal(1000);
        expect(system.deposit(4, 'account2', 1000)).to.deep.equal(1000);
        expect(system.mergeAccounts(5, 'account1', 'account2')).to.be.true;
        expect(system.deposit(6, 'account1', 250)).to.deep.equal(2250);
        expect(system.deposit(7, 'account2', 1000)).to.be.null;
    });

    it('Test level 4 case 02 shows correct spender stats', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.createAccount(3, 'account3')).to.be.true;
        expect(system.createAccount(4, 'account4')).to.be.true;
        expect(system.deposit(5, 'account1', 1000)).to.deep.equal(1000);
        expect(system.deposit(6, 'account2', 1000)).to.deep.equal(1000);
        expect(system.deposit(7, 'account3', 1000)).to.deep.equal(1000);
        expect(system.deposit(8, 'account4', 1000)).to.deep.equal(1000);
        expect(system.transfer(9, 'account1', 'account2', 500)).to.deep.equal(500);
        expect(system.transfer(10, 'account1', 'account4', 100)).to.deep.equal(400);
        expect(system.transfer(11, 'account2', 'account2', 300)).to.be.null;
        expect(system.transfer(12, 'account3', 'account2', 200)).to.deep.equal(800);
        expect(system.deposit(13, 'account3', 200)).to.deep.equal(1000);
        expect(system.deposit(14, 'account4', 500)).to.deep.equal(1600);
        let expected = ['account1(600)', 'account3(200)', 'account2(0)', 'account4(0)'];
        expect(system.topSpenders(15, 4)).to.deep.equal(expected);
        expect(system.mergeAccounts(16, 'account2', 'account3')).to.be.true;
        expected = ['account1(600)', 'account2(200)', 'account4(0)'];
        expect(system.topSpenders(17, 4)).to.deep.equal(expected);
    });

    it('Test level 4 case 03 existing payments must remain', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.deposit(3, 'account1', 1000)).to.deep.equal(1000);
        expect(system.deposit(4, 'account2', 1000)).to.deep.equal(1000);
        expect(system.schedulePayment(5, 'account1', 100, 10)).to.deep.equal('payment1');
        expect(system.schedulePayment(6, 'account1', 200, 10)).to.deep.equal('payment2');
        expect(system.schedulePayment(7, 'account2', 300, 10)).to.deep.equal('payment3');
        expect(system.schedulePayment(8, 'account2', 400, 10)).to.deep.equal('payment4');
        expect(system.mergeAccounts(9, 'account1', 'account2')).to.be.true;
        expect(system.cancelPayment(10, 'account1', 'payment1')).to.be.true;
        expect(system.cancelPayment(11, 'account1', 'payment3')).to.be.true;
        expect(system.deposit(20, 'account1', 100)).to.deep.equal(1500);
    });

    it('Test level 4 case 04 basic get balance', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.createAccount(3, 'account3')).to.be.true;
        expect(system.deposit(4, 'account1', 1000)).to.deep.equal(1000);
        expect(system.deposit(5, 'account2', 2000)).to.deep.equal(2000);
        expect(system.deposit(6, 'account3', 3000)).to.deep.equal(3000);
        expect(system.transfer(7, 'account1', 'account2', 100)).to.deep.equal(900);
        expect(system.transfer(8, 'account2', 'account3', 200)).to.deep.equal(1900);
        expect(system.transfer(9, 'account3', 'account2', 300)).to.deep.equal(2900);
        expect(system.transfer(10, 'account1', 'account3', 400)).to.deep.equal(500);
        expect(system.mergeAccounts(13, 'account1', 'account2')).to.be.true;
        expect(system.getBalance(14, 'account1', 7)).to.deep.equal(900);
        expect(system.getBalance(15, 'account1', 9)).to.deep.equal(900);
        expect(system.getBalance(16, 'account1', 13)).to.deep.equal(2700);
        expect(system.getBalance(17, 'account3', 15)).to.deep.equal(3300);
    });

    it('Test level 4 case 05 get balance with scheduled payments', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.deposit(2, 'account1', 1000)).to.deep.equal(1000);
        expect(system.schedulePayment(3, 'account1', 300, 15)).to.deep.equal('payment1');
        expect(system.getBalance(20, 'account1', 17)).to.deep.equal(1000);
        expect(system.getBalance(21, 'account1', 18)).to.deep.equal(700);
        expect(system.getBalance(22, 'account1', 20)).to.deep.equal(700);
    });

    it('Test level 4 case 06 get balance edge cases', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.createAccount(3, 'account3')).to.be.true;
        expect(system.deposit(4, 'account1', 1000)).to.deep.equal(1000);
        expect(system.deposit(5, 'account2', 2000)).to.deep.equal(2000);
        expect(system.deposit(6, 'account3', 3000)).to.deep.equal(3000);
        expect(system.transfer(7, 'account1', 'account3', 100)).to.deep.equal(900);
        expect(system.transfer(8, 'account2', 'account3', 200)).to.deep.equal(1800);
        expect(system.transfer(9, 'account3', 'account1', 300)).to.deep.equal(3000);
        expect(system.transfer(10, 'account1', 'account3', 400)).to.deep.equal(800);
        expect(system.mergeAccounts(13, 'account1', 'account2')).to.be.true;
        expect(system.getBalance(14, 'account4', 10)).to.be.null;
        expect(system.getBalance(15, 'account3', 2)).to.be.null;
        expect(system.getBalance(16, 'account2', 13)).to.be.null;
        expect(system.createAccount(20, 'account2')).to.be.true;
        expect(system.deposit(21, 'account2', 2000)).to.deep.equal(2000);
        expect(system.getBalance(30, 'account2', 25)).to.deep.equal(2000);
    });

    it('Test level 4 case 07 merge edge cases', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.deposit(3, 'account1', 500)).to.deep.equal(500);
        expect(system.deposit(4, 'account2', 250)).to.deep.equal(250);
        expect(system.mergeAccounts(5, 'account1', 'account3')).to.be.false;
        expect(system.mergeAccounts(6, 'account3', 'account1')).to.be.false;
        expect(system.mergeAccounts(7, 'account1', 'account1')).to.be.false;
    });

    it('Test level 4 case 08 perform scheduled payments before merge', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.deposit(3, 'account1', 1000)).to.deep.equal(1000);
        expect(system.deposit(4, 'account2', 1000)).to.deep.equal(1000);
        expect(system.schedulePayment(5, 'account1', 700, 5)).to.deep.equal('payment1');
        expect(system.schedulePayment(6, 'account2', 300, 4)).to.deep.equal('payment2');
        expect(system.mergeAccounts(10, 'account1', 'account2')).to.be.true;
        expect(system.deposit(11, 'account1', 100)).to.deep.equal(1100);
        expect(system.getBalance(12, 'account1', 9)).to.deep.equal(1000);
        expect(system.getBalance(13, 'account1', 10)).to.deep.equal(1000);
        expect(system.getBalance(14, 'account1', 12)).to.deep.equal(1100);
        expect(system.getBalance(15, 'account2', 9)).to.deep.equal(1000);
    });

    it('Test level 4 case 09 all operations 1', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.createAccount(3, 'account3')).to.be.true;
        expect(system.deposit(4, 'account1', 1000)).to.deep.equal(1000);
        expect(system.deposit(5, 'account2', 2000)).to.deep.equal(2000);
        expect(system.deposit(6, 'account3', 1000)).to.deep.equal(1000);
        expect(system.schedulePayment(7, 'account1', 100, 5)).to.deep.equal('payment1');
        expect(system.schedulePayment(10, 'account2', 100, 5)).to.deep.equal('payment2');
        expect(system.schedulePayment(15, 'account3', 200, 5)).to.deep.equal('payment3');
        expect(system.schedulePayment(20, 'account2', 150, 15)).to.deep.equal('payment4');
        expect(system.schedulePayment(25, 'account2', 400, 5)).to.deep.equal('payment5');
        expect(system.schedulePayment(30, 'account1', 50, 10)).to.deep.equal('payment6');
        expect(system.schedulePayment(31, 'account4', 50, 10)).to.be.null;
        expect(system.mergeAccounts(32, 'account1', 'account3')).to.be.true;
        expect(system.deposit(35, 'account1', 10)).to.deep.equal(1710);
        expect(system.cancelPayment(40, 'account1', 'payment4')).to.be.false;
        expect(system.cancelPayment(41, 'account2', 'payment4')).to.be.false;
        expect(system.cancelPayment(43, 'account1', 'payment3')).to.be.false;
        let expected = ['account2(650)', 'account1(350)'];
        expect(system.topSpenders(45, 4)).to.deep.equal(expected);
        expect(system.transfer(50, 'account1', 'account2', 10)).to.deep.equal(1650);
        expect(system.deposit(55, 'account4', 10)).to.be.null;
        expect(system.cancelPayment(60, 'account2', 'payment6')).to.be.false;
        expect(system.cancelPayment(61, 'account1', 'payment6')).to.be.false;
        expect(system.transfer(65, 'account1', 'account2', 10)).to.deep.equal(1640);
        expect(system.cancelPayment(70, 'account2', 'payment5')).to.be.false;
        expect(system.deposit(75, 'account1', 10)).to.deep.equal(1650);
        expect(system.mergeAccounts(76, 'account1', 'account2')).to.be.true;
        expect(system.deposit(80, 'account1', 10)).to.deep.equal(3030);
        expected = ['account1(1020)'];
        expect(system.topSpenders(85, 5)).to.deep.equal(expected);
        expect(system.deposit(100, 'account1', 10)).to.deep.equal(3040);
        expect(system.deposit(105, 'account2', 10)).to.be.null;
        expected = ['account1(1020)'];
        expect(system.topSpenders(106, 3)).to.deep.equal(expected);
        expect(system.deposit(200, 'account1', 10)).to.deep.equal(3050);
        expect(system.getBalance(201, 'account1', 17)).to.deep.equal(900);
        expect(system.getBalance(202, 'account2', 3)).to.deep.equal(0);
        expect(system.getBalance(203, 'account3', 20)).to.deep.equal(800);
        expect(system.getBalance(204, 'account1', 25)).to.deep.equal(900);
        expect(system.getBalance(205, 'account2', 15)).to.deep.equal(1900);
        expect(system.getBalance(206, 'account3', 14)).to.deep.equal(1000);
        expect(system.getBalance(207, 'account1', 35)).to.deep.equal(1710);
        expect(system.getBalance(208, 'account1', 65)).to.deep.equal(1640);
    });

    it('Test level 4 case 10 all operations 2', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'acc1')).to.be.true;
        expect(system.createAccount(2, 'acc2')).to.be.true;
        expect(system.createAccount(3, 'acc3')).to.be.true;
        expect(system.createAccount(4, 'acc4')).to.be.true;
        expect(system.createAccount(5, 'acc5')).to.be.true;
        expect(system.createAccount(6, 'acc6')).to.be.true;
        expect(system.createAccount(7, 'acc7')).to.be.true;
        expect(system.createAccount(8, 'acc8')).to.be.true;
        expect(system.createAccount(9, 'acc9')).to.be.true;
        expect(system.createAccount(10, 'acc10')).to.be.true;
        expect(system.deposit(11, 'acc0', 7196)).to.be.null;
        expect(system.deposit(12, 'acc1', 5319)).to.deep.equal(5319);
        expect(system.deposit(13, 'acc2', 9334)).to.deep.equal(9334);
        expect(system.deposit(14, 'acc3', 6552)).to.deep.equal(6552);
        expect(system.deposit(15, 'acc4', 8034)).to.deep.equal(8034);
        expect(system.deposit(16, 'acc5', 8200)).to.deep.equal(8200);
        expect(system.deposit(17, 'acc6', 6752)).to.deep.equal(6752);
        expect(system.deposit(18, 'acc7', 9477)).to.deep.equal(9477);
        expect(system.deposit(19, 'acc8', 9158)).to.deep.equal(9158);
        expect(system.deposit(20, 'acc9', 7515)).to.deep.equal(7515);
        expect(system.transfer(21, 'acc8', 'acc3', 134)).to.deep.equal(9024);
        expect(system.transfer(22, 'acc3', 'acc5', 106)).to.deep.equal(6580);
        expect(system.transfer(23, 'acc10', 'acc2', 143)).to.be.null;
        expect(system.transfer(24, 'acc6', 'acc5', 162)).to.deep.equal(6590);
        expect(system.transfer(25, 'acc6', 'acc2', 137)).to.deep.equal(6453);
        expect(system.transfer(26, 'acc5', 'acc5', 124)).to.be.null;
        expect(system.transfer(27, 'acc3', 'acc5', 119)).to.deep.equal(6461);
        expect(system.transfer(28, 'acc8', 'acc1', 229)).to.deep.equal(8795);
        expect(system.transfer(29, 'acc1', 'acc8', 220)).to.deep.equal(5328);
        expect(system.transfer(30, 'acc7', 'acc9', 124)).to.deep.equal(9353);
        expect(system.schedulePayment(31, 'acc3', 129, 5)).to.deep.equal('payment1');
        expect(system.schedulePayment(32, 'acc9', 157, 3)).to.deep.equal('payment2');
        expect(system.schedulePayment(33, 'acc8', 163, 5)).to.deep.equal('payment3');
        expect(system.schedulePayment(34, 'acc9', 173, 3)).to.deep.equal('payment4');
        expect(system.schedulePayment(35, 'acc3', 98, 3)).to.deep.equal('payment5');
        expect(system.schedulePayment(36, 'acc5', 80, 3)).to.deep.equal('payment6');
        expect(system.schedulePayment(37, 'acc8', 152, 4)).to.deep.equal('payment7');
        expect(system.schedulePayment(38, 'acc2', 128, 5)).to.deep.equal('payment8');
        expect(system.schedulePayment(39, 'acc9', 79, 3)).to.deep.equal('payment9');
        expect(system.schedulePayment(40, 'acc4', 128, 3)).to.deep.equal('payment10');
        expect(system.mergeAccounts(42, 'acc1', 'acc2')).to.be.true;
        expect(system.mergeAccounts(43, 'acc1', 'acc3')).to.be.true;
        expect(system.mergeAccounts(44, 'acc1', 'acc4')).to.be.true;
        expect(system.mergeAccounts(45, 'acc1', 'acc5')).to.be.true;
        expect(system.mergeAccounts(46, 'acc1', 'acc6')).to.be.true;
        expect(system.mergeAccounts(47, 'acc1', 'acc7')).to.be.true;
        expect(system.mergeAccounts(48, 'acc1', 'acc8')).to.be.true;
        expect(system.mergeAccounts(49, 'acc1', 'acc9')).to.be.true;
        expect(system.mergeAccounts(50, 'acc1', 'acc10')).to.be.true;
        let expected = ['acc1(2518)'];
        expect(system.topSpenders(51, 10)).to.deep.equal(expected);
        expect(system.mergeAccounts(52, 'acc1', 'acc2')).to.be.false;
        expect(system.mergeAccounts(53, 'acc1', 'acc1')).to.be.false;
        expect(system.deposit(54, 'acc1', 100)).to.deep.equal(69154);
        expect(system.getBalance(55, 'acc1', 33)).to.deep.equal(5328);
        expect(system.getBalance(56, 'acc2', 19)).to.deep.equal(9334);
        expect(system.getBalance(57, 'acc3', 28)).to.deep.equal(6461);
        expect(system.getBalance(58, 'acc4', 31)).to.deep.equal(8034);
        expect(system.getBalance(59, 'acc5', 7)).to.deep.equal(0);
        expect(system.getBalance(60, 'acc6', 24)).to.deep.equal(6590);
        expect(system.getBalance(61, 'acc7', 34)).to.deep.equal(9353);
        expect(system.getBalance(62, 'acc8', 16)).to.deep.equal(0);
        expect(system.getBalance(63, 'acc9', 48)).to.deep.equal(7230);
        expect(system.getBalance(64, 'acc10', 52)).to.be.null;
        expect(system.getBalance(65, 'acc1', 12)).to.deep.equal(5319);
        expect(system.getBalance(66, 'acc2', 36)).to.deep.equal(9471);
        expect(system.getBalance(67, 'acc3', 37)).to.deep.equal(6332);
        expect(system.getBalance(68, 'acc4', 24)).to.deep.equal(8034);
        expect(system.getBalance(69, 'acc5', 53)).to.be.null;
        expect(system.getBalance(70, 'acc6', 19)).to.deep.equal(6752);
        expect(system.getBalance(71, 'acc7', 10)).to.deep.equal(0);
        expect(system.getBalance(72, 'acc8', 1)).to.be.null;
        expect(system.getBalance(73, 'acc9', 22)).to.deep.equal(7515);
        expect(system.getBalance(74, 'acc10', 52)).to.be.null;
        expect(system.getBalance(75, 'acc1', 25)).to.deep.equal(5319);
        expect(system.getBalance(76, 'acc2', 10)).to.deep.equal(0);
        expect(system.getBalance(77, 'acc3', 19)).to.deep.equal(6552);
        expect(system.getBalance(78, 'acc4', 33)).to.deep.equal(8034);
        expect(system.getBalance(79, 'acc5', 47)).to.be.null;
        expect(system.getBalance(80, 'acc6', 9)).to.deep.equal(0);
        expect(system.getBalance(81, 'acc7', 33)).to.deep.equal(9353);
        expect(system.getBalance(82, 'acc8', 5)).to.be.null;
        expect(system.getBalance(83, 'acc9', 12)).to.deep.equal(0);
        expect(system.getBalance(84, 'acc10', 39)).to.deep.equal(0);
    });
});
