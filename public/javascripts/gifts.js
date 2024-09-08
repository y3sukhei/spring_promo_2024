function isElementHiddenInOverflow(element) {
    const parent = element.parentElement;
  
    const elementRect = element.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
  
    // const isOverflowingX = elementRect.left < parentRect.left || elementRect.right > parentRect.right;
    const isOverflowingY = elementRect.top < parentRect.top || elementRect.bottom > parentRect.bottom;
  
    return isOverflowingY;
    // isOverflowingX;
    // || 
  }
document.addEventListener("DOMContentLoaded", async () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const subId = urlParams.get("subId");

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

    const listDuplicates =  list.wish_list.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.gift_id === value.gift_id 
        // && t.name === value.name
      )));

    console.log("duplicates :", listDuplicates);

    var tabIndex = 0;
    var colIndex = 0;
    var voucherColIndex = 0;
    var isAnimating = false;
   
    const superGifts = listDuplicates.filter((item) => item.gift_type ==  "SUPER");
    
    const vouchers = listDuplicates.filter((item) => item.gift_type !==  "SUPER");
   
    const giftContainer = document.getElementById("giftContainer");
    
    const voucherContainer = document.getElementById("voucherContainer");
    
    if (superGifts.length > 0) {


      giftContainer.innerHTML = superGifts
      .map((item,i) => 
      `
        <div class="giftCard" id = "gift${i}">
              <img src="../images/gifts/${item.gift_id}.webp"  
              style="
              border-radius: var(--borderRadius);
              height: 100%;
              width: 40%; ">
              </img>
              <h2 style="text-align: center; width:100%">
                  <span>${item.gift_name}</span>
                </h2>
           </div>
    `
  
  ).join("");


      document.getElementById(`gift${colIndex}`).style.borderWidth = '4px';
      document.getElementById(`gift${colIndex}`).style.borderStyle = 'solid';
      document.getElementById(`gift${colIndex}`).style.borderRadius = '20px';
      document.getElementById(`gift${colIndex}`).style.borderColor = '#f0bd1f';

    }
    else {
      giftContainer.innerHTML =  
      "<div style='display:flex; font-weight:900;justify-content:center; align-items:center; font-size:xx-large; text-align:center; height:100%'> Тохирлын эрх байхгүй байна.</div> "

    }
    
    document.getElementById('superGift').style.backgroundColor = '#f0bd1f';

    document.addEventListener("keydown", async (event) => {
        
        switch (event.key) {
          
          case "Enter":
            

          if (tabIndex == 0) {
            window.location.href = `../views/giftDetail.html?giftId=${superGifts[colIndex].gift_id}&subId=${subId}`;
          }

          else {
            if (vouchers[voucherColIndex].gift_type == "COUPON")
            window.location.href = `../views/giftDetail.html?voucherId=${vouchers[voucherColIndex].gift_id}&subId=${subId}`;

          }
            
           break;

           case "ArrowUp" :
            if (tabIndex == 0) {

           
            if(colIndex > 0 && !isAnimating) {
                isAnimating = true;
                
                 colIndex --;
                 if (isElementHiddenInOverflow(document.getElementById(`gift${colIndex}`))) {
                    document.getElementById(`giftContainer`).scrollBy({
                    top: - document.getElementById(`giftContainer`).scrollHeight / (tabIndex == 0 ? superGifts.length : vouchers.length),
                    left: 0,
                    behavior:"smooth"
                  });}
                 
                 document.getElementById(`gift${colIndex+1}`).style.border = 'none';

                 document.getElementById(`gift${colIndex}`).style.borderWidth = '4px';
                 document.getElementById(`gift${colIndex}`).style.borderStyle = 'solid';
                 document.getElementById(`gift${colIndex}`).style.borderRadius = '20px';
                 document.getElementById(`gift${colIndex}`).style.borderColor = '#f0bd1f';
                 setTimeout(()=> {
                      
                    isAnimating = false;

                  },300);
                
            }
          } else {

            if(voucherColIndex > 0 && !isAnimating) {
              isAnimating = true;
              
              voucherColIndex --;
               if (isElementHiddenInOverflow(document.getElementById(`voucher${voucherColIndex}`))) {
                  document.getElementById(`voucherContainer`).scrollBy({
                  top: - document.getElementById(`voucherContainer`).scrollHeight / vouchers.length,
                  left: 0,
                  behavior:"smooth"
                });}
               
               document.getElementById(`voucher${voucherColIndex+1}`).style.border = 'none';

               document.getElementById(`voucher${voucherColIndex}`).style.borderWidth = '4px';
               document.getElementById(`voucher${voucherColIndex}`).style.borderStyle = 'solid';
               document.getElementById(`voucher${voucherColIndex}`).style.borderRadius = '20px';
               document.getElementById(`voucher${voucherColIndex}`).style.borderColor = 'rgba('+10+','+ 62+','+ 235+')';
               setTimeout(()=> {
                    
                  isAnimating = false;

                },300);
              
          }

          }
          
           break;

           case "ArrowDown" :

           if(tabIndex == 0){
            if (colIndex < superGifts.length -1 && !isAnimating) {

                isAnimating = true;
                
                colIndex ++;
                if (isElementHiddenInOverflow(document.getElementById(`gift${colIndex}`))) {
                    document.getElementById(`giftContainer`).scrollBy({
                    top: document.getElementById(`giftContainer`).scrollHeight / superGifts.length,
                    left: 0,
                    behavior:"smooth"
                  });}

                document.getElementById(`gift${colIndex-1}`).style.border = 'none';

                document.getElementById(`gift${colIndex}`).style.borderWidth = '4px';
                document.getElementById(`gift${colIndex}`).style.borderStyle = 'solid';
                document.getElementById(`gift${colIndex}`).style.borderRadius = '20px';
                document.getElementById(`gift${colIndex}`).style.borderColor = '#f0bd1f';

                setTimeout(()=> {
                      
                    isAnimating = false;

                  },300);


                
            }

           }
           else {
            if (voucherColIndex < vouchers.length -1 && !isAnimating) {

              isAnimating = true;
              
              voucherColIndex++;

              if (isElementHiddenInOverflow(document.getElementById(`voucher${voucherColIndex}`))) {
                  document.getElementById(`voucherContainer`).scrollBy({
                  top: document.getElementById(`voucherContainer`).scrollHeight / vouchers.length,
                  left: 0,
                  behavior:"smooth"
                });}

              document.getElementById(`voucher${voucherColIndex-1}`).style.border = 'none';

              document.getElementById(`voucher${voucherColIndex}`).style.borderWidth = '4px';
              document.getElementById(`voucher${voucherColIndex}`).style.borderStyle = 'solid';
              document.getElementById(`voucher${voucherColIndex}`).style.borderRadius = '20px';
              document.getElementById(`voucher${voucherColIndex}`).style.borderColor = 'rgba('+10+','+ 62+','+ 235+')';

              setTimeout(()=> {
                    
                  isAnimating = false;

                },300);


              
          }

           }
          

           break;

           case "ArrowRight" :
           if(tabIndex < 1){

               tabIndex++;

               document.getElementById('superGift').style.backgroundColor = 'rgba('+134+','+ 130+','+ 130+','+ 0.5+')';
              //  rgb(10, 62, 235);
               document.getElementById('voucher').style.backgroundColor = 'rgba('+10+','+ 62+','+ 235+')';
               
               giftContainer.style.display ="none";
               voucherContainer.style.display = "block";

               if (vouchers.length > 0) {

                 
                 voucherContainer.innerHTML = vouchers
                 .map((item,i) => 
                  `
                 <div class="giftCard" id = "voucher${i}">
                 <img src="../images/gifts/${item.gift_id}.webp"  
                 style="
                  border-radius: var(--borderRadius);
                  height: 100%;
                  width: 40%; ">
                  </img>
                  <h2 style="text-align: center; width:100%">
                  <span>${item.gift_name}</span>
                  </h2>
                  
                  </div>
                  `).join("");
                  
                  document.getElementById(`voucher${voucherColIndex}`).style.borderWidth = '4px';
                  document.getElementById(`voucher${voucherColIndex}`).style.borderStyle = 'solid';
                  document.getElementById(`voucher${voucherColIndex}`).style.borderRadius = '20px';
                  document.getElementById(`voucher${voucherColIndex}`).style.borderColor = 'rgba('+10+','+ 62+','+ 235+')';
                            }
                            else {
                              voucherContainer.innerHTML =  
      "<div style='display:flex; font-weight:900;justify-content:center; align-items:center; font-size:xx-large; text-align:center; height:100%'> Эрхийн бичиг байхгүй байна.</div> "

                            }
            } 
           
           break;

           case "ArrowLeft":
            if(tabIndex > 0) {
           
                tabIndex--;
                
               document.getElementById('superGift').style.backgroundColor = '#f0bd1f';
               document.getElementById('voucher').style.backgroundColor = 'rgba('+134+','+ 130+','+ 130+','+ 0.5+')';

               giftContainer.style.display ="block";
               voucherContainer.style.display = "none";

              if(superGifts.length > 0){

                giftContainer.innerHTML = superGifts
                .map((item,i) => 
                  `
                <div class="giftCard" id = "gift${i}">
                <img src="../images/gifts/${item.gift_id}.webp"  
                style="
                border-radius: var(--borderRadius);
                height: 100%;
                width: 40%; ">
                </img>
                <h2 style="text-align: center; width:100%">
                <span>${item.gift_name}</span>
                </h2>
                
                </div>
                `).join("");
                
                
                document.getElementById(`gift${colIndex}`).style.borderWidth = '4px';
                document.getElementById(`gift${colIndex}`).style.borderStyle = 'solid';
                document.getElementById(`gift${colIndex}`).style.borderRadius = '20px';
                document.getElementById(`gift${colIndex}`).style.borderColor = '#f0bd1f';
              }
            }
                

           break;

        }

        
      
    });

});