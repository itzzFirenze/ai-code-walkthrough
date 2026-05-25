const testBackend = (req, res) => {
   res.json({
      success: true,
      message: "Frontend and backend are connected"
   })
}

module.exports = { testBackend }