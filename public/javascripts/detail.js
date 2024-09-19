document.addEventListener("DOMContentLoaded", async () => {
    
    const urlParams = new URLSearchParams(window.location.search);

    var count = 1;
    var isAlert = false;
  
    document.getElementById("count").innerHTML = count;

    const subId = urlParams.get("subId");
    const giftId = urlParams.get("giftId");
    const voucherId = urlParams.get("voucherId");
    const balance = urlParams.get("balance");

    var number = "";
    let colIndex = 0;
    let rowIndex = 0;

    let numberArray = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [0, "C", "OK"],
  ];
  let keys = ["0","1","2","3","4","5","6","7","8","9"];
    

    const sendWish = async () => {
        try {
          const res = await fetch(`/api/send_wish?sub_id=${subId}&gift_id=${giftId ?giftId :voucherId}&user_id=1&wish_count=${count}`);
          const data = await res.json();

          if (data.status == "success") {
            console.log("onoo hurj baina : ", data);
            isAlert = true;
            
            document.getElementById('customDialog').style.display = 'none';
            document.getElementById('alert').style.display = 'flex';
            document.getElementById('alertText').innerHTML = gift.gift_type == "SUPER" ? 
            `Та ${gift.gift_name} супер бэлгийн тохиролд оролцох эрх амжилттай авлаа. Супер тохирол 2024.10.23-ны өдөр Univision Mongolia facebook хуудсаар 19:00 цагт шууд дамжуулагдана.`
            :`Та ${gift.gift_name}-г амжилттай авлаа. <br> Миний бэлгүүд хэсэг рүү орж эрхийн бичгээ идэвхжүүлээрэй`;

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

      const sendWishToki = async () => {
        if (count > 0 && total <= balance) {
        try {
          const res = await fetch(`/api/send_wish?sub_id=${subId}&gift_id=${giftId ?giftId :voucherId}&user_id=1&wish_count=${count}&phone_no=${parseInt(number)}`);
          const data = await res.json();

          if (data.status == "success") {
            console.log("onoo hurj baina : ", data);
            isAlert = true;
            
            document.getElementById('customDialog').style.display = 'none';
            document.getElementById('alert').style.display = 'flex';
            document.getElementById('alertText').innerHTML = 
            `Та ${gift.gift_name}-г амжилттай авлаа.`;

          }
          else if(data.message == "USER_NOT_FOUND") {
            
            document.getElementById("tokiAlert").innerHTML = "Утасны дугаар Токи-д бүртгэлгүй байна. ";
            
            setTimeout(() => {
              document.getElementById("tokiAlert").innerHTML = "";
            },2000);
          
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
      } 
      else {
        isAlert = true;
        document.getElementById('customDialog').style.display = 'none';
        document.getElementById('alert').style.display = 'flex';
        document.getElementById('alertText').innerHTML = 
        "Уучлаарай таны цуглуулсан оноо хүрэлцэхгүй байна. <br> Та бэлэгтэй цэсээс кино түрээслэн оноогоо нэмэгдүүлэх боломжтой.";
          
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

        if (gift.gift_id == "3012") {

          document.getElementById("button").style.display = "none";
          document.getElementById("numPad").style.display = "block";

          document.getElementById(numberArray[colIndex][rowIndex]).style.borderWidth = '4px';
          document.getElementById(numberArray[colIndex][rowIndex]).style.borderColor = '#f0bd1f';
          document.getElementById(numberArray[colIndex][rowIndex]).style.borderStyle = 'solid';

        } else {
          document.getElementById("button").innerHTML = "АВАХ";
        }
       
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
     
      if (keys.includes(event.key)) {
         if (number.length < 8) {
            number += event.key;
            document.getElementById("number").innerHTML = number;
         }
      
      }
      else

        switch (event.key) {

          case "Enter":
            if(!isAlert) {
              if (gift.gift_id == '3012') {
                
                if (number.length < 8 && numberArray[colIndex][rowIndex] !== "C" && numberArray[colIndex][rowIndex] !== "OK" ) {
                      number += numberArray[colIndex][rowIndex];
                      document.getElementById("number").innerHTML = number;
                    }
                  else if(numberArray[colIndex][rowIndex] == "C") {
                      number = number.substring(0, number.length -1);
                      document.getElementById("number").innerHTML = number;
                      
                  }
                  else if(numberArray[colIndex][rowIndex] == "OK" && number.length == 8) {
                      sendWishToki();
                  }
                  else if(numberArray[colIndex][rowIndex] == "OK" && number.length !== 8) {
                    document.getElementById("tokiAlert").innerHTML = "Зөв утасны дугаар оруулна уу !";
                    
                    setTimeout(() => {
                       document.getElementById("tokiAlert").innerHTML = "";
                    },2000)
                    
                  }
                  
              }

               else if (count > 0 && total <= balance) {

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
            
           if(!isAlert) {

             if(giftId) {

                count++;
                document.getElementById("count").innerHTML = count;
                total += gift.gift_cost;             
                // console.log(total);
              }
             else {

                if(colIndex > 0) {

                  colIndex--;
                  document.getElementById(numberArray[colIndex+1][rowIndex]).style.border = 'none';

                  document.getElementById(numberArray[colIndex][rowIndex]).style.borderWidth = '4px';
                  document.getElementById(numberArray[colIndex][rowIndex]).style.borderColor = '#f0bd1f';
                  document.getElementById(numberArray[colIndex][rowIndex]).style.borderStyle = 'solid';
                  
                }
            }

            } 
             

           break;

           case "ArrowDown" :
            if(!isAlert){

              if (count > 1 && giftId) {
                count--;
                document.getElementById("count").innerHTML = count;
                total -= gift.gift_cost; 
              }
              else {
                if (colIndex < numberArray.length -1) {

                  colIndex++;
                  document.getElementById(numberArray[colIndex-1][rowIndex]).style.border = 'none';

                  document.getElementById(numberArray[colIndex][rowIndex]).style.borderWidth = '4px';
                  document.getElementById(numberArray[colIndex][rowIndex]).style.borderColor = '#f0bd1f';
                  document.getElementById(numberArray[colIndex][rowIndex]).style.borderStyle = 'solid';
                }
            }
            
            }
            

            // console.log(total);

           break;

           case "ArrowRight" :
            if (!isAlert) {
                if (rowIndex < numberArray[colIndex].length -1) {
                  rowIndex++;

                  document.getElementById(numberArray[colIndex][rowIndex-1]).style.border = 'none';

                  document.getElementById(numberArray[colIndex][rowIndex]).style.borderWidth = '4px';
                  document.getElementById(numberArray[colIndex][rowIndex]).style.borderColor = '#f0bd1f';
                  document.getElementById(numberArray[colIndex][rowIndex]).style.borderStyle = 'solid';
                
                }
            }
            
           break;

           case "ArrowLeft" :
            if (!isAlert) {
              if (rowIndex > 0) {

                  rowIndex--;
                  document.getElementById(numberArray[colIndex][rowIndex+1]).style.border = 'none';

                  document.getElementById(numberArray[colIndex][rowIndex]).style.borderWidth = '4px';
                  document.getElementById(numberArray[colIndex][rowIndex]).style.borderColor = '#f0bd1f';
                  document.getElementById(numberArray[colIndex][rowIndex]).style.borderStyle = 'solid';
              }

            }

           break;

        }

        
      
    });

});