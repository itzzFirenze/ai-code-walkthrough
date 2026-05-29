import axios from "axios";

const API_URL = 'http://localhost:5000/api/walkthroughs'

const getWalkthroughsHistory = async (token) => {
   const response = await axios.get(
      API_URL,
      {
         headers: {
            Authorization: `Bearer ${token}`
         }
      })

   return response.data
}

const saveWalkthrough = async (walkthroughData, token) => {
   const response = await axios.post(
      API_URL,
      walkthroughData,
      {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }
   )

   return response.data
}

export {
   getWalkthroughsHistory,
   saveWalkthrough
}