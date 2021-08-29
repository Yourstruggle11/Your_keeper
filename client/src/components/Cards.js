import React from 'react'
import "./style.css"
import { useHistory } from "react-router-dom";

export default function Cards({notes}) {

    const history = useHistory();

    function editNote(){
        history.push(`/editNote/${notes._id}`)
    }

    const cardStyle = {
        width: "350px",
        height: "250px",
        textAlign: "center",
        textTransform: "capitalize",
        padding: "20px",
        margin: "50px",
        background:"#FF616D",
        borderRadius: "50px",
        overflow:"auto"
    }

    return (
        <div
        className="card" 
        style={cardStyle}
        onClick={editNote}
        >
            <h4 style={{color: "#444444"}}>{notes.title}</h4>
            <p style={{color: "#DDDDDD"}}>{notes.body}</p>
        </div>
    )
}
