import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

describe("Casino with static random", function () {

  async function deployCasinoVariant1() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    console.log();
    console.log("Owner Address", owner.address)
    console.log("Other account Address", otherAccount.address)

    const potPrizePercentage = 10;
    const potIncomePercentage = 10;
    const staticPrize = ethers.utils.parseEther("0.5");
    const ownerIncomePercentage = 15;
    const queuePrizeAmount = ethers.utils.parseEther("0.02");
    const biddingAmount = ethers.utils.parseEther("0.1");
    const timeToLive = 3600;
    const numbersRange = 8;

    const provider = ethers.provider;

    const Casino = await ethers.getContractFactory("Casino");

    const casino = await Casino.connect(owner).deploy(potPrizePercentage, potIncomePercentage, staticPrize,
      ownerIncomePercentage, queuePrizeAmount, biddingAmount, timeToLive, numbersRange);

    await casino.deployed();

    console.log("Casino Address", casino.address);
    console.log("---------------");

    return {
      potPrizePercentage, casino, owner, otherAccount, potIncomePercentage, staticPrize,
      ownerIncomePercentage, queuePrizeAmount, biddingAmount, timeToLive, numbersRange,
      provider
    };
  }

  async function deployCasinoShortTTL() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    console.log();
    console.log("Owner Address", owner.address)
    console.log("Other account Address", otherAccount.address)

    const potPrizePercentage = 10;
    const potIncomePercentage = 10;
    const staticPrize = ethers.utils.parseEther("0.5");
    const ownerIncomePercentage = 15;
    const queuePrizeAmount = ethers.utils.parseEther("0.02");
    const biddingAmount = ethers.utils.parseEther("0.1");
    const timeToLive = 1;
    const numbersRange = 8;

    const provider = ethers.provider;

    const Casino = await ethers.getContractFactory("Casino");

    const casino = await Casino.connect(owner).deploy(potPrizePercentage, potIncomePercentage, staticPrize,
      ownerIncomePercentage, queuePrizeAmount, biddingAmount, timeToLive, numbersRange);

    await casino.deployed();

    console.log("Casino Address", casino.address);
    console.log();

    return {
      potPrizePercentage, casino, owner, otherAccount, potIncomePercentage, staticPrize,
      ownerIncomePercentage, queuePrizeAmount, biddingAmount, timeToLive, numbersRange,
      provider
    };
  }

  async function deployCasinoShortTTLPrizeFromQueue() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    console.log();
    console.log("Owner Address", owner.address)
    console.log("Other account Address", otherAccount.address)

    const potPrizePercentage = 10;
    const potIncomePercentage = 10;
    const staticPrize = ethers.utils.parseEther("0.000002");
    const ownerIncomePercentage = 15;
    const queuePrizeAmount = ethers.utils.parseEther("0.02");
    const biddingAmount = ethers.utils.parseEther("0.1");
    const timeToLive = 1;
    const numbersRange = 8;

    const provider = ethers.provider;

    const Casino = await ethers.getContractFactory("Casino");

    const casino = await Casino.connect(owner).deploy(potPrizePercentage, potIncomePercentage, staticPrize,
      ownerIncomePercentage, queuePrizeAmount, biddingAmount, timeToLive, numbersRange);

    await casino.deployed();

    console.log("Casino Address", casino.address);
    console.log();

    return {
      potPrizePercentage, casino, owner, otherAccount, potIncomePercentage, staticPrize,
      ownerIncomePercentage, queuePrizeAmount, biddingAmount, timeToLive, numbersRange,
      provider
    };
  }

  async function deployCasinoShortTTLPrizeFromPot() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    console.log();
    console.log("Owner Address", owner.address)
    console.log("Other account Address", otherAccount.address)

    const potPrizePercentage = 50;
    const potIncomePercentage = 50;
    const staticPrize = ethers.utils.parseEther("0.000002");
    const ownerIncomePercentage = 15;
    const queuePrizeAmount = ethers.utils.parseEther("0.000002");
    const biddingAmount = ethers.utils.parseEther("0.1");
    const timeToLive = 1;
    const numbersRange = 8;

    const provider = ethers.provider;

    const Casino = await ethers.getContractFactory("Casino");

    const casino = await Casino.connect(owner).deploy(potPrizePercentage, potIncomePercentage, staticPrize,
      ownerIncomePercentage, queuePrizeAmount, biddingAmount, timeToLive, numbersRange);

    await casino.deployed();

    console.log("Casino Address", casino.address);
    console.log();

    return {
      potPrizePercentage, casino, owner, otherAccount, potIncomePercentage, staticPrize,
      ownerIncomePercentage, queuePrizeAmount, biddingAmount, timeToLive, numbersRange,
      provider
    };
  }

  async function deployCasinoShortTTLPrizeFromStaticPrize() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    console.log();
    console.log("Owner Address", owner.address)
    console.log("Other account Address", otherAccount.address)

    const potPrizePercentage = 20;
    const potIncomePercentage = 20;
    const staticPrize = ethers.utils.parseEther("0.5");
    const ownerIncomePercentage = 15;
    const queuePrizeAmount = ethers.utils.parseEther("0.000002");
    const biddingAmount = ethers.utils.parseEther("0.1");
    const timeToLive = 1;
    const numbersRange = 8;

    const provider = ethers.provider;

    const Casino = await ethers.getContractFactory("Casino");

    const casino = await Casino.connect(owner).deploy(potPrizePercentage, potIncomePercentage, staticPrize,
      ownerIncomePercentage, queuePrizeAmount, biddingAmount, timeToLive, numbersRange);

    await casino.deployed();

    console.log("Casino Address", casino.address);
    console.log();

    return {
      potPrizePercentage, casino, owner, otherAccount, potIncomePercentage, staticPrize,
      ownerIncomePercentage, queuePrizeAmount, biddingAmount, timeToLive, numbersRange,
      provider
    };
  }

  describe("Changing prizes amounts and percentages", function () {
    it("Does Change the potPrizePercentage", async function () {
      const { casino, potPrizePercentage } = await loadFixture(deployCasinoVariant1);

      expect(await casino.potPrizePercentage()).to.equal(potPrizePercentage);

      await casino.changePotPrizePercentage(20);

      expect(await casino.potPrizePercentage()).to.equal(20);
    });

    it("Does not change the potPrizePercentage with non-owner account", async function () {
      const { casino, otherAccount, potPrizePercentage } = await loadFixture(deployCasinoVariant1);

      expect(await casino.potPrizePercentage()).to.equal(potPrizePercentage);

      await expect(casino.connect(otherAccount).changePotPrizePercentage(20)).to.be.reverted;
    });

    it("Does Change the staticPrize", async function () {
      const { casino, staticPrize } = await loadFixture(deployCasinoVariant1);

      expect(await casino.staticPrize()).to.equal(staticPrize);

      await casino.changeStaticPrize(20);
      expect(await casino.staticPrize()).to.equal(20);
    });

    it("Does not change the staticPrize with non-owner account", async function () {
      const { casino, otherAccount, staticPrize } = await loadFixture(deployCasinoVariant1);

      expect(await casino.staticPrize()).to.equal(staticPrize);

      await expect(casino.connect(otherAccount).changeStaticPrize(20)).to.be.reverted;
    });

    it("Does Change the staticPrize", async function () {
      const { casino, potIncomePercentage } = await loadFixture(deployCasinoVariant1);

      expect(await casino.potIncomePercentage()).to.equal(potIncomePercentage);

      await casino.changePotIncomePercentage(20);
      expect(await casino.potIncomePercentage()).to.equal(20);
    });

    it("Does not change the staticPrize with non-owner account", async function () {
      const { casino, otherAccount, potIncomePercentage } = await loadFixture(deployCasinoVariant1);

      expect(await casino.potIncomePercentage()).to.equal(potIncomePercentage);

      await expect(casino.connect(otherAccount).changePotIncomePercentage(20)).to.be.reverted;
    });

    it("Does Change the ownerIncomePercentage", async function () {
      const { casino, ownerIncomePercentage } = await loadFixture(deployCasinoVariant1);

      expect(await casino.ownerIncomePercentage()).to.equal(ownerIncomePercentage);

      await casino.changeOwnerIncomePercentage(20);
      expect(await casino.ownerIncomePercentage()).to.equal(20);
    });

    it("Does not change the ownerIncomePercentage with non-owner account", async function () {
      const { casino, otherAccount, ownerIncomePercentage } = await loadFixture(deployCasinoVariant1);

      expect(await casino.ownerIncomePercentage()).to.equal(ownerIncomePercentage);

      await expect(casino.connect(otherAccount).changeOwnerIncomePercentage(20)).to.be.reverted;
    });

    it("Does Change the queuePrizeAmount", async function () {
      const { casino, queuePrizeAmount } = await loadFixture(deployCasinoVariant1);

      expect(await casino.queuePrizeAmount()).to.equal(queuePrizeAmount);

      await casino.changeQueuePrizeAmount(20);
      expect(await casino.queuePrizeAmount()).to.equal(20);
    });

    it("Does not change the queuePrizeAmount with non-owner account", async function () {
      const { casino, otherAccount, queuePrizeAmount } = await loadFixture(deployCasinoVariant1);

      expect(await casino.queuePrizeAmount()).to.equal(queuePrizeAmount);

      await expect(casino.connect(otherAccount).changeQueuePrizeAmount(20)).to.be.reverted;
    });

    it("Does Change the biddingAmount", async function () {
      const { casino, biddingAmount } = await loadFixture(deployCasinoVariant1);

      expect(await casino.biddingAmount()).to.equal(biddingAmount);

      await casino.changeBiddingAmount(20);
      expect(await casino.biddingAmount()).to.equal(20);
    });

    it("Does not change the biddingAmount with non-owner account", async function () {
      const { casino, otherAccount, biddingAmount } = await loadFixture(deployCasinoVariant1);

      expect(await casino.biddingAmount()).to.equal(biddingAmount);

      await expect(casino.connect(otherAccount).changeBiddingAmount(20)).to.be.reverted;
    });

    it("Does Change the timeToLive", async function () {
      const { casino, timeToLive } = await loadFixture(deployCasinoVariant1);

      expect(await casino.timeToLive()).to.equal(timeToLive);

      await casino.changeTimeToLive(20);
      expect(await casino.timeToLive()).to.equal(20);
    });

    it("Does not change the timeToLive with non-owner account", async function () {
      const { casino, otherAccount, timeToLive } = await loadFixture(deployCasinoVariant1);

      expect(await casino.timeToLive()).to.equal(timeToLive);

      await expect(casino.connect(otherAccount).changeTimeToLive(20)).to.be.reverted;
    });

    it("Does Change the numbersRange", async function () {
      const { casino, numbersRange } = await loadFixture(deployCasinoVariant1);

      expect(await casino.numbersRange()).to.equal(numbersRange);

      await casino.changeNumbersRange(20);
      expect(await casino.numbersRange()).to.equal(20);
    });

    it("Does not change the numbersRange with non-owner account", async function () {
      const { casino, otherAccount, numbersRange } = await loadFixture(deployCasinoVariant1);

      expect(await casino.numbersRange()).to.equal(numbersRange);

      await expect(casino.connect(otherAccount).changeNumbersRange(20)).to.be.reverted;
    });

  });

});
