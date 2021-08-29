import Mongoose from "mongoose";
import Note from "../model/notesModel.js"
import user from "../model/userModel.js"
import { v4 as uuidv4 } from "uuid";


// @route: GET users/notes
//@puropose : get all notes from db for single user
export const getNotes = async (req, res, next) => {
    try {
        const fetchNotes = await Note.find({ username: req.user._id }).populate(
            "username"
        )
        // const fetchNotes = await Note.find({body:{$eq: "sdfsdf"}})
        res.status(200).json(fetchNotes);
    } catch (error) {
        res.status(404);
        next(error);
    }
};

//@route: POST users/notes
//@purpose: : Post new note by user

export const postNotes = async (req, res, next) => {
    const User = await user.findOne({ _id: req.user._id });
    console.log(User);
    var {title, body} = req.body;

    const accessToken = uuidv4();
   // console.log(accessToken);

    const newpost = {
        title:title,
        body: body,
        username: User,
        accessToken: accessToken,
        isValid: true,
    };

    var newNotes = new Note(newpost);
    try {
        await newNotes.save();
        res.status(201).json(newNotes);
    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log("hello");
    }
}

// @route: PATCH users/notes/:id
// @purpose: PATCH or update the notes
export const patchNotes = async (req, res, next) =>{
    const {id: id} = req.params;
    const post = req.body;

    if(!Mongoose.Types.ObjectId.isValid(id))
        res.status(404).send("No post is found")

        const  updateNotes =  await Note.findByIdAndUpdate(id, post,{
            new: true,
        });
        res.json(updateNotes);
}

// @route: DELETE usera/notes/id
// @route: DELETE usera/notes/id
export const deleteNotes = async (req, res) => {
    try {
      const deleteusernote = await Note.deleteOne({
        _id: req.params.id,
      });
      res.status(200).json(deleteusernote);
    } catch (error) {
      res.status(404);
      next(error);
    }
  };
  