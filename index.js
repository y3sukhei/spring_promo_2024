const express = require('express')
const app = express()
const path = require("path");
const cookieParser = require("cookie-parser");
const port = 3000
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
  const subId = req.query.sub_id;
  try {
    const data = await fetch(`http://10.21.64.119:8228/get_user_wish_list?sub_id=${subId}`);

    res.json(await data.json());
  } catch (error) {
    res.status(500).json({message:"Error"});
    console.log(error);
  }
});

app.get("/api/get_gifts_init", async (req, res) => {

    try {
        
        // const giftData = await fs.readFile("gift.json");
        // const giftDataJson = JSON.parse(giftData);

        const today = new Date();

        const data = await fetch("http://10.21.64.119:8228/get_gifts");
        
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
    res.status(500).json({message:"Error"});
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

app.get("/api/send_wish", async (req, res) => {
  
  const subId = req.query.sub_id;
  const giftId = req.query.gift_id;
  const wishCount = req.query.wish_count;
  const phoneNo = req.query.phone_no;
  let url = `http://10.21.64.119:8228/use_wish?sub_id=${subId}&gift_id=${giftId}&user_id=1&wish_count=${wishCount}`;
  
  if (phoneNo) {
    url = `http://10.21.64.119:8228/use_wish?sub_id=${subId}&gift_id=${giftId}&user_id=1&wish_count=${wishCount}&phone_no=${phoneNo}`;
    // console.log('is toki');
  }
  else {
    // console.log('is not toki');

  }

  
  try {
    const data = await fetch(url);

    res.json(await data.json());
  } catch (error) {
    res.status(500).json({message:"Error"});
    console.log(error);
  }

});


  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const JSONToFile = (obj, filename) =>
    writeFileSync(`${filename}.json`, JSON.stringify(obj, null, 2));