const express = require('express')
const app = express()
const path = require("path");
const port = 3001

app.use(express.static(path.join(__dirname, "public")));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/views/index.html"));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})