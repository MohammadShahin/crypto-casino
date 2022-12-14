import { useContract, useSigner } from 'wagmi'
import { abi, contractAddress } from '../../utils/config'

export const useCasinoContract = () => {
    const { data: signer } = useSigner()

    const contract = useContract({
        addressOrName: contractAddress,
        contractInterface: abi,
        signerOrProvider: signer,
    })

    return contract
}
