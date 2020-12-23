import Card from 'react-bootstrap/Card'
import ReactMarkdown from 'react-markdown'

import 'holderjs'
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
            <Card style={{ width: '18rem' }} onClick={()=> setVisibleSide(CardSides.Front)}>
                <Card.Body>
                    <Card.Text><ReactMarkdown>{props.backgroundText}</ReactMarkdown></Card.Text>
                </Card.Body>
            </Card>
        )
   } else {
        return (
            <Card style={{ width: '18rem' }} onClick={()=> setVisibleSide(CardSides.Reverse)}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title><h1>{props.title}</h1></Card.Title>
                    <Card.Text>{props.description}</Card.Text>
                </Card.Body>
            </Card>
        )
    }
}


export default PlayingCard