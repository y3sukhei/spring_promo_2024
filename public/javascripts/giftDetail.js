document.addEventListener("DOMContentLoaded", async () => {
    
    const urlParams = new URLSearchParams(window.location.search);
   
    const superGifts = [
        {name:"Charming DETOX", img : "../images/gifts/CHARMING_01.png", price:10, description : "Charming Detox 1,500,000₮ Эрхийн Бичиг", 
            
            tickets:[
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
            ]
        },
        {name:"Levoit Air Purifier Core 600s", img : "../images/gifts/AIR_01.png", price:10, description : "Агаар Цэвэвшүүлэгч",

            tickets:[
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},

            ]
        },
        {name:"Delonghi ETAM-29/660/SB", img : "../images/gifts/Delonghi_01.png", price:10, description : "Бүрэн автомат кофе чанагч", tickets:[
            {number:"AB123456789"},
            {number:"AB123456789"},
            {number:"AB123456789"},
            {number:"AB123456789"},
            {number:"AB123456789"},
            {number:"AB123456789"},
            {number:"AB123456789"},
            {number:"AB123456789"},
            {number:"AB123456789"},

        ]},
        {name:"Dua Lipa Radical Optimism Tour Singapore", img : "../images/gifts/DUALIPA_01.png", price:10, description:"тоглолт үзэх аяллын эрхийн бичиг",  tickets:[
            {number:"AB123456789"},
            {number:"AB123456789"},
            {number:"AB123456789"},
            {number:"AB123456789"},
            {number:"AB123456789"},
            {number:"AB123456789"},
            {number:"AB123456789"},
            {number:"AB123456789"},
            {number:"AB123456789"},

        ]},
        {name:"Apple Macbook Air 13.6", img : "../images/gifts/MACBOOK_01.png", price:10, description:"Зөөврийн компьютер", tickets:[
            {number:"AB123456781"},
            {number:"AB123456782"},
            {number:"AB123456783"},
            {number:"AB123456784"},
            {number:"AB123456785"},
            {number:"AB123456786"},
            {number:"AB123456787"},
            {number:"AB123456788"},
            {number:"AB123456789"},

        ]},
        {name:"Steam Deck", img : "../images/gifts/STEAMDECK_01.png", price:10, description:"Valve Steam Deck OLED",
            tickets:[
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},
                {number:"AB123456789"},

            ]
        },
    ];
    const vouchers = [
        {name:"Apple Gift Card", img : "../images/vouchers/apple.png", price : 60, description:"5$ Gift Card",code :"AB123456789"},
        {name:"Хятад Багц", img : "../images/vouchers/chinese.png", price : 40, description :'Хятад Багц',code :"AB123456789"},
        {name:"Энтертайнмент Багц", img : "../images/vouchers/entertainment.png", price : 10, description:'Энтертайнмент Багц',code :"AB123456789"},
        {name:"karaoke", img : "../images/vouchers/karaoke.png", price : 20, description:'Караоке',code :"AB123456789"},
        {name:"looktv", img : "../images/vouchers/looktv.png", price : 40,description:'look tv',code :"AB123456789"},
        {name:"mlbb_diamond", img : "../images/vouchers/mlbb_diamond.png", price : 60, description:'mlbb',code :"AB123456789"},
        {name:"mlbb_ticket", img : "../images/vouchers/mlbb_ticket.png", price : 30, description:'mlbb',code :"AB123456789"},
        {name:"roblox", img : "../images/vouchers/roblox.png", price : 60, description:'roblox',code :"AB123456789"},
        {name:"russia", img : "../images/vouchers/russia.png", price : 40, description:'russia',code :"AB123456789"},
        {name:"shoppy", img : "../images/vouchers/shoppy.png", price : 60, description:'shoppy',code :"AB123456789"},
        {name:"steam", img : "../images/vouchers/steam.png", price : 60, description:'steam',code :"AB123456789"},
        {name:"toki", img : "../images/vouchers/toki.png", price : 60, description:'toki',code :"AB123456789"},
        {name:"tomyo", img : "../images/vouchers/tomyo.png", price : 40, description:'tomyo',code :"AB123456789"},
    ];
 
    const subId = urlParams.get("subId");
    const giftId = urlParams.get("giftId");
    const voucherId = urlParams.get("voucherId");
    console.log("subID :", subId);

    var colIndex = 0;
    const fetchUserGifts = async () => {
        try {
          const res = await fetch(`/api/get_user_wish_list?sub_id=${subId}`);
          const data = await res.json();
          console.log("fetch user gifts", data);
          return data;
        } catch (error) {
          console.log(error);
        }
      };
      
      const list  = await fetchUserGifts();

      const coupons = list.wish_list.filter((item)=> item.gift_id == (giftId ? giftId : voucherId));
      

    if (!giftId) {

        
        // document.getElementById("name").innerHTML = vouchers[voucherId].name;
        // document.getElementById("description").innerHTML = vouchers[voucherId].description;

        document.getElementById("up").style.display = 'none';
        document.getElementById("down").style.display = 'none';
        document.getElementById("img").src = `../images/gifts/${coupons[0].gift_id}.webp`;
        document.getElementById("number").innerHTML = `<div style= "font-size: xx-large; font-weight: 900; color: #000;"> ${coupons[0].coupon} </div>`;
        document.getElementById("descriptionText").innerHTML = "Эрхийн бичиг идэвхжүүлэх код<br> Та идэвхжүүлэх кодоо бусдад задруулахаас сэргийлнэ үү.";
    }

    else {

        document.getElementById("name").innerHTML = coupons[0].gift_name;
        // document.getElementById("description").innerHTML = coupons[0].gift_name;
        document.getElementById("img").src = `../images/gifts/${coupons[0].gift_id}.webp`;
        document.getElementById("number").innerHTML = coupons
        .map((item,i) => 
         `
        <div id="number${i}" style= "font-size: x-large; font-weight: 900;">
            ${item.coupon}
         </div>
          `).join("");
        document.getElementById("descriptionText").innerHTML = "МИНИЙ ТОХИРЛЫН ЭРХҮҮД";
        
    }



    document.addEventListener("keydown", async (event) => {
        // console.log("event.key :", event);


        switch (event.key) {
          
          
          case "Enter":

            
           break;

           case "ArrowUp" :
            
           if (giftId) {

               document.getElementById(`number`).scrollBy({
                   top: - document.getElementById(`number`). scrollHeight / coupons.length,
                   left: 0,
                   behavior:"smooth"
                });
            }
           
           break;

           case "ArrowDown":
                
           if (giftId) {

                document.getElementById(`number`).scrollBy({
                    top: + document.getElementById(`number`). scrollHeight / coupons.length,
                    left: 0,
                    behavior:"smooth"
                });
            }
        
           break;

           case "ArrowRight" :
            
           break;

           case "ArrowLeft":

           break;

        }

        
      
    });

});