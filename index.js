const express = require('express')
const app = express()
const path = require("path");
const cookieParser = require("cookie-parser");
const port = 5173

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/views/home.html"));
})
app.get('/api/detail', (req, res) => {
    
    res.redirect('public/views/detail.html');
  // res.sendFile(path.join(__dirname, "public/views/detail.html"));
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})