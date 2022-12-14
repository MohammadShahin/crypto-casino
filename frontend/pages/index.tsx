import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Center, Heading, Text, Button, Flex, Box } from '@chakra-ui/react'
import { useStaticPrize } from '../src/hooks/useStaticPrize'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
    const router = useRouter()
    const staticPrize = useStaticPrize()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <div className="app">
            <Center>
                <Heading margin="3% 0%" colorScheme="blue">
                    Casino
                </Heading>
            </Center>
            <Flex flexDir={'column'}>
                <Box>
                <Text fontSize="2xl" colorScheme="blue" margin="2% 10%">
                    Casino is a blockchain based lottery/roulette game.
                    It&apos;s a mix between buying lottery tickets and casino
                    IGT Triple Stars Slot machine. 
                </Text>
                <Text fontSize="2xl" colorScheme="blue" as="b" margin="2% 11%" fontStyle='italic' color={'yellow.300'}>
                    The difference here is when you lose, there is a high chance
                    of you getting back most of your money!
                    </Text>
                </Box>
               
                <Text fontSize="2xl" colorScheme="blue" margin="2% 10%">
                    The game works as follows: You need to pick one playing card from a deck with 8 cards. There are 2 aces in the deck,
                    if you pick the Ace of clubs you will win the maximum between <span style={{fontWeight: 'bold', color:'turquoise'}}>({ethers.utils.formatEther(staticPrize)}, 20% of the money in the queue) eth</span>.
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
