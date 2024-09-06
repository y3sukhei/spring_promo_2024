const express = require('express')
const app = express()
const path = require("path");
const cookieParser = require("cookie-parser");
const port = 5173
const fs = require("fs").promises;
const writeFileSync = require("fs").writeFileSync;

// const giftNames = [
//   {id:"3001", name :"Dua Lipa: Radical Optimism Singapore дахь аялан тоглолтыг хосоороо үзэх аяллын эрх"},
//   {id:"3002", name :"Steam Deck"},
//   {id:"3003", name :"MacBook air"},
//   {id:"3004", name :"BTF 1,000,000₮-н эрх"},
//   {id:"3005", name :"WellBee Shop 1,000.000₮-н эрх"},
//   {id:"3006", name :"Nomun Medical Resort-д амрах эрх"},
//   {id:"3007", name :"Roblox 10$-н эрхийн бичиг"},
//   {id:"3008", name :"STEAM 5$-н эрхийн бичиг"},
//   {id:"3009", name :"Shoppy 20,000₮-н эрхийн бичиг"},
//   {id:"3010", name :"PUBG Mobile 5$-н эрхийн бичиг"},
//   {id:"3011", name :"Mobile Legends- 275ш Diamonds"},
//   {id:"3012", name :"Toki хэтэвч 20,000₮-р цэнэглэх эрхийн бичиг"},
//   {id:"3013", name :"ESN National Championship: MLBBтэмцээний тасалбар"},
//   {id:"3014", name :"LookTV Premium багцыг 1 сар ашиглах эрх"},
//   {id:"3015", name :"Орос-Европ багцыг 1 сар ашиглах эрх"},
//   {id:"3016", name :"Хятад багцыг 1 сар ашиглах эрх"},
//   {id:"3017", name :"Гэрийн TomYo багцыг 1 сар ашиглах эрх"},
//   {id:"3018", name :"Энтертайнмент сувгийн багцыг 1 сар ашиглах эрх"},
//   {id:"3019", name :"MKaraoke апп-г 1 сар ашиглах эрх"},
//   {id:"3020", name :"Kidzland дэлгүүр 800.000₮-н эрх"},
//   {id:"3021", name :"5.11 Mongolia 1,000.000₮-н эрх"},
// ]

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
          
          //  data.gift_list.forEach((item, i) => {

          //   if (item.gift_id == giftNames[i].id) {
          //       item.gift_name = giftNames[i].name;
          //   }

            
          //  });

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

  try {
    const data = await fetch(`http://10.21.64.119:8228/use_wish?sub_id=${subId}&gift_id=${giftId}&user_id=1&wish_count=${wishCount}`);

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