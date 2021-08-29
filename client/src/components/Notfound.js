import React, {useState} from 'react'
import {Card, Button} from "react-bootstrap";
import audio from "../assets/release.mp3";
import Preloader from "./Preloader";
import { useHistory } from 'react-router-dom'; 
export default function Notfound() {
    const [preloader, setPreloader] = useState(false);
    const history = useHistory();

    function release(){
        new Audio(audio).play()
        setPreloader(true)
        setTimeout(function(){
            setPreloader(false)
            history.push("/")
        },2000)
    }
    return (
        <div className="notFound">
            <Card bg="danger" className="notFound_box">
                <Card.Header style={{fontSize:"30px", fontWeight:"bolder", letterSpacing:"100px",}}>404</Card.Header>
                <Card.Body>
                    <Card.Title >I think you caught up in a Genjutsu!!</Card.Title>
                    <Card.Text>
                        
                    </Card.Text>
                    <Button variant="warning" onClick={release}>Click here to release..!</Button>
                </Card.Body>
            </Card>
            {preloader? <Preloader/> : ""}
        </div >
    )
}
