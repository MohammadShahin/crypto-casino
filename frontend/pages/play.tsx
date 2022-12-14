import type { NextPage } from 'next'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { useCasinoContract } from '../src/hooks/contracts/useCasinoContract'
import { Flex, useToast, Box, Button } from '@chakra-ui/react'
import { useState } from 'react'
import TableWithCards from '../src/components/TableWithCards'

const Home: NextPage = () => {
    const [userNumber, setUserNumber] = useState(0)
    const [isTransactionLoading, setIsTransactionLoading] = useState(false)
    const contract = useCasinoContract()
    const { isConnected } = useAccount()

    const toast = useToast()

    const guessNumber = async () => {
        if (userNumber && isConnected) {
            setIsTransactionLoading(true)
            await contract.guessTheNumber(userNumber, {
                value: ethers.utils.parseEther('0.0000001'),
            })
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
                w="10rem"
            >
                Guess
            </Button>
        </Flex>
    )
}

export default Home
