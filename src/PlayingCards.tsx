import Card from 'react-bootstrap/Card'
import ReactMarkdown from 'react-markdown'
import './PlayingCards.css'
import { useState } from 'react'

enum CardSides { Front, Reverse }

interface CardProps {
    title: string;
    description: string;
    detailedText: string;
    imgSrc?: string;
};

function PlayingCard(props: CardProps) {
    const [visibleSide, setVisibleSide] = useState(CardSides.Front);
    const toggleSide = () => {
        if (visibleSide === CardSides.Front) {
            setVisibleSide(CardSides.Reverse)
        } else {
            setVisibleSide(CardSides.Front)
        }
    }
    const { title, description, detailedText, imgSrc = "logo192.png" } = props

    return (<Card className="playingCard" onClick={toggleSide}>
        <Card.Img variant="top" src={imgSrc} />
        <Card.Body>
            {visibleSide === CardSides.Front && <Card.Title><h1>{title}</h1></Card.Title>}
            <Card.Text>
            {visibleSide === CardSides.Front ? description : <ReactMarkdown>{detailedText}</ReactMarkdown>}
            </Card.Text>
        </Card.Body>
    </Card >)
}

export default PlayingCard 