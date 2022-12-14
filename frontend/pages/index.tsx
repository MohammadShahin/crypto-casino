import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
    Center,
    Heading,
    Text,
    Button,
    Flex,
    Box,
    useColorMode,
} from '@chakra-ui/react'
import { useStaticPrize } from '../src/hooks/useStaticPrize'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
    const router = useRouter()
    const staticPrize = useStaticPrize()
    const [mounted, setMounted] = useState(false)
    const { setColorMode } = useColorMode()

    useEffect(() => setMounted(true), [])

    useEffect(() => {
        setColorMode('dark')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!mounted) return null

    return (
        <div className="app">
            <Center>
                <Heading margin="2% 0%" colorScheme="blue">
                    Casino
                </Heading>
            </Center>
            <Flex flexDir={'column'} textAlign="center">
                <Box>
                    <Text fontSize="xl" colorScheme="blue" margin="1% 10%">
                        Casino is a blockchain based lottery/roulette game.
                        It&apos;s a mix between buying lottery tickets and
                        casino IGT Triple Stars Slot machine.
                    </Text>
                    <Text
                        fontSize="xl"
                        colorScheme="blue"
                        as="b"
                        margin="2% 18%"
                        fontStyle="italic"
                        color={'yellow.300'}
                    >
                        The difference here is when you lose, there is a high
                        chance of you getting back most of your money!
                    </Text>
                </Box>

                <Text fontSize="xl" colorScheme="blue" margin="2% 10%">
                    The game works as follows: You need to pick one playing card
                    from a deck with 8 cards. There are 2 aces in the deck. If
                    you pick any of the aces you will win in the game. There are
                    3 possible sources for your winning:{' '}
                    <span style={{ fontWeight: 'bold', color: 'turquoise' }}>
                        Pot, Queue, Static Prize
                    </span>
                </Text>

                <Text fontSize="xl" colorScheme="blue" margin="0 10%">
                    If you pick the Ace of clubs you will win the maximum
                    between{' '}
                    <span style={{ fontWeight: 'bold', color: 'turquoise' }}>
                        ({ethers.utils.formatEther(staticPrize)}, 20% of the
                        money in the queue) eth
                    </span>
                    .
                </Text>

                <Text fontSize="xl" colorScheme="blue" margin="0% 10%">
                    If you pick the Ace of spades you will win the maximum
                    between{' '}
                    <span style={{ fontWeight: 'bold', color: 'turquoise' }}>
                        ({ethers.utils.formatEther(staticPrize)}, 10% of the
                        money in the pot) eth
                    </span>
                    .
                </Text>

                <Text fontSize="xl" colorScheme="blue" margin="1% 10%">
                    Everytime you don&apos;t guess any of the aces, 10% of your
                    money will be added to the{' '}
                    <span style={{ fontWeight: 'bold', color: 'turquoise' }}>
                        Pot
                    </span>
                    . The more players play the game, the bigger the{' '}
                    <span style={{ fontWeight: 'bold', color: 'turquoise' }}>
                        Pot
                    </span>{' '}
                    will be. Also, 15% of your money will be kept in the
                    contract (as a fee for playing the game). The remaining 75%
                    of your money will be added to the{' '}
                    <span style={{ fontWeight: 'bold', color: 'turquoise' }}>
                        Queue
                    </span>
                    . The money will stay in the queue for{' '}
                    <span style={{ fontWeight: 'bold', color: 'turquoise' }}>
                        one hour
                    </span>
                    . If no player wins any money from the queue, the whole 75%
                    will be sent back to you. If another player wins from the
                    queue, 0.00001 from your money, and everyone else in the
                    queue, will be sent to the winner.
                </Text>
            </Flex>
            <Center>
                <Button
                    marginTop="4%"
                    colorScheme="blue"
                    onClick={() => router.push('/play')}
                >
                    Play!
                </Button>
            </Center>
        </div>
    )
}

export default Home
