import React, {useEffect} from 'react'
import Cards from "./Cards"
import { useDispatch, useSelector } from "react-redux";
import {getPost} from "../redux/actions/notesAction"
export default function Body() {
  //const newNotes = Object.entries(notes)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost())
  }, [dispatch])

  const { notes } = useSelector((state) => state.userNote);
//   console.log(notes);
  //console.log(newNotes[0].title);



    return (
        <>
            <div style={{paddingTop: "120px", padding: "120px 50px 50px 50px",background: "#FDF6F0", minHeight: "100vh", display: "flex", flexWrap: "wrap",}}>
                {notes && notes.map(function mapFun(currentElm) {
                    return (
                        <Cards key={currentElm._id} notes={currentElm} />
                    )
                })}

            </div>
        </>
    )
}
