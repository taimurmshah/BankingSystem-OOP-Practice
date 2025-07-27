const chai = require('chai');
chai.config.truncateThreshold = 0;
const { expect } = chai;
const BankingSystem = require('../bankingSystem');

/**
 * The test suit below includes 10 tests for Level 3.
 *
 * All have the same score.
 * You are not allowed to modify this file,
 * but feel free to read the source code
 * to better understand what is happening in every specific case.
 */
describe('Level 3 tests', () => {

    let system;

    beforeEach(() => {
        system = new BankingSystem();
    });

    it('Test level 3 case 01 basic payment id', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.deposit(2, 'account1', 1000)).to.deep.equal(1000);
        expect(system.schedulePayment(3, 'account1', 100, 10)).to.deep.equal('payment1');
        expect(system.schedulePayment(4, 'account1', 200, 20)).to.deep.equal('payment2');
        expect(system.schedulePayment(5, 'account1', 50, 5)).to.deep.equal('payment3');
    });

    it('Test level 3 case 02 basic payment performance', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.deposit(2, 'account1', 1000)).to.deep.equal(1000);
        expect(system.schedulePayment(3, 'account1', 300, 10)).to.deep.equal('payment1');
        expect(system.deposit(12, 'account1', 10)).to.deep.equal(1010);
        expect(system.deposit(13, 'account1', 10)).to.deep.equal(720);
    });

    it('Test level 3 case 03 payments are reflected in top spenders', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.createAccount(3, 'account3')).to.be.true;
        expect(system.createAccount(4, 'account4')).to.be.true;
        expect(system.deposit(5, 'account1', 1000)).to.deep.equal(1000);
        expect(system.deposit(6, 'account2', 1000)).to.deep.equal(1000);
        expect(system.deposit(7, 'account3', 2000)).to.deep.equal(2000);
        expect(system.deposit(8, 'account4', 1000)).to.deep.equal(1000);
        expect(system.schedulePayment(9, 'account1', 100, 5)).to.deep.equal('payment1');
        expect(system.schedulePayment(10, 'account2', 200, 10)).to.deep.equal('payment2');
        expect(system.schedulePayment(11, 'account3', 600, 5)).to.deep.equal('payment3');
        expect(system.schedulePayment(12, 'account4', 500, 10)).to.deep.equal('payment4');
        expect(system.schedulePayment(13, 'account5', 500, 10)).to.be.null;
        let expected = ['account1(100)', 'account2(0)', 'account3(0)'];
        expect(system.topSpenders(15, 3)).to.deep.equal(expected);
        expected = ['account3(600)', 'account2(200)', 'account1(100)', 'account4(0)'];
        expect(system.topSpenders(20, 4)).to.deep.equal(expected);
        expected = ['account3(600)', 'account4(500)', 'account2(200)', 'account1(100)'];
        expect(system.topSpenders(25, 5)).to.deep.equal(expected);
        expected = ['account3(600)', 'account4(500)', 'account2(200)', 'account1(100)'];
        expect(system.topSpenders(30, 4)).to.deep.equal(expected);
        expect(system.deposit(31, 'account1', 10)).to.deep.equal(910);
        expect(system.deposit(32, 'account2', 10)).to.deep.equal(810);
        expect(system.deposit(33, 'account3', 10)).to.deep.equal(1410);
        expect(system.transfer(34, 'account4', 'account2', 10)).to.deep.equal(490);
    });

    it('Test level 3 case 04 cancel payment', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.deposit(2, 'account1', 2000)).to.deep.equal(2000);
        expect(system.schedulePayment(3, 'account1', 300, 10)).to.deep.equal('payment1');
        expect(system.cancelPayment(12, 'account1', 'payment1')).to.be.true;
        expect(system.deposit(15, 'account1', 10)).to.deep.equal(2010);
        expect(system.schedulePayment(16, 'account1', 300, 10)).to.deep.equal('payment2');
    });

    it('Test level 3 case 05 insufficient funds', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.deposit(2, 'account1', 1000)).to.deep.equal(1000);
        expect(system.schedulePayment(3, 'account1', 300, 10)).to.deep.equal('payment1');
        expect(system.schedulePayment(4, 'account1', 400, 10)).to.deep.equal('payment2');
        expect(system.schedulePayment(5, 'account1', 500, 10)).to.deep.equal('payment3');
        expect(system.deposit(20, 'account1', 10)).to.deep.equal(310);
    });

    it('Test level 3 case 06 order of payments', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.deposit(2, 'account1', 1000)).to.deep.equal(1000);
        expect(system.schedulePayment(3, 'account1', 600, 7)).to.deep.equal('payment1');
        expect(system.schedulePayment(4, 'account1', 700, 6)).to.deep.equal('payment2');
        expect(system.deposit(11, 'account1', 10)).to.deep.equal(410);
    });

    it('Test level 3 case 07 edge cases', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.deposit(3, 'account1', 1000)).to.deep.equal(1000);
        expect(system.deposit(4, 'account2', 1000)).to.deep.equal(1000);
        expect(system.schedulePayment(5, 'account3', 100, 5)).to.be.null;
        expect(system.schedulePayment(6, 'account1', 100, 5)).to.deep.equal('payment1');
        expect(system.cancelPayment(7, 'account3', 'payment1')).to.be.false;
        expect(system.cancelPayment(8, 'account2', 'payment1')).to.be.false;
        expect(system.cancelPayment(9, 'account1', 'payment2')).to.be.false;
        expect(system.deposit(11, 'account1', 10)).to.deep.equal(910);
    });

    it('Test level 3 case 08 all operations 1', function () {
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
        expect(system.schedulePayment(30, 'account1', 50, 20)).to.deep.equal('payment6');
        expect(system.schedulePayment(31, 'account4', 50, 20)).to.be.null;
        expect(system.deposit(32, 'account1', 10)).to.deep.equal(910);
        expect(system.cancelPayment(33, 'account1', 'payment4')).to.be.false;
        expect(system.cancelPayment(34, 'account2', 'payment4')).to.be.true;
        expect(system.cancelPayment(35, 'account3', 'payment3')).to.be.false;
        expect(system.cancelPayment(36, 'account3', 'payment3')).to.be.false;
        let expected = ['account2(500)', 'account3(200)', 'account1(100)'];
        expect(system.topSpenders(37, 4)).to.deep.equal(expected);
        expect(system.transfer(38, 'account1', 'account2', 10)).to.deep.equal(900);
        expect(system.deposit(39, 'account4', 10)).to.be.null;
        expect(system.cancelPayment(40, 'account2', 'payment6')).to.be.false;
        expect(system.cancelPayment(41, 'account1', 'payment6')).to.be.true;
        expect(system.transfer(65, 'account1', 'account2', 10)).to.deep.equal(890);
        expect(system.cancelPayment(70, 'account2', 'payment5')).to.be.false;
        expect(system.deposit(75, 'account1', 10)).to.deep.equal(900);
        expect(system.deposit(80, 'account2', 10)).to.deep.equal(1530);
        expected = ['account2(500)', 'account3(200)', 'account1(120)'];
        expect(system.topSpenders(85, 5)).to.deep.equal(expected);
        expect(system.deposit(100, 'account1', 10)).to.deep.equal(910);
        expect(system.deposit(105, 'account4', 10)).to.be.null;
        expected = ['account2(500)', 'account3(200)', 'account1(120)'];
        expect(system.topSpenders(106, 3)).to.deep.equal(expected);
        expect(system.deposit(200, 'account3', 1000)).to.deep.equal(1800);
    });

    it('Test level 3 case 09 all operations 2', function () {
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
        expect(system.deposit(11, 'acc0', 1240)).to.be.null;
        expect(system.deposit(12, 'acc1', 2921)).to.deep.equal(2921);
        expect(system.deposit(13, 'acc2', 1932)).to.deep.equal(1932);
        expect(system.deposit(14, 'acc3', 2141)).to.deep.equal(2141);
        expect(system.deposit(15, 'acc4', 1683)).to.deep.equal(1683);
        expect(system.deposit(16, 'acc5', 1025)).to.deep.equal(1025);
        expect(system.deposit(17, 'acc6', 1149)).to.deep.equal(1149);
        expect(system.deposit(18, 'acc7', 2175)).to.deep.equal(2175);
        expect(system.deposit(19, 'acc8', 2530)).to.deep.equal(2530);
        expect(system.deposit(20, 'acc9', 1222)).to.deep.equal(1222);
        expect(system.schedulePayment(21, 'acc1', 86, 7)).to.deep.equal('payment1');
        expect(system.schedulePayment(22, 'acc10', 22, 7)).to.deep.equal('payment2');
        expect(system.schedulePayment(23, 'acc10', 12, 3)).to.deep.equal('payment3');
        expect(system.schedulePayment(24, 'acc3', 57, 3)).to.deep.equal('payment4');
        expect(system.schedulePayment(25, 'acc2', 7, 5)).to.deep.equal('payment5');
        expect(system.schedulePayment(26, 'acc4', 33, 9)).to.deep.equal('payment6');
        expect(system.schedulePayment(27, 'acc4', 28, 9)).to.deep.equal('payment7');
        expect(system.schedulePayment(28, 'acc1', 56, 6)).to.deep.equal('payment8');
        expect(system.schedulePayment(29, 'acc3', 58, 4)).to.deep.equal('payment9');
        expect(system.schedulePayment(30, 'acc4', 33, 9)).to.deep.equal('payment10');
        expect(system.schedulePayment(31, 'acc2', 166, 4)).to.deep.equal('payment11');
        expect(system.schedulePayment(32, 'acc7', 125, 3)).to.deep.equal('payment12');
        expect(system.schedulePayment(33, 'acc2', 49, 7)).to.deep.equal('payment13');
        expect(system.schedulePayment(34, 'acc6', 25, 7)).to.deep.equal('payment14');
        expect(system.schedulePayment(35, 'acc3', 94, 7)).to.deep.equal('payment15');
        expect(system.schedulePayment(36, 'acc2', 174, 4)).to.deep.equal('payment16');
        expect(system.schedulePayment(37, 'acc0', 71, 3)).to.be.null;
        expect(system.schedulePayment(38, 'acc6', 96, 7)).to.deep.equal('payment17');
        expect(system.schedulePayment(39, 'acc6', 119, 4)).to.deep.equal('payment18');
        expect(system.schedulePayment(40, 'acc1', 148, 10)).to.deep.equal('payment19');
        expect(system.schedulePayment(41, 'acc3', 3, 4)).to.deep.equal('payment20');
        expect(system.schedulePayment(42, 'acc8', 160, 8)).to.deep.equal('payment21');
        expect(system.schedulePayment(43, 'acc0', 46, 7)).to.be.null;
        expect(system.schedulePayment(44, 'acc4', 156, 4)).to.deep.equal('payment22');
        expect(system.schedulePayment(45, 'acc0', 11, 6)).to.be.null;
        expect(system.schedulePayment(46, 'acc3', 159, 9)).to.deep.equal('payment23');
        expect(system.schedulePayment(47, 'acc9', 21, 8)).to.deep.equal('payment24');
        expect(system.schedulePayment(48, 'acc4', 114, 3)).to.deep.equal('payment25');
        expect(system.schedulePayment(49, 'acc10', 36, 9)).to.deep.equal('payment26');
        expect(system.schedulePayment(50, 'acc8', 102, 9)).to.deep.equal('payment27');
        let expected = ['acc2(396)', 'acc4(364)', 'acc1(290)', 'acc6(240)', 'acc3(212)', 'acc8(160)', 'acc7(125)', 'acc10(0)', 'acc5(0)', 'acc9(0)'];
        expect(system.topSpenders(51, 10)).to.deep.equal(expected);
    });

    it('Test level 3 case 10 all operations 3', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'acc0')).to.be.true;
        expect(system.createAccount(2, 'acc1')).to.be.true;
        expect(system.createAccount(3, 'acc2')).to.be.true;
        expect(system.createAccount(4, 'acc3')).to.be.true;
        expect(system.createAccount(5, 'acc4')).to.be.true;
        expect(system.createAccount(6, 'acc5')).to.be.true;
        expect(system.createAccount(7, 'acc6')).to.be.true;
        expect(system.createAccount(8, 'acc7')).to.be.true;
        expect(system.createAccount(9, 'acc8')).to.be.true;
        expect(system.createAccount(10, 'acc9')).to.be.true;
        expect(system.deposit(11, 'acc0', 3041)).to.deep.equal(3041);
        expect(system.deposit(12, 'acc1', 2014)).to.deep.equal(2014);
        expect(system.deposit(13, 'acc2', 3879)).to.deep.equal(3879);
        expect(system.deposit(14, 'acc3', 2375)).to.deep.equal(2375);
        expect(system.deposit(15, 'acc4', 4383)).to.deep.equal(4383);
        expect(system.deposit(16, 'acc5', 4015)).to.deep.equal(4015);
        expect(system.deposit(17, 'acc6', 3307)).to.deep.equal(3307);
        expect(system.deposit(18, 'acc7', 2942)).to.deep.equal(2942);
        expect(system.deposit(19, 'acc8', 2823)).to.deep.equal(2823);
        expect(system.deposit(20, 'acc9', 3199)).to.deep.equal(3199);
        expect(system.schedulePayment(21, 'acc0', 116, 51)).to.deep.equal('payment1');
        expect(system.schedulePayment(22, 'acc0', 196, 43)).to.deep.equal('payment2');
        expect(system.schedulePayment(23, 'acc0', 480, 33)).to.deep.equal('payment3');
        expect(system.schedulePayment(24, 'acc1', 90, 38)).to.deep.equal('payment4');
        expect(system.schedulePayment(25, 'acc1', 48, 53)).to.deep.equal('payment5');
        expect(system.schedulePayment(26, 'acc1', 18, 37)).to.deep.equal('payment6');
        expect(system.schedulePayment(27, 'acc2', 123, 45)).to.deep.equal('payment7');
        expect(system.schedulePayment(28, 'acc2', 278, 39)).to.deep.equal('payment8');
        expect(system.schedulePayment(29, 'acc2', 228, 30)).to.deep.equal('payment9');
        expect(system.schedulePayment(30, 'acc3', 36, 53)).to.deep.equal('payment10');
        expect(system.schedulePayment(31, 'acc3', 180, 63)).to.deep.equal('payment11');
        expect(system.schedulePayment(32, 'acc3', 114, 31)).to.deep.equal('payment12');
        expect(system.schedulePayment(33, 'acc4', 59, 57)).to.deep.equal('payment13');
        expect(system.schedulePayment(34, 'acc4', 270, 58)).to.deep.equal('payment14');
        expect(system.schedulePayment(35, 'acc4', 192, 55)).to.deep.equal('payment15');
        expect(system.schedulePayment(36, 'acc5', 100, 64)).to.deep.equal('payment16');
        expect(system.schedulePayment(37, 'acc5', 360, 48)).to.deep.equal('payment17');
        expect(system.schedulePayment(38, 'acc5', 390, 68)).to.deep.equal('payment18');
        expect(system.schedulePayment(39, 'acc6', 167, 48)).to.deep.equal('payment19');
        expect(system.schedulePayment(40, 'acc6', 318, 35)).to.deep.equal('payment20');
        expect(system.schedulePayment(41, 'acc6', 504, 61)).to.deep.equal('payment21');
        expect(system.schedulePayment(42, 'acc7', 69, 52)).to.deep.equal('payment22');
        expect(system.schedulePayment(43, 'acc7', 380, 38)).to.deep.equal('payment23');
        expect(system.schedulePayment(44, 'acc7', 360, 45)).to.deep.equal('payment24');
        expect(system.schedulePayment(45, 'acc8', 125, 38)).to.deep.equal('payment25');
        expect(system.schedulePayment(46, 'acc8', 182, 50)).to.deep.equal('payment26');
        expect(system.schedulePayment(47, 'acc8', 483, 65)).to.deep.equal('payment27');
        expect(system.schedulePayment(48, 'acc9', 37, 70)).to.deep.equal('payment28');
        expect(system.schedulePayment(49, 'acc9', 382, 64)).to.deep.equal('payment29');
        expect(system.schedulePayment(50, 'acc9', 579, 37)).to.deep.equal('payment30');
        let expected = ['acc0(480)', 'acc2(228)', 'acc1(0)', 'acc3(0)', 'acc4(0)', 'acc5(0)', 'acc6(0)', 'acc7(0)', 'acc8(0)', 'acc9(0)'];
        expect(system.topSpenders(60, 10)).to.deep.equal(expected);
        expect(system.cancelPayment(70, 'acc0', 'payment1')).to.be.true;
        expect(system.cancelPayment(71, 'acc0', 'payment2')).to.be.false;
        expect(system.cancelPayment(72, 'acc0', 'payment3')).to.be.false;
        expect(system.cancelPayment(73, 'acc1', 'payment4')).to.be.false;
        expect(system.cancelPayment(74, 'acc1', 'payment5')).to.be.true;
        expect(system.cancelPayment(75, 'acc1', 'payment6')).to.be.false;
        expect(system.cancelPayment(76, 'acc2', 'payment7')).to.be.false;
        expect(system.cancelPayment(77, 'acc2', 'payment8')).to.be.false;
        expect(system.cancelPayment(78, 'acc2', 'payment9')).to.be.false;
        expect(system.cancelPayment(79, 'acc3', 'payment10')).to.be.true;
        expect(system.cancelPayment(80, 'acc3', 'payment11')).to.be.true;
        expect(system.cancelPayment(81, 'acc3', 'payment12')).to.be.false;
        expect(system.cancelPayment(82, 'acc4', 'payment13')).to.be.true;
        expect(system.cancelPayment(83, 'acc4', 'payment14')).to.be.true;
        expect(system.cancelPayment(84, 'acc4', 'payment15')).to.be.true;
        expect(system.cancelPayment(85, 'acc5', 'payment16')).to.be.true;
        expect(system.cancelPayment(86, 'acc5', 'payment17')).to.be.false;
        expect(system.cancelPayment(87, 'acc5', 'payment18')).to.be.true;
        expect(system.cancelPayment(88, 'acc6', 'payment19')).to.be.false;
        expect(system.cancelPayment(89, 'acc6', 'payment20')).to.be.false;
        expect(system.cancelPayment(90, 'acc6', 'payment21')).to.be.true;
        expect(system.cancelPayment(91, 'acc7', 'payment22')).to.be.true;
        expect(system.cancelPayment(92, 'acc7', 'payment23')).to.be.false;
        expect(system.cancelPayment(93, 'acc7', 'payment24')).to.be.false;
        expect(system.cancelPayment(94, 'acc8', 'payment25')).to.be.false;
        expect(system.cancelPayment(95, 'acc8', 'payment26')).to.be.true;
        expect(system.cancelPayment(96, 'acc8', 'payment27')).to.be.true;
        expect(system.cancelPayment(97, 'acc9', 'payment28')).to.be.true;
        expect(system.cancelPayment(98, 'acc9', 'payment29')).to.be.true;
        expect(system.cancelPayment(99, 'acc9', 'payment30')).to.be.false;
        expected = ['acc7(740)', 'acc0(676)', 'acc2(629)', 'acc9(579)', 'acc6(485)', 'acc5(360)', 'acc8(125)', 'acc3(114)', 'acc1(108)', 'acc4(0)'];
        expect(system.topSpenders(100, 10)).to.deep.equal(expected);
    });
});
