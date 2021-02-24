import React, {useEffect, useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import CardDeck from "./CardDeck";
import "./Game.css"
import {io, Socket} from "socket.io-client";

const fetchJSON = (url: string) => fetch(url).then((r) => r.json());

function Game() {
    const [gameId, setGameId] = useState<string>()
    const [input, setInput] = useState<string>()
    const [socket, setSocket] = useState<Socket>()
    const leaveGame = ()=>{
        socket?.disconnect()
        setGameId(undefined);
        setSocket(undefined);
    }

    const getGameId = () => {
        fetchJSON('/api/new_game').then((json) => {
            setGameId(json.game_id);
        })
    }
    useEffect(() => {
        if (gameId !== undefined) {
            setSocket(io("/", {query: {"game_id": gameId}}))
            console.log("opening socket for: ", gameId)
        }
    }, [gameId])

    return (
        socket === undefined ? (
            <div>
                <div>
                    <button onClick={getGameId}>Create New Game</button>
                </div>
                <div>
                    <input type="text" placeholder="game id" onChange={(e) => setInput(e.target.value)}/>
                    <button className="button" onClick={() => setGameId(input)}>Join Game</button>
                </div>
            </div>
        ) : (
            <div>
                <div className="banner">{gameId}<button className="button" onClick={()=>leaveGame()}>Leave</button> </div>
                <DndProvider backend={HTML5Backend}>
                    <CardDeck socket={socket}/>
                </DndProvider>
            </div>
        )
    )
}


export default Game