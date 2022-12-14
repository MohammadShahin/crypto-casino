# casino-game

Casino is a blockchain based lottery/roulette game. It's a mix between buying lottery tickets and casino IGT
Triple Stars Slot machine, the difference here is when you lose, there is a high chance of you getting back most of your
money!

The game works as follows: You need to pick one playing card from a deck with 8 cards. There are 2 aces in the deck. If you pick any of the aces you will win in the game. There are 3 possible sources for your winning: **Pot**, **Queue**, **Static Prize**

- If you picked the Ace of Clubs you get a constant amount of money (S - predetermined).
- If you picked the Ace of Spades you get a percentage (P - predetermined) of the total money currently in the **Queue**.
- If you didn’t pick neither of the Aces, you’ll be pushed into the **Queue**.

Queue: when players don't pick any of the aces, the amount they paid for participation in the game enters the 
queue for 1 hour. Now when another participant pick the Ace of Spades and your 1 hour didn’t finish yet,
your new participation amount in the queue will be $newParticipationAmount = oldParticipationAmount * (1 - P)$.
Finally, after 1 hour players get back what’s left of their money!

## Frontend

### Installing packages

First go inside the frontend folder `cd frontend`

```
npm install
```

### Running the application
```
npm run dev
```

## Contracts

First go inside the contracts folder `cd casino-evm`

### Installing packages
```
npm install
```

### Compiling the contracts
```
npx hardhat compile
```

### Running tests
```
npx hardhat test
```

### Deploying the contract
First, you need to edit `hardhat.config.ts` and add your private key into the `accounts` array inside the networks property.
Then you can deploy the contract using the following command:
```
npx hardhat run scripts/deploy.ts --network <NETWORK>
```

### Scripts

There are more scripts to interact with the contract inside the script folder. They can be called the same way as deploying the contract, just change the file name.

## Subgraph

We deployed a subgraph to listend to the events emitted from our `Casino.sol` contract. You can see the config of the subgraph inside the `subgraph.yaml` file.

We are using `Apolo` graphql client on the frontend side that subscribes to the subgraph.

First go inside the subgraph folder `cd casino-evm/subgraph` 

### Installing packages
```
yarn
```

### Generating Types
```
yarn run codegen
```

### Building the project
```
yarn run build
```

### Deploying the Subgraph
```
yarn run deploy
```



