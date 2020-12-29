import PlayingCard from './PlayingCards'
import { useEffect, useState } from 'react'

interface CardDeckProps {
    cardsURL: string
}

function CardDeck(props: CardDeckProps) {
    const getCards = () => {
        fetch(props.cardsURL
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                setCards(myJson);
            });
    }

    const [cards, setCards] = useState([]);

    useEffect(() => {
        getCards()
    }, [])
    return (

        <div style={{ display: 'flex' }}>
           {cards && cards.length > 0 && cards.map((card, index) => <PlayingCard {...card} />)}
        </div>
        )
}

export default CardDeck