import React, {useState} from 'react'
import "./style.css"
import {useHistory} from "react-router-dom"
import { useDispatch } from "react-redux";
import {updateNote, deleteNote} from "../redux/actions/notesAction"
import { useParams } from "react-router";
import Preloader from "./Preloader"




export default function EditNote() {
    const [noteTitle, setNoteTitle] = useState("");
    const [note, setNote] = useState("");
    const [preloader, setPreloader] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const {id} = useParams();
    
    //
    function subitHandlerUpdate(e) {
        e.preventDefault();
        setPreloader(true)
        setTimeout(()=>{
        setPreloader(false)
            history.push("/")
        }, 2000)
        dispatch(updateNote(id ,noteTitle, note))
    }
    function subitHandlerDelete(e) {
        e.preventDefault(id);
        setPreloader(true)
        setTimeout(()=>{
        setPreloader(false)
            history.push("/")
        }, 2000)
        dispatch(deleteNote(id))
    }
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
                            onClick={subitHandlerUpdate}
                            id="button"
                        >UPDATE</button>
                        <button
                            type="submit"
                            onClick={subitHandlerDelete}
                            id="deleteButton"
                        >DELETE</button>
                    </div>
                </form>
            </div>
            {preloader?<Preloader /> :"" }
        </div>
    )
}
