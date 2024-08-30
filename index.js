const express = require('express')
const app = express()
const path = require("path");
const cookieParser = require("cookie-parser");
const port = 5173
const fs = require("fs").promises;
const writeFileSync = require("fs").writeFileSync;

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/views/home.html"));
})
app.get('/api/detail', (req, res) => {
    
    res.redirect('public/views/detail.html');
  // res.sendFile(path.join(__dirname, "public/views/detail.html"));
});

app.get("/api/get_user_wish_list", async (req, res) => {
  const userID = req.query.sub_id;
  try {
    const data = {
      "score": 120,
      "wish_list": [
          {
              "gift_cost": "40",
              "gift_id": "30041",
              "gift_name": "qwe",
              "wish_date": "20240829111215"
          }
      ],
      "message": "success",
      "status": "success"
    }

    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/get_gifts_init", async (req, res) => {

    try {
        
        // const giftData = await fs.readFile("gift.json");
        // const giftDataJson = JSON.parse(giftData);

        const today = new Date();

        const data = await fetch("http://10.136.32.197:8228/get_gifts");
        
       
        data.json().then((data) => {

            JSONToFile({...data, dateModified:today}, 'gift');
            
            res.status(200).json({message:"success"});

        });
    
  } catch (error) {
    console.log(error);
  }

});

app.get("/api/get_gifts", async (req, res) => {

    try {
        
        const giftData = await fs.readFile("gift.json");
        const giftDataJson = JSON.parse(giftData);
        
        res.status(200).json(giftDataJson);

        // const today = new Date();

        // const data = await fetch("http://10.136.32.197:8228/get_gifts");
        
       
        // data.json().then((data) => {

        //     JSONToFile({...data, dateModified:today}, 'gift');
            
        //     res.status(200).json({message:"success"});

        // });
    
  } catch (error) {
    console.log(error);
  }

});

app.get("/api/get_gift", async (req, res) => {
    const giftId = req.query.giftId;

    try {
    
        const giftData = await fs.readFile("gift.json");
        const giftDataJson = JSON.parse(giftData);
        
        const gift = giftDataJson.gift_list.filter((item)=> item.gift_id == giftId)[0];

        if (gift) {

            res.status(200).json(gift);
        }

        else 
            res.status(500).json({message:"Gift not found"});
        
  } catch (error) {
    console.log(error);
  }

});


  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const JSONToFile = (obj, filename) =>
    writeFileSync(`${filename}.json`, JSON.stringify(obj, null, 2));