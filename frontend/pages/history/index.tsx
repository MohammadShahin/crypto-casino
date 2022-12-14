import { Flex, useColorMode } from '@chakra-ui/react'
import { useEffect } from 'react'
import Info from '../../src/components/Info'
import Withdraw from '../../src/components/Withdraw'

function History() {
    const { setColorMode } = useColorMode()

    useEffect(() => {
        setColorMode('dark')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Flex
            flexDir={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={20}
        >
            <Withdraw />
            <Info />
        </Flex>
    )
}

export default History
