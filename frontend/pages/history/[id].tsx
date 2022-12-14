import { Spinner, useColorMode } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import TableWithCards from '../../src/components/TableWithCards'
import { useGetAllGuessesQuery } from '../../src/generated/graphql'

export default function History() {
    const router = useRouter()
    const { id } = router.query
    const { setColorMode } = useColorMode()

    const guessesRaw = useGetAllGuessesQuery()
    const guess = useMemo(() => {
        return guessesRaw.data?.guesses.filter(
            (guess) => guess.id.toString() === id
        )
    }, [guessesRaw, id])

    useEffect(() => {
        setColorMode('dark')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (guessesRaw.loading) return <Spinner />
    if (guessesRaw.error) return <div>Error</div>

    return (
        <TableWithCards
            isLoading={false}
            selectedCard={
                guess && guess?.length > 0
                    ? parseInt(guess[0].guessedNumber)
                    : undefined
            }
            game={guess && guess?.length > 0 ? guess[0] : undefined}
        />
    )
}
