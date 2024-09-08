document.addEventListener("DOMContentLoaded", async () => {
    
    const urlParams = new URLSearchParams(window.location.search);

    var count = 1;
    var isAlert = false;
  
    document.getElementById("count").innerHTML = count;

    const subId = urlParams.get("subId");
    const giftId = urlParams.get("giftId");
    const voucherId = urlParams.get("voucherId");
    const balance = urlParams.get("balance");
    

    const sendWish = async () => {
        try {
          const res = await fetch(`/api/send_wish?sub_id=${subId}&gift_id=${giftId ?giftId :voucherId}&user_id=1&wish_count=${count}`);
          const data = await res.json();

          if (data.status == "success") {
            console.log("onoo hurj baina : ", data);
            
            document.getElementById('customDialog').style.display = 'none';
            document.getElementById('alert').style.display = 'flex';
            document.getElementById('alertText').innerHTML = giftId ? 
            `Та ${gift.gift_name} супер бэлгийн тохиролд оролцох эрх амжилттай авлаа. Супер тохирол 2024.10.23-ны өдөр Univision Mongolia facebook хуудсаар 19:00 цагт шууд дамжуулагдана.`:
            `Та ${gift.gift_name}-г амжилттай авлаа. <br> Миний бэлгүүд хэсэг рүү орж эрхийн бичгээ идэвхжүүлээрэй`;

          }
          else {
            isAlert = true;
            document.getElementById('customDialog').style.display = 'none';
            document.getElementById('alert').style.display = 'flex';
            document.getElementById('alertText').innerHTML = data.message;
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
          // console.log("fetch single gift ", data);
          total = data.gift_cost;
          document.getElementById("giftCost").innerHTML = data.gift_cost;
          // console.log("total :", total);
          return data;
        } catch (error) {
          console.log(error);
        }
      };

    if (!giftId) {

        gift = await fetchGift(voucherId);
        
        document.getElementById("button").innerHTML = "АВАХ";
       
        document.getElementById("img").src = `../images/gifts/${gift.gift_id}.webp`;
        document.getElementById("name").innerHTML = gift.gift_name;
        document.getElementById('alertText').innerHTML = "Та амжилттай худалдан авлаа.";
        document.getElementById('counter').style.display = 'none';

    }
    else {

        gift = await fetchGift(giftId);

        document.getElementById("button").innerHTML = "ЭРХ АВАХ";
        
        document.getElementById("img").src = `../images/gifts/${gift.gift_id}.webp`;
        document.getElementById("name").innerHTML = gift.gift_name;
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
                    "Уучлаарай таны цуглуулсан оноо хүрэлцэхгүй байна. <br> Та бэлэгтэй цэсээс кино түрээслэн оноогоо нэмэгдүүлэх боломжтой.";
                }
            }
            else { 
              history.back();

                console.log("IS ALERT");

            }
           break;

           case "ArrowUp" :
            if(!isAlert && giftId) {

                count++;
                document.getElementById("count").innerHTML = count;
                total += gift.gift_cost;             
                // console.log(total);
            }


           break;

           case "ArrowDown" :
            if (count > 1 && !isAlert && giftId) {
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