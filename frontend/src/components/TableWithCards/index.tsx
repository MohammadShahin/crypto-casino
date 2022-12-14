import { Box, Flex, Spinner } from '@chakra-ui/react'
import { Game } from '../../types'
import ReactCardFlip from 'react-card-flip'
import { useEffect, useMemo, useState } from 'react'

const NUMBER_CARDS = 8

interface Props {
    selectedCard?: number
    setSelectedCard?: (card: number) => void
    isLoading: boolean
    game?: Game
}

export default function Home({
    selectedCard,
    setSelectedCard,
    isLoading,
    game,
}: Props) {
    const [timerDone, setTimerDone] = useState(false)

    const handleChange = (newCardNumber: number) => {
        if (!isLoading && setSelectedCard) setSelectedCard(newCardNumber)
    }

    const winningNumber1 = useMemo(
        () => parseInt(game?.winningNumber || '0'),
        [game?.winningNumber]
    )
    const winningNumber2 = useMemo(
        () => (winningNumber1 === 0 ? -1 : (winningNumber1 % NUMBER_CARDS) + 1),
        [winningNumber1]
    )
    
    useEffect(() => {
        setTimeout(() => {
            setTimerDone(true)
        }, 1000)
    }, [])

    return (
        <Flex
            backgroundImage="url('/table.png')"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            width={1439}
            height={700}
            backgroundSize="cover"
            m="auto"
            // flexWrap={'wrap'}
            // justifyContent='space-around'
            justifyContent="center"
            alignItems="center"
            flexDir={'column'}
            p={20}
            gap={10}
        >
            {isLoading && <Spinner position="absolute" top="50%" left="50%" />}
            <Flex
                justifyContent="space-around"
                alignItems="center"
                flexWrap={'wrap'}
                gap={10}
                width="100%"
                height="30%"
            >
                {[...Array(NUMBER_CARDS)].map((_, index) => {
                    const cardNumber = index + 1
                    const cardImageNumber =
                        ((index + parseInt(game?.timestamp || '0')) %
                            NUMBER_CARDS) +
                        1
                    let cardImg
                    if (cardNumber === winningNumber1) {
                        cardImg = '/cards/win/1.png'
                    } else if (cardNumber === winningNumber2) {
                        cardImg = '/cards/win/2.png'
                    } else {
                        cardImg = `/cards/lose/${cardImageNumber}.png`
                    }

                    return (
                        <ReactCardFlip
                            key={index}
                            isFlipped={!!game && timerDone}
                            flipDirection="horizontal"
                        >
                            <Box
                                key="front"
                                onClick={() => handleChange(cardNumber)}
                                cursor="pointer"
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                width="100px"
                                height="139px"
                                backgroundImage={`url('/cards/back.png')`}
                                backgroundPosition="center"
                                backgroundRepeat="no-repeat"
                                backgroundSize="cover"
                                border={
                                    selectedCard === cardNumber
                                        ? '3px solid #000'
                                        : 'none'
                                }
                                borderRadius={5}
                            />
                            <Box
                                key="back"
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                width="100px"
                                height="139px"
                                backgroundImage={cardImg}
                                backgroundPosition="center"
                                backgroundRepeat="no-repeat"
                                backgroundSize="cover"
                                border={
                                    selectedCard === cardNumber
                                        ? '3px solid #f00'
                                        : 'none'
                                }
                                borderRadius={5}
                            />
                        </ReactCardFlip>
                    )
                })}
            </Flex>
        </Flex>
    )
}
