const explainCode = async (code, language) => {
   try {
      const response = await fetch(
         'http://localhost:5000/api/explain',
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ code, language })
         }
      )

      const data = await response.json()

      return data
   } catch (error) {
      console.log(error)

      return {
         success: false,
         message: "Something went wrong"
      }
   }
}

export default explainCode