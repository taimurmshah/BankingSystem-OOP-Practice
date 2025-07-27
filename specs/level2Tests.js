const chai = require('chai');
chai.config.truncateThreshold = 0;
const { expect } = chai;
const BankingSystem = require('../bankingSystem');

/**
 * The test suit below includes 10 tests for Level 2.
 *
 * All have the same score.
 * You are not allowed to modify this file,
 * but feel free to read the source code
 * to better understand what is happening in every specific case.
 */
describe('Level 2 tests', () => {

    let system;

    beforeEach(() => {
        system = new BankingSystem();
    });

    it('Test level 2 case 01 basic top spenders 1', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.createAccount(3, 'account3')).to.be.true;
        expect(system.deposit(4, 'account1', 1000)).to.deep.equal(1000);
        expect(system.deposit(5, 'account2', 1000)).to.deep.equal(1000);
        expect(system.deposit(6, 'account3', 1000)).to.deep.equal(1000);
        expect(system.transfer(7, 'account2', 'account3', 100)).to.deep.equal(900);
        expect(system.transfer(8, 'account2', 'account3', 100)).to.deep.equal(800);
        expect(system.transfer(9, 'account3', 'account1', 100)).to.deep.equal(1100);
        let expected = ['account2(200)', 'account3(100)', 'account1(0)'];
        expect(system.topSpenders(10, 3)).to.deep.equal(expected);
    });

    it('Test level 2 case 02 basic top spenders 2', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.createAccount(3, 'account3')).to.be.true;
        expect(system.deposit(4, 'account1', 500)).to.deep.equal(500);
        expect(system.deposit(5, 'account2', 500)).to.deep.equal(500);
        expect(system.deposit(6, 'account3', 750)).to.deep.equal(750);
        expect(system.transfer(7, 'account2', 'account3', 239)).to.deep.equal(261);
        expect(system.transfer(8, 'account3', 'account1', 350)).to.deep.equal(639);
        expect(system.transfer(9, 'account2', 'account1', 61)).to.deep.equal(200);
        let expected = ['account3(350)', 'account2(300)'];
        expect(system.topSpenders(10, 2)).to.deep.equal(expected);
        expected = ['account3(350)', 'account2(300)', 'account1(0)'];
        expect(system.topSpenders(11, 4)).to.deep.equal(expected);
    });

    it('Test level 2 case 03 basic top spenders 3', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.createAccount(3, 'account3')).to.be.true;
        expect(system.deposit(4, 'account1', 1000)).to.deep.equal(1000);
        expect(system.deposit(5, 'account2', 1000)).to.deep.equal(1000);
        expect(system.deposit(6, 'account3', 1000)).to.deep.equal(1000);
        expect(system.transfer(7, 'account2', 'account3', 100)).to.deep.equal(900);
        expect(system.transfer(8, 'account3', 'account2', 200)).to.deep.equal(900);
        expect(system.transfer(9, 'account3', 'account1', 100)).to.deep.equal(800);
        expect(system.transfer(10, 'account2', 'account3', 199)).to.deep.equal(901);
        expect(system.transfer(11, 'account2', 'account3', 100)).to.deep.equal(801);
        expect(system.transfer(12, 'account2', 'account1', 2)).to.deep.equal(799);
        expect(system.transfer(13, 'account3', 'account1', 100)).to.deep.equal(999);
        let expected = ['account2(401)', 'account3(400)'];
        expect(system.topSpenders(14, 2)).to.deep.equal(expected);
        expected = ['account2(401)', 'account3(400)', 'account1(0)'];
        expect(system.topSpenders(15, 3)).to.deep.equal(expected);
        expected = ['account2(401)', 'account3(400)', 'account1(0)'];
        expect(system.topSpenders(16, 4)).to.deep.equal(expected);
    });

    it('Test level 2 case 04 top spenders with failed transfers', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'account1')).to.be.true;
        expect(system.createAccount(2, 'account2')).to.be.true;
        expect(system.createAccount(3, 'account3')).to.be.true;
        expect(system.deposit(4, 'account1', 1000)).to.deep.equal(1000);
        expect(system.deposit(5, 'account2', 1000)).to.deep.equal(1000);
        expect(system.deposit(6, 'account3', 1000)).to.deep.equal(1000);
        expect(system.transfer(7, 'account2', 'account3', 100)).to.deep.equal(900);
        expect(system.transfer(8, 'account2', 'account2', 500)).to.be.null;
        expect(system.transfer(9, 'account2', 'account1', 2000)).to.be.null;
        expect(system.transfer(10, 'account2', 'account4', 500)).to.be.null;
        expect(system.transfer(11, 'account3', 'account1', 200)).to.deep.equal(900);
        expect(system.transfer(12, 'account1', 'account2', 300)).to.deep.equal(900);
        let expected = ['account1(300)', 'account3(200)'];
        expect(system.topSpenders(13, 2)).to.deep.equal(expected);
        expected = ['account1(300)', 'account3(200)', 'account2(100)'];
        expect(system.topSpenders(14, 3)).to.deep.equal(expected);
        expected = ['account1(300)', 'account3(200)', 'account2(100)'];
        expect(system.topSpenders(15, 4)).to.deep.equal(expected);
    });

    it('Test level 2 case 05 top spenders alphabetical order 1', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'accountA')).to.be.true;
        expect(system.createAccount(2, 'accountC')).to.be.true;
        expect(system.createAccount(3, 'accountB')).to.be.true;
        expect(system.deposit(4, 'accountA', 1000)).to.deep.equal(1000);
        expect(system.deposit(5, 'accountB', 1000)).to.deep.equal(1000);
        expect(system.deposit(6, 'accountC', 1000)).to.deep.equal(1000);
        expect(system.transfer(7, 'accountB', 'accountC', 101)).to.deep.equal(899);
        expect(system.transfer(8, 'accountB', 'accountA', 99)).to.deep.equal(800);
        expect(system.transfer(9, 'accountA', 'accountC', 100)).to.deep.equal(999);
        expect(system.transfer(10, 'accountA', 'accountB', 100)).to.deep.equal(899);
        expect(system.transfer(11, 'accountC', 'accountA', 199)).to.deep.equal(1002);
        expect(system.transfer(12, 'accountC', 'accountA', 1)).to.deep.equal(1001);
        let expected = ['accountA(200)', 'accountB(200)', 'accountC(200)'];
        expect(system.topSpenders(13, 3)).to.deep.equal(expected);
    });

    it('Test level 2 case 06 top spenders alphabetical order 2', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'acc1')).to.be.true;
        expect(system.createAccount(2, 'acc3')).to.be.true;
        expect(system.createAccount(3, 'acc2')).to.be.true;
        expect(system.deposit(4, 'acc1', 100)).to.deep.equal(100);
        expect(system.deposit(5, 'acc2', 200)).to.deep.equal(200);
        expect(system.deposit(6, 'acc3', 300)).to.deep.equal(300);
        let expected = ['acc1(0)', 'acc2(0)', 'acc3(0)'];
        expect(system.topSpenders(7, 3)).to.deep.equal(expected);
    });

    it('Test level 2 case 07 all commands 1', function () {
        this.timeout(400);
        expect(system.createAccount(1, 'acc1')).to.be.true;
        expect(system.createAccount(2, 'acc2')).to.be.true;
        expect(system.createAccount(3, 'acc3')).to.be.true;
        expect(system.createAccount(4, 'acc4')).to.be.true;
        expect(system.createAccount(5, 'acc5')).to.be.true;
        expect(system.deposit(11, 'acc0', 900)).to.be.null;
        expect(system.deposit(12, 'acc1', 300)).to.deep.equal(300);
        expect(system.deposit(13, 'acc2', 350)).to.deep.equal(350);
        expect(system.deposit(14, 'acc3', 150)).to.deep.equal(150);
        expect(system.deposit(15, 'acc4', 400)).to.deep.equal(400);
        expect(system.deposit(16, 'acc5', 600)).to.deep.equal(600);
        expect(system.transfer(21, 'acc1', 'acc3', 20)).to.deep.equal(280);
        expect(system.deposit(22, 'acc3', 150)).to.deep.equal(320);
        expect(system.transfer(23, 'acc2', 'acc2', 25)).to.be.null;
        expect(system.transfer(24, 'acc2', 'acc1', 30)).to.deep.equal(320);
        expect(system.transfer(25, 'acc3', 'acc5', 35)).to.deep.equal(285);
        expect(system.deposit(26, 'acc4', 400)).to.deep.equal(800);
        expect(system.transfer(27, 'acc5', 'acc4', 40)).to.deep.equal(595);
        expect(system.transfer(28, 'acc3', 'acc4', 45)).to.deep.equal(240);
        expect(system.transfer(29, 'acc4', 'acc1', 50)).to.deep.equal(835);
        let expected = ['acc3(80)', 'acc4(50)', 'acc5(40)', 'acc2(30)', 'acc1(20)'];
        expect(system.topSpenders(30, 5)).to.deep.equal(expected);
        expect(system.deposit(31, 'acc5', 600)).to.deep.equal(1195);
        expect(system.transfer(32, 'acc3', 'acc4', 55)).to.deep.equal(185);
        expect(system.transfer(33, 'acc1', 'acc4', 60)).to.deep.equal(300);
        expect(system.transfer(34, 'acc1', 'acc0', 65)).to.be.null;
        expect(system.createAccount(35, 'acc6')).to.be.true;
        expected = ['acc3(135)', 'acc1(80)', 'acc4(50)', 'acc5(40)', 'acc2(30)'];
        expect(system.topSpenders(36, 5)).to.deep.equal(expected);
    });

    it('Test level 2 case 08 all commands 2', function () {
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
        expect(system.deposit(11, 'acc0', 41)).to.be.null;
        expect(system.deposit(12, 'acc1', 48)).to.deep.equal(48);
        expect(system.deposit(13, 'acc2', 30)).to.deep.equal(30);
        expect(system.deposit(14, 'acc3', 680)).to.deep.equal(680);
        expect(system.deposit(15, 'acc4', 326)).to.deep.equal(326);
        expect(system.deposit(16, 'acc5', 73)).to.deep.equal(73);
        expect(system.deposit(17, 'acc6', 349)).to.deep.equal(349);
        expect(system.deposit(18, 'acc7', 65)).to.deep.equal(65);
        expect(system.deposit(19, 'acc8', 547)).to.deep.equal(547);
        expect(system.deposit(20, 'acc9', 452)).to.deep.equal(452);
        expect(system.transfer(21, 'acc10', 'acc9', 540)).to.be.null;
        expect(system.transfer(22, 'acc9', 'acc3', 732)).to.be.null;
        expect(system.transfer(23, 'acc3', 'acc9', 926)).to.be.null;
        expect(system.transfer(24, 'acc4', 'acc1', 732)).to.be.null;
        expect(system.transfer(25, 'acc7', 'acc8', 304)).to.be.null;
        expect(system.transfer(26, 'acc7', 'acc4', 782)).to.be.null;
        expect(system.transfer(27, 'acc1', 'acc9', 597)).to.be.null;
        expect(system.transfer(28, 'acc6', 'acc1', 236)).to.deep.equal(113);
        expect(system.transfer(29, 'acc2', 'acc2', 467)).to.be.null;
        expect(system.transfer(30, 'acc6', 'acc8', 860)).to.be.null;
        expect(system.deposit(31, 'acc0', 396)).to.be.null;
        expect(system.deposit(32, 'acc1', 520)).to.deep.equal(804);
        expect(system.deposit(33, 'acc2', 709)).to.deep.equal(739);
        expect(system.deposit(34, 'acc3', 752)).to.deep.equal(1432);
        expect(system.deposit(35, 'acc4', 382)).to.deep.equal(708);
        expect(system.deposit(36, 'acc5', 521)).to.deep.equal(594);
        expect(system.deposit(37, 'acc6', 325)).to.deep.equal(438);
        expect(system.deposit(38, 'acc7', 534)).to.deep.equal(599);
        expect(system.deposit(39, 'acc8', 697)).to.deep.equal(1244);
        expect(system.deposit(40, 'acc9', 370)).to.deep.equal(822);
        let expected = ['acc6(236)', 'acc1(0)', 'acc10(0)', 'acc2(0)', 'acc3(0)', 'acc4(0)', 'acc5(0)', 'acc7(0)', 'acc8(0)', 'acc9(0)'];
        expect(system.topSpenders(41, 10)).to.deep.equal(expected);
        expect(system.transfer(42, 'acc2', 'acc1', 21)).to.deep.equal(718);
        expect(system.transfer(43, 'acc2', 'acc9', 922)).to.be.null;
        expect(system.transfer(44, 'acc9', 'acc1', 118)).to.deep.equal(704);
        expect(system.transfer(45, 'acc7', 'acc7', 230)).to.be.null;
        expected = ['acc6(236)', 'acc9(118)', 'acc2(21)', 'acc1(0)', 'acc10(0)', 'acc3(0)', 'acc4(0)', 'acc5(0)', 'acc7(0)', 'acc8(0)'];
        expect(system.topSpenders(46, 10)).to.deep.equal(expected);
        expect(system.transfer(47, 'acc8', 'acc4', 197)).to.deep.equal(1047);
        expect(system.transfer(48, 'acc10', 'acc7', 914)).to.be.null;
        expect(system.transfer(49, 'acc4', 'acc10', 192)).to.deep.equal(713);
        expected = ['acc6(236)', 'acc8(197)', 'acc4(192)', 'acc9(118)', 'acc2(21)', 'acc1(0)', 'acc10(0)', 'acc3(0)', 'acc5(0)', 'acc7(0)'];
        expect(system.topSpenders(50, 10)).to.deep.equal(expected);
        expect(system.transfer(51, 'acc5', 'acc1', 829)).to.be.null;
        expect(system.transfer(52, 'acc7', 'acc1', 451)).to.deep.equal(148);
        expect(system.transfer(53, 'acc9', 'acc1', 581)).to.deep.equal(123);
        expected = ['acc9(699)', 'acc7(451)', 'acc6(236)', 'acc8(197)', 'acc4(192)', 'acc2(21)', 'acc1(0)', 'acc10(0)', 'acc3(0)', 'acc5(0)'];
        expect(system.topSpenders(54, 10)).to.deep.equal(expected);
    });

    it('Test level 2 case 09 all commands 3', function () {
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
        expect(system.deposit(11, 'acc0', 928)).to.be.null;
        expect(system.deposit(12, 'acc1', 741)).to.deep.equal(741);
        expect(system.deposit(13, 'acc2', 703)).to.deep.equal(703);
        expect(system.deposit(14, 'acc3', 806)).to.deep.equal(806);
        expect(system.deposit(15, 'acc4', 785)).to.deep.equal(785);
        expect(system.deposit(16, 'acc5', 902)).to.deep.equal(902);
        expect(system.deposit(17, 'acc6', 927)).to.deep.equal(927);
        expect(system.deposit(18, 'acc7', 155)).to.deep.equal(155);
        expect(system.deposit(19, 'acc8', 267)).to.deep.equal(267);
        expect(system.deposit(20, 'acc9', 691)).to.deep.equal(691);
        expect(system.transfer(21, 'acc10', 'acc1', 894)).to.be.null;
        expect(system.transfer(22, 'acc5', 'acc9', 928)).to.be.null;
        expect(system.transfer(23, 'acc2', 'acc0', 422)).to.be.null;
        expect(system.transfer(24, 'acc6', 'acc1', 106)).to.deep.equal(821);
        expect(system.transfer(25, 'acc2', 'acc5', 486)).to.deep.equal(217);
        expect(system.transfer(26, 'acc9', 'acc7', 422)).to.deep.equal(269);
        expect(system.transfer(27, 'acc3', 'acc3', 325)).to.be.null;
        expect(system.transfer(28, 'acc10', 'acc10', 344)).to.be.null;
        expect(system.transfer(29, 'acc5', 'acc6', 95)).to.deep.equal(1293);
        expect(system.transfer(30, 'acc10', 'acc8', 825)).to.be.null;
        let expected = ['acc2(486)', 'acc9(422)', 'acc6(106)', 'acc5(95)', 'acc1(0)', 'acc10(0)', 'acc3(0)', 'acc4(0)', 'acc7(0)', 'acc8(0)'];
        expect(system.topSpenders(31, 10)).to.deep.equal(expected);
    });

    it('Test level 2 case 10 all commands 4', function () {
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
        expect(system.deposit(11, 'acc0', 862)).to.be.null;
        expect(system.deposit(12, 'acc1', 504)).to.deep.equal(504);
        expect(system.deposit(13, 'acc2', 415)).to.deep.equal(415);
        expect(system.deposit(14, 'acc3', 84)).to.deep.equal(84);
        expect(system.deposit(15, 'acc4', 212)).to.deep.equal(212);
        expect(system.deposit(16, 'acc5', 587)).to.deep.equal(587);
        expect(system.deposit(17, 'acc6', 249)).to.deep.equal(249);
        expect(system.deposit(18, 'acc7', 36)).to.deep.equal(36);
        expect(system.deposit(19, 'acc8', 207)).to.deep.equal(207);
        expect(system.deposit(20, 'acc9', 97)).to.deep.equal(97);
        expect(system.transfer(21, 'acc1', 'acc3', 260)).to.deep.equal(244);
        expect(system.transfer(22, 'acc4', 'acc4', 707)).to.be.null;
        expect(system.transfer(23, 'acc4', 'acc2', 639)).to.be.null;
        expect(system.transfer(24, 'acc1', 'acc0', 274)).to.be.null;
        expect(system.transfer(25, 'acc3', 'acc3', 588)).to.be.null;
        expect(system.transfer(26, 'acc3', 'acc0', 14)).to.be.null;
        expect(system.transfer(27, 'acc10', 'acc9', 308)).to.be.null;
        expect(system.transfer(28, 'acc4', 'acc2', 712)).to.be.null;
        expect(system.transfer(29, 'acc10', 'acc5', 615)).to.be.null;
        expect(system.transfer(30, 'acc7', 'acc2', 945)).to.be.null;
        expect(system.deposit(31, 'acc0', 654)).to.be.null;
        expect(system.deposit(32, 'acc1', 281)).to.deep.equal(525);
        expect(system.deposit(33, 'acc2', 570)).to.deep.equal(985);
        expect(system.deposit(34, 'acc3', 853)).to.deep.equal(1197);
        expect(system.deposit(35, 'acc4', 444)).to.deep.equal(656);
        expect(system.deposit(36, 'acc5', 161)).to.deep.equal(748);
        expect(system.deposit(37, 'acc6', 169)).to.deep.equal(418);
        expect(system.deposit(38, 'acc7', 416)).to.deep.equal(452);
        expect(system.deposit(39, 'acc8', 952)).to.deep.equal(1159);
        expect(system.deposit(40, 'acc9', 724)).to.deep.equal(821);
        let expected = ['acc1(260)', 'acc10(0)', 'acc2(0)', 'acc3(0)', 'acc4(0)', 'acc5(0)', 'acc6(0)', 'acc7(0)', 'acc8(0)', 'acc9(0)'];
        expect(system.topSpenders(41, 10)).to.deep.equal(expected);
        expect(system.transfer(42, 'acc1', 'acc2', 799)).to.be.null;
        expect(system.transfer(43, 'acc9', 'acc6', 354)).to.deep.equal(467);
        expect(system.transfer(44, 'acc3', 'acc1', 929)).to.deep.equal(268);
        expect(system.transfer(45, 'acc9', 'acc0', 532)).to.be.null;
        expect(system.transfer(46, 'acc3', 'acc6', 177)).to.deep.equal(91);
        expect(system.transfer(47, 'acc2', 'acc1', 118)).to.deep.equal(867);
        expect(system.transfer(48, 'acc4', 'acc0', 830)).to.be.null;
        expect(system.transfer(49, 'acc10', 'acc5', 689)).to.be.null;
        expect(system.transfer(50, 'acc6', 'acc7', 544)).to.deep.equal(405);
        expect(system.transfer(51, 'acc0', 'acc10', 169)).to.be.null;
        expected = ['acc3(1106)', 'acc6(544)', 'acc9(354)', 'acc1(260)', 'acc2(118)', 'acc10(0)', 'acc4(0)', 'acc5(0)', 'acc7(0)', 'acc8(0)'];
        expect(system.topSpenders(52, 10)).to.deep.equal(expected);
    });
});
