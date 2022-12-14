// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "./DoubleEndedQueue.sol";
// import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract Casino is VRFConsumerBase {
    uint256 public potPrizePercentage;
    uint256 public potIncomePercentage;
    uint256 public staticPrize;
    uint256 public ownerIncomePercentage;
    uint256 public queuePrizeAmount;
    uint256 public biddingAmount;
    uint256 public timeToLive;
    uint256 public numbersRange;

    DoubleEndedQueue.Bytes32Deque public queue;

    uint256 public pot = 0;
    uint256 public queueTakenAmount = 0;
    uint256 public queueAvailableFunds = 0;

    address payable public owner;

    mapping(address => uint256) public toBePaid;

    event GuessedTheNumber(address indexed bidder, uint indexed guessedNumber, uint indexed winningNumber, uint prize);

    constructor(
        uint256 _potPrizePercentage,
        uint256 _potIncomePercentage,
        uint256 _staticPrize,
        uint256 _ownerIncomePercentage,
        uint256 _queuePrizeAmount,
        uint256 _biddingAmount,
        uint256 _timeToLive,
        uint256 _numbersRange
    ) {
        owner = payable(msg.sender);
        potPrizePercentage = _potPrizePercentage;
        potIncomePercentage = _potIncomePercentage;
        staticPrize = _staticPrize;
        ownerIncomePercentage = _ownerIncomePercentage;
        queuePrizeAmount = _queuePrizeAmount;
        biddingAmount = _biddingAmount;
        timeToLive = _timeToLive;
        numbersRange = _numbersRange;
        DoubleEndedQueue.clear(queue);
    }

    receive() external payable {
        // React to receiving ether
    }

    function changePotPrizePercentage(uint256 _percentage) public {
        require(msg.sender == owner, "Only owner!");
        potPrizePercentage = _percentage;
    }

    function changeStaticPrize(uint256 _staticPrize) public {
        require(msg.sender == owner, "Only owner!");
        staticPrize = _staticPrize;
    }

    function changePotIncomePercentage(uint256 _potIncomePercentage) public {
        require(msg.sender == owner, "Only owner!");
        potIncomePercentage = _potIncomePercentage;
    }

    function changeOwnerIncomePercentage(uint256 _ownerIncomePercentage) public {
        require(msg.sender == owner, "Only owner!");
        ownerIncomePercentage = _ownerIncomePercentage;
    }

    function changeQueuePrizeAmount(uint256 _queuePrizeAmount) public {
        require(msg.sender == owner, "Only owner!");
        queuePrizeAmount = _queuePrizeAmount;
    }

    function changeBiddingAmount(uint256 _biddingAmount) public {
        require(msg.sender == owner, "Only owner!");
        biddingAmount = _biddingAmount;
    }

    function changeTimeToLive(uint256 _timeToLive) public {
        require(msg.sender == owner, "Only owner!");
        timeToLive = _timeToLive;
    }

    function changeNumbersRange(uint256 _numbersRange) public {
        require(msg.sender == owner, "Only owner!");
        numbersRange = _numbersRange;
    }

    function getMax(uint256 a, uint256 b) public pure returns (uint256) {
        if (a > b) return a;
        return b;
    }

    function guessTheNumber(uint256 _number) public payable {
        handleGuess(msg.sender, _number, 1);
    }

    function handleGuess(
        address bidder,
        uint256 _number,
        uint256 winningNumber
    ) public payable returns (uint256, uint256) {
        if (_number == winningNumber) {
            uint256 queuePrize = queuePrizeAmount *
                uint256(DoubleEndedQueue.length(queue));
            uint256 maxPrize = getMax(queuePrize, staticPrize);

            if (maxPrize == queuePrize) {
                queueTakenAmount += queuePrizeAmount;
                queueAvailableFunds -= queuePrize;
                cleanQueue();
            }
            emit GuessedTheNumber(bidder, _number, winningNumber, maxPrize);
            toBePaid[bidder] += maxPrize;
        } else if (_number == (winningNumber % numbersRange) + 1) {
            uint256 potPrize = (potPrizePercentage * pot) / 100;

            uint256 maxPrize = getMax(potPrize, staticPrize);

            if (maxPrize == potPrize) {
                pot -= potPrize;
            }

            emit GuessedTheNumber(bidder, _number, winningNumber, maxPrize);
            toBePaid[bidder] += maxPrize;
        } else {
            // keep the owner its share from the losing bid inside the
            // contract's funds
            uint256 ownerShare = (biddingAmount * ownerIncomePercentage) / 100;

            uint256 potShare = (biddingAmount * potIncomePercentage) / 100;

            // add to the pot its share from the losing bid
            pot += potShare;

            // losing bid - add item to the queue after subtracting the owner and pot share and adding the already queueTakenAmount
            cleanQueue();
            DoubleEndedQueue.pushFront(
                queue,
                DoubleEndedQueue.CasinoData(
                    bidder,
                    biddingAmount - ownerShare - potShare + queueTakenAmount,
                    _number,
                    winningNumber,
                    block.timestamp
                )
            );
            queueAvailableFunds += biddingAmount - ownerShare - potShare;
            emit GuessedTheNumber(bidder, _number, winningNumber, 0);
        }
        return (winningNumber, (winningNumber % numbersRange) + 1);
    }

    function cleanQueue() public {
        while (!DoubleEndedQueue.empty(queue)) {
            DoubleEndedQueue.CasinoData storage item = DoubleEndedQueue.back(
                queue
            );
            if (item.timeAdded + timeToLive <= block.timestamp) {
                if (item.bid - queueTakenAmount > 0){
                    toBePaid[item.bidder] += item.bid - queueTakenAmount;
                }
                emit GuessedTheNumber(item.bidder, item.guessedNumber, item.winningNumber, item.bid - queueTakenAmount);
                DoubleEndedQueue.popBack(queue);
            } 
            else if (item.bid - queueTakenAmount == 0) {
                emit GuessedTheNumber(item.bidder, item.guessedNumber, item.winningNumber, item.bid - queueTakenAmount);
                DoubleEndedQueue.popBack(queue);
            } 
            else break;
        }
    }
}
