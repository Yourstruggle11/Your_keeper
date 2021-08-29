import mongoose from "mongoose";

const Schema = mongoose.Schema;

const noteSChema = new Schema({
    username: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    title:{
        type: String,
        default: null,

    },
    body:{
        type: String,
        required: true,
    },
});

const Note = mongoose.model("Note", noteSChema);

export default Note;