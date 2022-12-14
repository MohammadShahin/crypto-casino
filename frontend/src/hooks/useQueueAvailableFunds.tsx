import { useContractRead } from 'wagmi'
import { abi, contractAddress } from '../utils/config'
export function useQueueAvailableFunds() {
    const { data, isLoading } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: abi,
        functionName: 'queueAvailableFunds',
        chainId: 80001,
    })

    if (!data || isLoading) return 'Fetching ...'

    return data.toString()
}
