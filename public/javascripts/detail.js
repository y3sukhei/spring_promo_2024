document.addEventListener("DOMContentLoaded", async () => {
    
    const urlParams = new URLSearchParams(window.location.search);

    var count = 0;
    var balance = 100;
    var isAlert = false;

    const superGifts = [
        {name:"Charming DETOX", img : "../images/gifts/CHARMING_01.png", price:101, description : "Charming Detox 1,500,000₮ Эрхийн Бичиг"},
        {name:"Levoit Air Purifier Core 600s", img : "../images/gifts/AIR_01.png", price:10, description : "Агаар Цэвэвшүүлэгч"},
        {name:"Delonghi ETAM-29/660/SB", img : "../images/gifts/Delonghi_01.png", price:10, description : "Бүрэн автомат кофе чанагч"},
        {name:"Dua Lipa Radical Optimism Tour Singapore", img : "../images/gifts/DUALIPA_01.png", price:10, description:"тоглолт үзэх аяллын эрхийн бичиг"},
        {name:"Apple Macbook Air 13.6", img : "../images/gifts/MACBOOK_01.png", price:10, description:"Зөөврийн компьютер"},
        {name:"Steam Deck", img : "../images/gifts/STEAMDECK_01.png", price:10, description:"Valve Steam Deck OLED"},

    ];
    const vouchers = [
        {name:"Apple Gift Card", img : "../images/vouchers/apple.png", price : 60, description:"5$ Gift Card"},
        {name:"Хятад Багц", img : "../images/vouchers/chinese.png", price : 40, description :'Хятад Багц'},
        {name:"Энтертайнмент Багц", img : "../images/vouchers/entertainment.png", price : 10, description:'Энтертайнмент Багц'},
        {name:"karaoke", img : "../images/vouchers/karaoke.png", price : 20, description:'Караоке'},
        {name:"looktv", img : "../images/vouchers/looktv.png", price : 40,description:'look tv'},
        {name:"mlbb_diamond", img : "../images/vouchers/mlbb_diamond.png", price : 60, description:'mlbb'},
        {name:"mlbb_ticket", img : "../images/vouchers/mlbb_ticket.png", price : 30, description:'mlbb'},
        {name:"roblox", img : "../images/vouchers/roblox.png", price : 60, description:'roblox'},
        {name:"russia", img : "../images/vouchers/russia.png", price : 40, description:'russia'},
        {name:"shoppy", img : "../images/vouchers/shoppy.png", price : 60, description:'shoppy'},
        {name:"steam", img : "../images/vouchers/steam.png", price : 60, description:'steam'},
        {name:"toki", img : "../images/vouchers/toki.png", price : 60, description:'toki'},
        {name:"tomyo", img : "../images/vouchers/tomyo.png", price : 40, description:'tomyo'},
    ];
    
    document.getElementById("count").innerHTML = count;
    const giftId = urlParams.get("giftId");
    const voucherId = urlParams.get("voucherId");

    if (!giftId) {

       

        document.getElementById("img").src = vouchers[voucherId].img;
        document.getElementById("name").innerHTML = vouchers[voucherId].name;
        document.getElementById("description").innerHTML = vouchers[voucherId].description;


    }
    else {
        

        document.getElementById("img").src = superGifts[giftId].img;
        document.getElementById("name").innerHTML = superGifts[giftId].name;
        document.getElementById("description").innerHTML = superGifts[giftId].description;
        
    }



    document.addEventListener("keydown", async (event) => {

        switch (event.key) {
          
          
          case "Enter":
            if (count > 0 && (!giftId ? vouchers[voucherId].price : superGifts[giftId].price) <= balance) {
                
                console.log("onoo hurj baina");
                document.getElementById('customDialog').style.display = 'none';
                document.getElementById('alert').style.display = 'flex';
                document.getElementById('alertText').innerHTML = 
                !giftId ? "Та амжилттай худалдан авлаа." : "Таны хүсэлт амжилттай илгээгдлээ.";

            }
            
            else {
                isAlert = true;
                document.getElementById('customDialog').style.display = 'none';
                document.getElementById('alert').style.display = 'flex';
                document.getElementById('alertText').innerHTML = 
                "Уучлаарай таны цуглуулсан <br> оноо хүрэлцэхгүй байна.";

                
                console.log("onoo hurehgui baina");
            }
            
                
            
           break;

           case "ArrowUp" :
            count++;
            document.getElementById("count").innerHTML = count;


           break;

           case "ArrowDown" :
            if (count > 0) {

                count--;
                document.getElementById("count").innerHTML = count;
            }

           break;

           case "ArrowRight" :
            
           break;

           case "ArrowLeft":

           break;

        }

        
      
    });

});