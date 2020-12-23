interface CardProps  {
    title :string;
};

function PlayingCard(props: CardProps) {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

export default PlayingCard