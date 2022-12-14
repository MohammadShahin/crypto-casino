import { useContractRead } from 'wagmi'
import { abi, contractAddress } from '../utils/config'
export function useBiddingAmount() {
    const { data, isLoading } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: abi,
        functionName: 'biddingAmount',
        chainId: 80001,
    })
    if (!data || isLoading) return 'Fetching ...'
    return data.toString()
}
