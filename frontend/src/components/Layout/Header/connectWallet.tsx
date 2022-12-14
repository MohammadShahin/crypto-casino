import { Box, Button, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
export function ConnectWallet() {
    const { connect, connectors, isLoading, pendingConnector } = useConnect()
    const { connector, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    if (isConnected && connector) {
        return (
            <Box w="200px">
                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}
                >
                    <div>Connected to {connector.name}</div>
                    <Button
                        as={'a'}
                        fontSize={'sm'}
                        fontWeight={400}
                        variant={'link'}
                        href={'#'}
                        onClick={() => disconnect()}
                    >
                        Disconnect
                    </Button>
                </Stack>
            </Box>
        )
    }
    return (
        <Box w="200px">
            {connectors.map((connector) => (
                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}
                    key={connector.id}
                >
                    <Button
                        // as={'a'}
                        fontSize={'sm'}
                        fontWeight={400}
                        variant={'link'}
                        // href={'#'}
                        key={connector.id}
                        onClick={() => connect({ connector })}
                    >
                        {connector.name}
                        {!connector.ready && ' (unsupported)'}
                        {isLoading &&
                            connector.id === pendingConnector?.id &&
                            ' (connecting)'}
                    </Button>
                </Stack>
            ))}
        </Box>
    )
}
