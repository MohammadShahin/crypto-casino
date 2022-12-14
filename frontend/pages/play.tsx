import type { NextPage } from 'next'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { useCasinoContract } from '../src/hooks/contracts/useCasinoContract'
import {
    Flex,
    useToast,
    Box,
    Button,
    Text,
    useColorMode,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import TableWithCards from '../src/components/TableWithCards'

const Home: NextPage = () => {
    const [userNumber, setUserNumber] = useState(0)
    const [isTransactionLoading, setIsTransactionLoading] = useState(false)
    const contract = useCasinoContract()
    const { isConnected } = useAccount()
    const { setColorMode } = useColorMode()
    const toast = useToast()

    useEffect(() => {
        setColorMode('dark')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const guessNumber = async () => {
        if (userNumber && isConnected) {
            setIsTransactionLoading(true)
            try {
                await contract.guessTheNumber(userNumber, {
                    value: ethers.utils.parseEther('0.0000001'),
                })
            } catch {
                toast({
                    title: "Couldn't send transaction!",
                    description: 'Please try again.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
            setIsTransactionLoading(false)
        } else {
            toast({
                title: "Couldn't send transaction!",
                description: 'Please connect your wallet.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    return (
        <Flex direction="column" alignItems="center" justifyContent="center">
            <Box mt={10} />

            <Text
                fontSize="4xl"
                mb="3rem"
                color={'yellow.300'}
                fontWeight="bold"
            >
                Two cards among these cards are Aces. Choose one of them and win
                some money!
            </Text>

            <TableWithCards
                selectedCard={userNumber}
                setSelectedCard={(newNumber: number) =>
                    setUserNumber(newNumber)
                }
                isLoading={isTransactionLoading}
            />

            <Box mt={10} />

            <Button
                onClick={guessNumber}
                isLoading={isTransactionLoading}
                w="15rem"
                h="5rem"
                fontSize={'2xl'}
            >
                Guess
            </Button>
        </Flex>
    )
}

export default Home
