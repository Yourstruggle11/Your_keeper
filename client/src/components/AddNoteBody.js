import React, { useState } from 'react'
import "./style.css"
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom"
import {postNote} from "../redux/actions/notesAction"
import Preloader from "./Preloader"
function AddNoteBody() {
    const [noteTitle, setNoteTitle] = useState("");
    const [note, setNote] = useState("");
    const [preloader, setPreloader] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    //
    function subitHandler(e) {
        setPreloader(true)
        setTimeout(()=>{
            setPreloader(false)
            history.push("/")
        }, 2000)
        
        e.preventDefault();
        dispatch(postNote(noteTitle, note))
    };
    return (    
        <div className="newNoteBody" style={{ paddingTop: "120px", padding: "120px 50px 50px 50px", minHeight: "100vh", display: "flex", flexWrap: "wrap", }}>
            <div className="newNoteBox">
                <form>
                    <h3 style={{ textAlign: "center" }}>New Note</h3>
                    <div className="noteSubmitBox">
                        <input
                            type="text"
                            name="noteTitlte"
                            id="noteTitlte"
                            placeholder="Note Title"
                            onChange={(event) => setNoteTitle(event.target.value)}
                            value={noteTitle}
                        />
                        <textarea
                            type="text"
                            name="note"
                            id="note"
                            placeholder="Write Your Note Here..."
                            onChange={(event) => setNote(event.target.value)}
                            value={note}
                        >
                        </textarea>
                        <button
                            type="submit"
                            onClick={subitHandler}
                            id="button"
                        >POST</button>
                    </div>
                </form>
            </div>
            {preloader?<Preloader /> :"" }
            
        </div>
    )
}

export default AddNoteBody
