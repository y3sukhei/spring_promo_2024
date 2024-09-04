document.addEventListener("DOMContentLoaded", async () => {
    
    const urlParams = new URLSearchParams(window.location.search);

    var count = 0;
    var isAlert = false;
  
    document.getElementById("count").innerHTML = count;

    const subId = urlParams.get("subId");
    const giftId = urlParams.get("giftId");
    const voucherId = urlParams.get("voucherId");
    const balance = urlParams.get("balance");
    
    console.log("balance :", subId);


    const sendWish = async () => {
        try {
          const res = await fetch(`/api/send_wish?sub_id=${subId}&gift_id=${giftId ?giftId :voucherId}&wish_count=${count}`);
          const data = await res.json();

          if (data.status == "success") {
            console.log("onoo hurj baina");
            document.getElementById('customDialog').style.display = 'none';
            document.getElementById('alert').style.display = 'flex';
          }
          else {
            isAlert = true;
            document.getElementById('customDialog').style.display = 'none';
            document.getElementById('alert').style.display = 'flex';
            document.getElementById('alertText').innerHTML = 
                    "Алдаа гарлаа <br> дараа дахин оролдоно уу.";
          }

        } catch (error) {
            isAlert = true;
            document.getElementById('customDialog').style.display = 'none';
            document.getElementById('alert').style.display = 'flex';
            document.getElementById('alertText').innerHTML = 
                    "Алдаа гарлаа <br> дараа дахин оролдоно уу.";
          console.log(error);
        }
      };

    let gift;
    let total = 0;

    const fetchGift = async (id) => {
        try {
          const res = await fetch(`/api/get_gift?giftId=${id}`);
          const data = await res.json();
          console.log("fetch single gift ", data);
          return data;
        } catch (error) {
          console.log(error);
        }
      };

   

    if (!giftId) {

        gift = await fetchGift(voucherId);
        
       
        document.getElementById("img").src = `../images/gifts/${gift.gift_id}.webp`;
        document.getElementById("name").innerHTML = gift.gift_name;
        document.getElementById("description").innerHTML = gift.gift_name;
        document.getElementById('alertText').innerHTML = "Та амжилттай худалдан авлаа.";

    }
    else {

        gift = await fetchGift(giftId);
        
        document.getElementById("img").src = `../images/gifts/${gift.gift_id}.webp`;
        document.getElementById("name").innerHTML = gift.gift_name;
        document.getElementById("description").innerHTML = gift.gift_name;
        document.getElementById('alertText').innerHTML = "Таны хүсэлт амжилттай илгээгдлээ.";
        
    }

    document.addEventListener("keydown", async (event) => {

        switch (event.key) {
          
          
          case "Enter":
            if(!isAlert){

                if (count > 0 && total <= balance) {
                    isAlert = true;
                    
                    sendWish();

                }
                
                else {
                    isAlert = true;
                    document.getElementById('customDialog').style.display = 'none';
                    document.getElementById('alert').style.display = 'flex';
                    document.getElementById('alertText').innerHTML = 
                    "Уучлаарай таны цуглуулсан <br> оноо хүрэлцэхгүй байна.";
                    console.log("onoo hurehgui baina");
                }
            }
            else { 
                history.back();
                console.log("IS ALERT");

            }
           break;

           case "ArrowUp" :
            if(!isAlert) {

                count++;
                document.getElementById("count").innerHTML = count;
                total += gift.gift_cost;             
                // console.log(total);
            }


           break;

           case "ArrowDown" :
            if (count > 0 && !isAlert) {
                count--;
                document.getElementById("count").innerHTML = count;
                total -= gift.gift_cost; 
            }

            // console.log(total);

           break;

           case "ArrowRight" :
            
           break;

           case "ArrowLeft":

           break;

        }

        
      
    });

});