import { useContractRead } from 'wagmi'
import { abi, contractAddress } from '../utils/config'

export function useTimeToLive() {
    const { data, isLoading } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: abi,
        functionName: 'timeToLive',
        chainId: 80001,
    })
    if (!data || isLoading) return 'Fetching ...'
    return data.toString()
}
