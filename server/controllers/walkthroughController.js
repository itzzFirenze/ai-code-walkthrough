import Walkthrough from "../models/Walkthrough.js";

const saveWalkthrough = async (req, res) => {
   try {
      const { language, code, explanation, steps } = req.body

      const walkthrough = await Walkthrough.create({
         user: req.user._id,
         language,
         code,
         explanation,
         steps
      })

      res.status(201).json({ walkthrough })
   } catch (error) {
      res.status(500).json({ message: "Server error" })
   }
}

const getWalkthroughs = async (req, res) => {
   try {
      const walkthroughs = await Walkthrough
         .find({ user: req.user._id })
         .sort({ createdAt: -1 })

      res.status(201).json({ walkthroughs })
   } catch (error) {
      console.log("save walkthrough err")
      res.status(500).json({ message: "Server error" })
   }
}

export {
   saveWalkthrough,
   getWalkthroughs
}