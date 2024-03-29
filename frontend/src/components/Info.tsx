import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    TableContainer,
    Spinner,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useGetAllGuessesQuery } from '../generated/graphql'

function Info() {
    const { address, isConnected } = useAccount()
    const router = useRouter()
    const guessesRaw = useGetAllGuessesQuery()
    const guesses = useMemo(() => {
        const guessesModified = guessesRaw.data?.guesses.filter(
            (guess) => guess.bidder.toString() === address?.toLowerCase()
        )
        guessesModified?.sort((a, b) => {
            return parseInt(b.timestamp) - parseInt(a.timestamp)
        })
        return guessesModified
    }, [guessesRaw, address])

    if (!isConnected) return null

    if (guessesRaw.loading) return <Spinner />
    if (guessesRaw.error) return <div>Error</div>

    return (
        <TableContainer
            pl="5"
            pr="5"
            maxH={{ base: '300px', md: '500px' }}
            overflowY="auto"
        >
            <Table
                variant="striped"
                colorScheme="gray"
                textAlign="center"
                border="1px solid #e2e8f0"
                borderRadius={5}
            >
                <Thead>
                    <Tr>
                        <Td textAlign="center">#</Td>
                        {/* <Td textAlign="center">You Guessed</Td> */}
                        <Td textAlign="center">Your Prize</Td>
                        {/* <Td textAlign="center">Winning Number</Td> */}
                        <Td textAlign="center">Played At</Td>
                        <Td textAlign="center">Result</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {guesses?.map((guess, index) => {
                        const time = new Date(parseInt(guess.timestamp) * 1000)
                        return (
                            <Tr
                                key={guess.id}
                                _hover={{
                                    background: 'gray.900',
                                    color: 'teal.300',
                                }}
                                onClick={() => {
                                    router.push(`/history/${guess.id}`)
                                }}
                                cursor="pointer"
                            >
                                <Td textAlign="center">{index + 1}</Td>
                                {/* <Td textAlign="center">
                                    {guess.guessedNumber}
                                </Td> */}
                                <Td textAlign="center">
                                    {ethers.utils.formatEther(guess.prize)} eth
                                </Td>
                                {/* <Td textAlign="center">
                                    {guess.winningNumber}
                                </Td> */}
                                <Td textAlign="center">
                                    {time.toLocaleDateString() +
                                        ' ' +
                                        time.toLocaleTimeString()}
                                </Td>
                                <Td
                                    textAlign="center"
                                    color={
                                        parseInt(guess.guessedNumber) ===
                                            parseInt(guess.winningNumber) ||
                                        parseInt(guess.guessedNumber) ===
                                            (parseInt(guess.winningNumber) %
                                                8) +
                                                1
                                            ? 'green.500'
                                            : 'red.500'
                                    }
                                    fontWeight="bold"
                                >
                                    {parseInt(guess.guessedNumber) ===
                                    parseInt(guess.winningNumber) ? (
                                        <>Won Queue Prize</>
                                    ) : parseInt(guess.guessedNumber) ===
                                      (parseInt(guess.winningNumber) % 8) +
                                          1 ? (
                                        <>Won Pot prize</>
                                    ) : (
                                        <> Lost</>
                                    )}
                                </Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default Info
