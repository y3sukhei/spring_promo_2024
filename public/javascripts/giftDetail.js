document.addEventListener("DOMContentLoaded", async () => {
    
    const urlParams = new URLSearchParams(window.location.search);
   
    const subId = urlParams.get("subId");
    const giftId = urlParams.get("giftId");
    const voucherId = urlParams.get("voucherId");
    console.log("subID :", subId);

    const fetchUserGifts = async () => {
        try {
          const res = await fetch(`/api/get_user_wish_list?sub_id=${subId}`);
          const data = await res.json();
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