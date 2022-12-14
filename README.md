# casino-game

Casino is a blockchain based lottery/roulette game. It's a mix between buying lottery tickets and casino IGT
Triple Stars Slot machine, the difference here is when you lose, there is a high chance of you getting back most of your
money!

The game works as follows:
You need to guess one of the two lucky numbers (X, Y) which are being randomly generated in our smart contract, where ${X, Y}\in [1, 8]$

- If you guessed X you get a constant amount of money (S - predetermined).
- If you guessed Y you get a percentage (P - predetermined) of the total money currently in the queue.
- If you didn’t guess neither X nor Y, you’ll be pushed into the Queue.

Queue: when players don't guess any of the lucky numbers, the amount they paid for participation in the game enters the 
queue for 24 hours. Now when another participant guesses Y and your 24 hours didn’t finish yet,
your new participation amount in the queue will be $newParticipationAmount = oldParticipationAmount * (1 - P)$.
Finally, after 24 hours players get back what’s left of their money!
