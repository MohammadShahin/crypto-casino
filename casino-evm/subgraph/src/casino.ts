import { BigInt } from "@graphprotocol/graph-ts"
import { Casino, GuessedTheNumber, Withdraw, WithdrawOwner } from "../generated/Casino/Casino"
import { Guess, BidWithdrawal, OwnerWithdrawal } from "../generated/schema"

export function handleGuessedTheNumber(event: GuessedTheNumber): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Guess.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Guess(event.transaction.hash.toHex());

  }

  // Entity fields can be set based on event parameters
  entity.bidder = event.params.bidder.toHex();
  entity.guessedNumber = event.params.guessedNumber;
  entity.winningNumber = event.params.winningNumber;
  entity.prize = event.params.prize;
  entity.timestamp = event.block.timestamp;

  // Entities can be written to the store with `.save()`
  entity.save()

}

export function handleWithdraw(event: Withdraw): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = BidWithdrawal.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new BidWithdrawal(event.transaction.hash.toHex());

  }

  // Entity fields can be set based on event parameters
  entity.player = event.params.player.toHex();
  entity.amount = event.params.amount;
  entity.timestamp = event.params.timestamp;

  // Entities can be written to the store with `.save()`
  entity.save()

}

export function handleWithdrawOwner(event: WithdrawOwner): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = OwnerWithdrawal.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new OwnerWithdrawal(event.transaction.hash.toHex());

  }

  // Entity fields can be set based on event parameters
  entity.amount = event.params.amount;
  entity.timestamp = event.params.timestamp;

  // Entities can be written to the store with `.save()`
  entity.save()

}
