import mongoose, { Schema } from "mongoose"
import User from "./User.js"

const walkthroughSchema = new Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true
      },
      language: {
         type: String,
         required: true
      },
      code: {
         type: String,
         required: true
      },
      explanation: {
         type: String,
         required: true
      },
      steps: {
         type: Array,
         default: []
      }
   },
   {
      timestamps: true
   }
)

const Walkthrough = mongoose.model("Walkthrough", walkthroughSchema)

export default Walkthrough