import mongoose, { Schema } from "mongoose"

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

      trace: {
         type: Array,
         default: []
      },

      output: {
         type: String,
         default: ""
      }
   },
   {
      timestamps: true
   }
)

const Walkthrough = mongoose.model(
   "Walkthrough",
   walkthroughSchema
)

export default Walkthrough