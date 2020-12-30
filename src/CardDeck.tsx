import PlayingCard from './PlayingCards'
import { useEffect, useState } from 'react'

interface CardDeckProps {
    cardsURL: string
}

function CardDeck(props: CardDeckProps) {

    async function getCards() { // difference function x(){} and const x = ()=>{}?
        const response = await fetch(props.cardsURL);
        const json = await response.json(); // what is await ?
        setCards(json);
    }

    const [cards, setCards] = useState([]);

    useEffect(() => {
        getCards() //why does this not loop endlessly?
    })
    return (

        <div style={{ display: 'flex' }}>
           {cards && cards.length > 0 && cards.map((card, index) => <PlayingCard {...card} />)}
        </div>
        )
}

export default CardDeck