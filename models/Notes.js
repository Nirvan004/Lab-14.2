import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
 
const notesSchema = new Schema({
    user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});
 
const Note = model("Note", notesSchema);
export default Note;