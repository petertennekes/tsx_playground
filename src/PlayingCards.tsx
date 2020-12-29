import Card from 'react-bootstrap/Card'
import ReactMarkdown from 'react-markdown'
import './PlayingCards.css'
import { useState } from 'react'



enum CardSides {Front, Reverse}

interface CardProps  {
    title :string;
    description: string;
    backgroundText: string;
};

function PlayingCard(props: CardProps) {
    const [visibleSide, setVisibleSide] = useState(CardSides.Front);


    if (visibleSide === CardSides.Reverse){
        return (
                <Card className="playingCard" onClick={()=> setVisibleSide(CardSides.Front)}>
                    <Card.Body>
                        <Card.Text><ReactMarkdown>{props.backgroundText}</ReactMarkdown></Card.Text>
                    </Card.Body>
                </Card>
        )
   } else {
        return (
            <Card className="playingCard" onClick={()=> setVisibleSide(CardSides.Reverse)}>
                <Card.Img variant="top" src="logo192.png" />
                <Card.Body>
                    <Card.Title><h1>{props.title}</h1></Card.Title>
                    <Card.Text>{props.description}</Card.Text>
                </Card.Body>
            </Card>
        )
    }
}


export default PlayingCard 