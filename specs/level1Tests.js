const chai = require('chai');
chai.config.truncateThreshold = 0;
const { expect } = chai;
const BankingSystem = require('../bankingSystem');

/**
 * The test suit below includes 10 tests for Level 1.
 *
 * All have the same score.
 * You are not allowed to modify this file,
 * but feel free to read the source code
 * to better understand what is happening in every specific case.
 */
describe('Level 1 tests', () => {

    let system;

    beforeEach(() => {
        system = new BankingSystem();
    });

    it('Test level 1 case 01 basic create', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
    });

    it('Test level 1 case 02 basic create and deposit', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.deposit(3, 'account1', 2500)).to.deep.equal(2500);
        expect(system.deposit(4, 'account1', 500)).to.deep.equal(3000);
        expect(system.deposit(5, 'account2', 1000)).to.deep.equal(1000);
    });

    it('Test level 1 case 03 basic create deposit and transfer 1', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.deposit(3, 'account1', 2000)).to.deep.equal(2000);
        expect(system.deposit(4, 'account2', 1000)).to.deep.equal(1000);
        expect(system.transfer(5, 'account1', 'account2', 500)).to.deep.equal(1500);
        expect(system.deposit(6, 'account1', 100)).to.deep.equal(1600);
        expect(system.deposit(7, 'account2', 100)).to.deep.equal(1600);
    });

    it('Test level 1 case 04 basic create deposit and transfer 2', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.createAccount(3, 'account3')).to.be.true;
        expect(system.deposit(4, 'account1', 2000)).to.deep.equal(2000);
        expect(system.deposit(5, 'account2', 1000)).to.deep.equal(1000);
        expect(system.transfer(6, 'account1', 'account2', 500)).to.deep.equal(1500);
        expect(system.transfer(7, 'account2', 'account3', 1400)).to.deep.equal(100);
        expect(system.deposit(8, 'account1', 100)).to.deep.equal(1600);
        expect(system.deposit(9, 'account2', 100)).to.deep.equal(200);
        expect(system.deposit(10, 'account3', 100)).to.deep.equal(1500);
    });

    it('Test level 1 case 05 create edge case', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account1')).to.be.false;
        expect(system.createAccount(3, 'account2')).to.be.true;
    });

    it('Test level 1 case 06 deposit edge cases', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.deposit(3, 'account1', 100)).to.deep.equal(100);
        expect(system.deposit(4, 'account2', 100)).to.deep.equal(100);
        expect(system.deposit(5, 'account3', 100)).to.be.null;
    });

    it('Test level 1 case 07 transfer edge cases', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.deposit(3, 'account1', 2500)).to.deep.equal(2500);
        expect(system.deposit(4, 'account1', 500)).to.deep.equal(3000);
        expect(system.deposit(5, 'account2', 500)).to.deep.equal(500);
        expect(system.deposit(6, 'account2', 500)).to.deep.equal(1000);
        expect(system.transfer(7, 'account3', 'account2', 500)).to.be.null;
        expect(system.transfer(8, 'account1', 'account3', 500)).to.be.null;
        expect(system.transfer(9, 'account1', 'account2', 3001)).to.be.null;
        expect(system.transfer(10, 'account1', 'account1', 500)).to.be.null;
        expect(system.transfer(11, 'account1', 'account2', 3000)).to.deep.equal(0);
        expect(system.createAccount(12, 'account3')).to.be.true;
        expect(system.transfer(13, 'account3', 'account2', 100)).to.be.null;
    });

    it('Test level 1 case 08 all successful operations', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'acc1')).to.be.true;
        expect(system.createAccount(2, 'acc2')).to.be.true;
        expect(system.createAccount(3, 'acc3')).to.be.true;
        expect(system.deposit(4, 'acc3', 1000)).to.deep.equal(1000);
        expect(system.deposit(5, 'acc2', 1000)).to.deep.equal(1000);
        expect(system.transfer(6, 'acc3', 'acc2', 200)).to.deep.equal(800);
        expect(system.transfer(7, 'acc2', 'acc3', 100)).to.deep.equal(1100);
        expect(system.transfer(8, 'acc3', 'acc2', 100)).to.deep.equal(800);
        expect(system.transfer(9, 'acc3', 'acc1', 150)).to.deep.equal(650);
        expect(system.deposit(10, 'acc1', 100)).to.deep.equal(250);
        expect(system.deposit(11, 'acc2', 100)).to.deep.equal(1300);
        expect(system.deposit(12, 'acc3', 100)).to.deep.equal(750);
    });

    it('Test level 1 case 09 all operations 1', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'acc1')).to.be.true;
        expect(system.createAccount(2, 'acc2')).to.be.true;
        expect(system.createAccount(3, 'acc3')).to.be.true;
        expect(system.createAccount(4, 'acc4')).to.be.true;
        expect(system.deposit(5, 'acc1', 2000)).to.deep.equal(2000);
        expect(system.deposit(6, 'acc4', 2000)).to.deep.equal(2000);
        expect(system.deposit(7, 'acc3', 2000)).to.deep.equal(2000);
        expect(system.deposit(8, 'acc2', 2000)).to.deep.equal(2000);
        expect(system.deposit(9, 'acc5', 2000)).to.be.null;
        expect(system.deposit(10, 'acc6', 2000)).to.be.null;
        expect(system.deposit(11, 'acc7', 2000)).to.be.null;
        expect(system.createAccount(12, 'acc4')).to.be.false;
        expect(system.createAccount(13, 'acc1')).to.be.false;
        expect(system.createAccount(14, 'acc5')).to.be.true;
        expect(system.deposit(16, 'acc5', 1000)).to.deep.equal(1000);
        expect(system.transfer(17, 'acc5', 'acc1', 99)).to.deep.equal(901);
        expect(system.transfer(18, 'acc5', 'acc2', 2)).to.deep.equal(899);
        expect(system.transfer(19, 'acc5', 'acc3', 66)).to.deep.equal(833);
        expect(system.transfer(20, 'acc5', 'acc5', 2)).to.be.null;
        expect(system.transfer(21, 'acc5', 'acc3', 66)).to.deep.equal(767);
        expect(system.transfer(22, 'acc5', 'acc2', 99)).to.deep.equal(668);
        expect(system.deposit(23, 'acc1', 100)).to.deep.equal(2199);
        expect(system.deposit(37, 'acc2', 200)).to.deep.equal(2301);
        expect(system.deposit(38, 'acc3', 300)).to.deep.equal(2432);
        expect(system.transfer(39, 'acc5', 'acc5', 991)).to.be.null;
        expect(system.transfer(43, 'acc6', 'acc3', 1)).to.be.null;
    });

    it('Test level 1 case 10 all operations 2', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'acc1')).to.be.true;
        expect(system.createAccount(2, 'acc2')).to.be.true;
        expect(system.createAccount(3, 'acc3')).to.be.true;
        expect(system.createAccount(4, 'acc4')).to.be.true;
        expect(system.createAccount(5, 'acc5')).to.be.true;
        expect(system.deposit(6, 'acc1', 1000)).to.deep.equal(1000);
        expect(system.deposit(7, 'acc4', 2000)).to.deep.equal(2000);
        expect(system.deposit(8, 'acc3', 3000)).to.deep.equal(3000);
        expect(system.deposit(9, 'acc2', 2000)).to.deep.equal(2000);
        expect(system.deposit(10, 'acc5', 1000)).to.deep.equal(1000);
        expect(system.deposit(11, 'acc6', 100)).to.be.null;
        expect(system.deposit(12, 'acc7', 1000)).to.be.null;
        expect(system.createAccount(13, 'acc5')).to.be.false;
        expect(system.createAccount(14, 'acc3')).to.be.false;
        expect(system.createAccount(16, 'acc6')).to.be.true;
        expect(system.deposit(17, 'acc6', 1000)).to.deep.equal(1000);
        expect(system.transfer(18, 'acc6', 'acc1', 99)).to.deep.equal(901);
        expect(system.transfer(19, 'acc6', 'acc2', 2)).to.deep.equal(899);
        expect(system.transfer(20, 'acc6', 'acc3', 66)).to.deep.equal(833);
        expect(system.transfer(21, 'acc6', 'acc5', 2)).to.deep.equal(831);
        expect(system.transfer(22, 'acc6', 'acc3', 66)).to.deep.equal(765);
        expect(system.transfer(23, 'acc6', 'acc2', 99)).to.deep.equal(666);
        expect(system.transfer(24, 'acc6', 'acc1', 99)).to.deep.equal(567);
        expect(system.transfer(25, 'acc6', 'acc5', 66)).to.deep.equal(501);
        expect(system.transfer(26, 'acc6', 'acc5', 67)).to.deep.equal(434);
        expect(system.transfer(27, 'acc6', 'acc5', 66)).to.deep.equal(368);
        expect(system.transfer(28, 'acc6', 'acc5', 99)).to.deep.equal(269);
        expect(system.transfer(29, 'acc6', 'acc3', 68)).to.deep.equal(201);
        expect(system.transfer(30, 'acc6', 'acc4', 68)).to.deep.equal(133);
        expect(system.transfer(31, 'acc6', 'acc4', 66)).to.deep.equal(67);
        expect(system.transfer(32, 'acc6', 'acc5', 67)).to.deep.equal(0);
        expect(system.transfer(33, 'acc7', 'acc6', 100)).to.be.null;
        expect(system.transfer(34, 'acc1', 'acc7', 100)).to.be.null;
        expect(system.transfer(35, 'acc6', 'acc5', 1)).to.be.null;
        expect(system.transfer(36, 'acc3', 'acc3', 239)).to.be.null;
        expect(system.deposit(37, 'acc1', 800)).to.deep.equal(1998);
        expect(system.deposit(38, 'acc2', 800)).to.deep.equal(2901);
        expect(system.deposit(39, 'acc3', 800)).to.deep.equal(4000);
        expect(system.deposit(40, 'acc4', 800)).to.deep.equal(2934);
        expect(system.deposit(41, 'acc5', 800)).to.deep.equal(2167);
        expect(system.deposit(42, 'acc6', 1000)).to.deep.equal(1000);
        expect(system.transfer(43, 'acc6', 'acc5', 991)).to.deep.equal(9);
        expect(system.transfer(44, 'acc6', 'acc3', 1)).to.deep.equal(8);
    });
});
