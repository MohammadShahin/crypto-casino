import { Flex } from '@chakra-ui/react'
import Info from '../../src/components/Info'
import Withdraw from '../../src/components/Withdraw'

function History() {
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
