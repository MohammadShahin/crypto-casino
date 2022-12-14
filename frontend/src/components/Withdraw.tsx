import { Flex, Button, Spinner, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useCasinoContract } from '../hooks/contracts/useCasinoContract'

export default function Withdraw() {
    const { isConnected, address } = useAccount()
    const contract = useCasinoContract()
    const [balance, setBalance] = useState(-1)

    useEffect(() => {
        ;(async () => {
            if (contract && address) {
                try {
                    const newBalance = (
                        await contract.toBePaid(address)
                    ).toNumber()
                    setBalance(newBalance)
                } catch {}
            }
        })()
    }, [contract, address])

    const withdraw = async () => {
        if (isConnected) await contract.withdraw()
    }

    if (!isConnected)
        return <Text>You need to connect your wallet to withdraw</Text>

    if (balance === -1) {
        return <Spinner />
    }

    if (balance === 0) {
        return <Text>You have no winnings to withdraw</Text>
    }

    return (
        <Flex flexDir="column" textAlign={'center'} gap={10}>
            <Text>You have {balance} Weis to withdraw</Text>
            <Button onClick={withdraw}>Withdraw</Button>
        </Flex>
    )
}
