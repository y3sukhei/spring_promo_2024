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
   

    const superGifts = [
        {name:"Charming DETOX", img : "../images/gifts/CHARMING_01.png", price:10, description : "Charming Detox 1,500,000₮ Эрхийн Бичиг"},
        {name:"Levoit Air Purifier Core 600s", img : "../images/gifts/AIR_01.png", price:10, description : "Агаар Цэвэвшүүлэгч"},
        {name:"Delonghi ETAM-29/660/SB", img : "../images/gifts/Delonghi_01.png", price:10, description : "Бүрэн автомат кофе чанагч"},
        {name:"Dua Lipa Radical Optimism Tour Singapore", img : "../images/gifts/DUALIPA_01.png", price:10, description:"тоглолт үзэх аяллын эрхийн бичиг"},
        {name:"Apple Macbook Air 13.6", img : "../images/gifts/MACBOOK_01.png", price:10, description:"Зөөврийн компьютер"},
        {name:"Steam Deck", img : "../images/gifts/STEAMDECK_01.png", price:10, description:"Valve Steam Deck OLED"},

    ];
    const vouchers = [
        {name:"Apple Gift Card", img : "../images/vouchers/apple.png", imgLand: "../images/voucher_land/apple.png", price : 60, description:"5$ Gift Card"},
        {name:"Хятад Багц", img : "../images/vouchers/chinese.png",  imgLand: "../images/voucher_land/chinese.png",price : 40, description :'Хятад Багц'},
        {name:"Энтертайнмент Багц", img : "../images/vouchers/entertainment.png", imgLand: "../images/voucher_land/entertainment.png", price : 10, description:'Энтертайнмент Багц'},
        {name:"karaoke", img : "../images/vouchers/karaoke.png", imgLand: "../images/voucher_land/karaoke.png",price : 20, description:'Караоке'},
        {name:"looktv", img : "../images/vouchers/looktv.png", imgLand: "../images/voucher_land/looktv.png",price : 40,description:'look tv'},
        {name:"mlbb_diamond", img : "../images/vouchers/mlbb_diamond.png", imgLand: "../images/voucher_land/mlbb_diamond.png", price : 60, description:'mlbb'},
        {name:"mlbb_ticket", img : "../images/vouchers/mlbb_ticket.png", imgLand: "../images/voucher_land/mlbb_ticket.png", price : 30, description:'mlbb'},
        {name:"roblox", img : "../images/vouchers/roblox.png", imgLand: "../images/voucher_land/roblox.png", price : 60, description:'roblox'},
        {name:"russia", img : "../images/vouchers/russia.png", imgLand: "../images/voucher_land/russia.png", price : 40, description:'russia'},
        {name:"shoppy", img : "../images/vouchers/shoppy.png", imgLand: "../images/voucher_land/shoppy.png", price : 60, description:'shoppy'},
        {name:"steam", img : "../images/vouchers/steam.png", imgLand: "../images/voucher_land/steam.png", price : 60, description:'steam'},
        {name:"toki", img : "../images/vouchers/toki.png", imgLand: "../images/voucher_land/toki.png", price : 60, description:'toki'},
        {name:"tomyo", img : "../images/vouchers/tomyo.png", imgLand: "../images/voucher_land/tomyo.png", price : 40, description:'tomyo'},
    ];
   
    const giftContainer = document.getElementById("giftContainer");
    const voucherContainer = document.getElementById("voucherContainer");

    giftContainer.innerHTML = superGifts
    .map(({name,img,price,description},i) => 
    `
      <div class="giftCard" id = "gift${i}">
            <img src="${img}"  
            style="
            border-radius: var(--borderRadius);
            height: 100%;
            width: 40%; ">
            </img>
            <h2 style="text-align: center; width:100%">
                <span>${name}</span>
                  <br>
                  <span style="font-size: small;">
                    ${description}
                  </span>
              </h2>
            
         </div>
  `

).join("");


    var tabIndex = 0;
    var colIndex = 0;
    var voucherColIndex = 0;
    var isAnimating = false;

    document.getElementById(`gift${colIndex}`).style.borderWidth = '4px';
    document.getElementById(`gift${colIndex}`).style.borderStyle = 'solid';
    document.getElementById(`gift${colIndex}`).style.borderRadius = '20px';
    document.getElementById(`gift${colIndex}`).style.borderColor = '#f0bd1f';


    document.getElementById('superGift').style.backgroundColor = '#f0bd1f';

    document.addEventListener("keydown", async (event) => {
        // console.log("tab index :", tabIndex);
        // console.log("event.key :", event);


        switch (event.key) {
          
          case "Enter":

          if (tabIndex == 0) {
            window.location.href = `../views/giftDetail.html?giftId=${colIndex}`;
          }

          else {
            window.location.href = `../views/giftDetail.html?voucherId=${voucherColIndex}`;

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

               voucherContainer.innerHTML = vouchers
                     .map(({name,img,imgLand,price,description},i) => 
                     `
                       <div class="giftCard" id = "voucher${i}">
                             <img src="${imgLand}"  
                             style="
                             border-radius: var(--borderRadius);
                             height: 100%;
                             width: 40%; ">
                             </img>
                             <h2 style="text-align: center; width:100%">
                                 <span>${name}</span>
                                   <br>
                                   <span style="font-size: small;">
                                     ${description}
                                   </span>
                               </h2>

                          </div>
                        `).join("");

                        document.getElementById(`voucher${voucherColIndex}`).style.borderWidth = '4px';
                        document.getElementById(`voucher${voucherColIndex}`).style.borderStyle = 'solid';
                        document.getElementById(`voucher${voucherColIndex}`).style.borderRadius = '20px';
                        document.getElementById(`voucher${voucherColIndex}`).style.borderColor = 'rgba('+10+','+ 62+','+ 235+')';
                

            } 
           

            
           break;

           case "ArrowLeft":
            if(tabIndex > 0) {
           
                tabIndex--;
                
               document.getElementById('superGift').style.backgroundColor = '#f0bd1f';
               document.getElementById('voucher').style.backgroundColor = 'rgba('+134+','+ 130+','+ 130+','+ 0.5+')';

               giftContainer.style.display ="block";
               voucherContainer.style.display = "none";


               giftContainer.innerHTML = superGifts
                     .map(({name,img,price,description},i) => 
                     `
                       <div class="giftCard" id = "gift${i}">
                             <img src="${img}"  
                             style="
                             border-radius: var(--borderRadius);
                             height: 100%;
                             width: 40%; ">
                             </img>
                             <h2 style="text-align: center; width:100%">
                                 <span>${name}</span>
                                   <br>
                                   <span style="font-size: small;">
                                     ${description}
                                   </span>
                               </h2>

                          </div>
                        `).join("");


               document.getElementById(`gift${colIndex}`).style.borderWidth = '4px';
               document.getElementById(`gift${colIndex}`).style.borderStyle = 'solid';
               document.getElementById(`gift${colIndex}`).style.borderRadius = '20px';
               document.getElementById(`gift${colIndex}`).style.borderColor = '#f0bd1f';
            }
                

           break;

        }

        
      
    });

});