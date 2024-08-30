function isElementHiddenInOverflow(element) {
  const parent = element.parentElement;

  const elementRect = element.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  const isOverflowingX = elementRect.left < parentRect.left || elementRect.right > parentRect.right;
  // const isOverflowingY = elementRect.top < parentRect.top || elementRect.bottom > parentRect.bottom;

  return isOverflowingX;
  // || isOverflowingY;
}

document.addEventListener("DOMContentLoaded", async () => {
  
    const urlParams = new URLSearchParams(window.location.search);
    const subId = urlParams.get("subId");
    console.log("subID: ", subId);

    var isAnimating = false;
    
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
    const fetchGifts = async () => {
      try {
        const res = await fetch(`/api/get_gifts`);
        const data = await res.json();
        console.log("fetch gifts", data);
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    let userGiftList = await fetchUserGifts();
    let giftList = await fetchGifts();
    
    const superGifts = [
        {name:"Charming DETOX", img : "../images/gifts/CHARMING_01.png", price:10, description : "Charming Detox 1,500,000₮ Эрхийн Бичиг"},
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
        {name:"karaoke", img : "../images/vouchers/karaoke.png", price : 20},
        {name:"looktv", img : "../images/vouchers/looktv.png", price : 40},
        {name:"mlbb_diamond", img : "../images/vouchers/mlbb_diamond.png", price : 60},
        {name:"mlbb_ticket", img : "../images/vouchers/mlbb_ticket.png", price : 30},
        {name:"roblox", img : "../images/vouchers/roblox.png", price : 60},
        {name:"russia", img : "../images/vouchers/russia.png", price : 40},
        {name:"shoppy", img : "../images/vouchers/shoppy.png", price : 60},
        {name:"steam", img : "../images/vouchers/steam.png", price : 60},
        {name:"toki", img : "../images/vouchers/toki.png", price : 60},
        {name:"tomyo", img : "../images/vouchers/tomyo.png", price : 40},
    ]
    
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = giftList.gift_list.filter((item)=> item.gift_type == "SUPER")
    .map(({gift_cost, gift_id, gift_name, gift_type, gift_count},i) => 
    `
    <div class="card" name = "horCard" id = "card${i}">
                <img id="img${i}" src= "../images/gifts/${gift_id}.png" 
                    style="height: 100%;  object-fit: contain; border-radius: var(--borderRadius);"
                    alt=""
                />
                <div style="position: absolute; bottom: 0; right: 0; margin: 10px; border-radius: var(--iconBorderRadius); background-color: rgba(43, 37, 37, 0.65);">
                <div style="display: flex; align-items: center; padding: 5px;">

                  <h4 style="margin: 0; margin-right:5px; font-weight: 900; position: relative;">
                    <span style="position: absolute; right: 0;">
                      1 ШИРХЭГ
                    </span>
                    <br>ТОХИРЛЫН ЭРХ
                  </h4>
                  <h2 style="margin: 0; margin-right:5px; padding-left: 5px; border-left: 3px solid white; font-weight: 900;">
                    ${gift_cost}
                  </h2>
                  <img src="../images/star.png"  style="height: 20px; aspect-ratio: 1; object-fit: fit"/>
                </div>
                </div>
              </div>
  `).join("");

  const vertCardContainer = document.getElementById("vertCardContainer");
  vertCardContainer.innerHTML = giftList.gift_list.filter((item)=> item.gift_type !== "SUPER")
    .map(({gift_cost, gift_id, gift_name, gift_type, gift_count},i) => 
    `
      <div class="vertCard" id="vertCard${i}">
                  <img src= "../images/vouchers/${gift_id}.png"
                      style="height: 100%;  object-fit: contain; border-radius: var(--borderRadius); position: relative;"
                      alt=""
                  />
                  <div style="position: absolute; bottom: 0; right: 0; margin: 10px; border-radius: var(--iconBorderRadius); background-color: rgba(43, 37, 37, 0.65);">
                    <div style="display: flex; align-items: center; padding: 5px;">    
                      <h2 style="margin: 0; margin-right: 5px; font-weight: 900;">
                        ${gift_cost}
                      </h2>
                      <img src="../images/star.png"  style="height: 20px; aspect-ratio: 1; object-fit: fit"/>
                    </div>
                    </div>
                </div>
  `

).join("");

    // !TEMP
    // document.getElementById("startPage").style.display = "none";
    // document.getElementById("homePage").style.display = "flex";
    document.getElementById("stars").innerHTML = userGiftList.score;
    
    // !Indexes
    var colIndex = 0;
    var tabIndex = 0; 
    var verTabIndex = 0;

    document.getElementById(`card${tabIndex}`).style.borderWidth = '4px';
    document.getElementById(`card${tabIndex}`).style.borderStyle = 'solid';
    document.getElementById(`card${tabIndex}`).style.borderRadius = '20px';
    document.getElementById(`card${tabIndex}`).style.borderColor = '#f0bd1f';
    document.getElementById(`card${tabIndex}`).style.scale = 1.1;

    document.addEventListener("keydown", async (event) => {

          switch (event.key) {
            
            case "Enter":
                
                   //? is super
                  if (colIndex == 0) {
                    console.log("super gift modal"); 
                    window.location.href = `../views/detail.html?giftId=${tabIndex}`;
                  }
                  else if (colIndex == 1) {
                    window.location.href = `../views/detail.html?voucherId=${verTabIndex}`;
                    console.log("voucher gift modal"); 
                  }
                  else {
                    console.log("my gifts"); 
                    window.location.href = '../views/gifts.html'; 

                  }

                
              
                break;
             case "ArrowUp" :

             if (colIndex > 0) {
              
               colIndex--;

               if (colIndex == 1) {

                document.getElementById(`footer`).style.border = 'none';
                document.getElementById(`footer`).style.scale = 1;

                document.getElementById(`vertCard${verTabIndex}`).style.borderWidth = '4px';
                document.getElementById(`vertCard${verTabIndex}`).style.borderColor = 'rgb(10, 62, 235)';
                document.getElementById(`vertCard${verTabIndex}`).style.borderStyle = 'solid';
                document.getElementById(`vertCard${verTabIndex}`).style.borderRadius = '20px';
                document.getElementById(`vertCard${verTabIndex}`).style.scale= 1.1;


                   
               }
                else {

                  
                  document.getElementById(`vertCard${verTabIndex}`).style.border = 'none';
                  document.getElementById(`vertCard${verTabIndex}`).style.scale = 1;
                  
                  document.getElementById(`card${tabIndex}`).style.borderWidth = '4px';
                  document.getElementById(`card${tabIndex}`).style.borderColor = '#f0bd1f';
                  document.getElementById(`card${tabIndex}`).style.borderStyle = 'solid';
                  document.getElementById(`card${tabIndex}`).style.borderRadius = '20px';
                  document.getElementById(`card${tabIndex}`).style.scale= 1.1;
                  
                }

               
             
              }

             break;

             case "ArrowDown" :

             if (colIndex < 2) {
              
                colIndex++;

                if (colIndex == 1) {
                  
                  document.getElementById(`card${tabIndex}`).style.border = 'none';
                  document.getElementById(`card${tabIndex}`).style.scale = 1;

                  document.getElementById(`vertCard${verTabIndex}`).style.borderWidth = '4px';
                  document.getElementById(`vertCard${verTabIndex}`).style.borderColor = 'rgb(10, 62, 235)';
                  document.getElementById(`vertCard${verTabIndex}`).style.borderStyle = 'solid';
                  document.getElementById(`vertCard${verTabIndex}`).style.borderRadius = '20px';
                  document.getElementById(`vertCard${verTabIndex}`).style.scale= 1.1;
                    
                }
                else {
                 
                  document.getElementById(`vertCard${verTabIndex}`).style.border = 'none'; 
                  document.getElementById(`vertCard${verTabIndex}`).style.scale = 1;

                  document.getElementById(`footer`).style.borderWidth = '4px';
                  document.getElementById(`footer`).style.borderColor = '#f0bd1f';
                  document.getElementById(`footer`).style.borderStyle = 'solid';
                  document.getElementById(`footer`).style.borderRadius = '20px';
                  // document.getElementById(`footer`).style.scale= 1.1;

                  }

               }


             break;

             case "ArrowRight" :
              
                if (!isAnimating && colIndex < 2) {

                  if(colIndex == 0 ) {

                
                  if (tabIndex < superGifts.length -1) {
                    isAnimating = true;
                   
                    tabIndex++;

                    // console.log(isElementHiddenInOverflow(document.getElementById(`card${tabIndex}`)))

                    if (isElementHiddenInOverflow(document.getElementById(`card${tabIndex}`))) {
                      document.getElementById(`cardContainer`).scrollBy({
                      top: 0,
                      left: document.getElementById(`cardContainer`).scrollWidth / superGifts.length,
                      behavior:"smooth"
                    });}

                    document.getElementById(`card${tabIndex-1}`).style.border = 'none';
                    document.getElementById(`card${tabIndex-1}`).style.scale = 1;
                  
                    
                    document.getElementById(`card${tabIndex}`).style.borderWidth = '4px';
                    document.getElementById(`card${tabIndex}`).style.borderColor = '#f0bd1f';
                    document.getElementById(`card${tabIndex}`).style.borderStyle = 'solid';
                    document.getElementById(`card${tabIndex}`).style.borderRadius = '20px';
                    document.getElementById(`card${tabIndex}`).style.scale = 1.1;

                    setTimeout(()=> {
                      
                      isAnimating = false;

                    },300);

                  }


                }
                else {
                  if (verTabIndex < vouchers.length -1) {

                    isAnimating = true;
                   
                    verTabIndex++;

                    // console.log(isElementHiddenInOverflow(document.getElementById(`card${tabIndex}`)))

                    if (isElementHiddenInOverflow(document.getElementById(`vertCard${verTabIndex}`))) {
                      document.getElementById(`vertCardContainer`).scrollBy({
                      top: 0,
                      left: document.getElementById(`vertCardContainer`).scrollWidth / vouchers.length,
                      behavior:"smooth"
                    });}

                    document.getElementById(`vertCard${verTabIndex-1}`).style.border = 'none';
                    document.getElementById(`vertCard${verTabIndex-1}`).style.scale = 1;
                  
                    
                    document.getElementById(`vertCard${verTabIndex}`).style.borderWidth = '4px';
                    document.getElementById(`vertCard${verTabIndex}`).style.borderColor = 'rgb(10, 62, 235)';
                    document.getElementById(`vertCard${verTabIndex}`).style.borderStyle = 'solid';
                    document.getElementById(`vertCard${verTabIndex}`).style.borderRadius = '20px';
                    document.getElementById(`vertCard${verTabIndex}`).style.scale= 1.1;

                    setTimeout(()=> {
                      
                      isAnimating = false;

                    },300);
                      
                      
                  }
                }
                
                }
                  break;

             case "ArrowLeft":

             if (!isAnimating && colIndex < 2) {

              if(colIndex == 0 ) {

              if (tabIndex > 0) {

                isAnimating = true;

                tabIndex--;

                    if (isElementHiddenInOverflow(document.getElementById(`card${tabIndex}`))) {
                      document.getElementById(`cardContainer`).scrollBy({
                        top: 0,
                        left: - document.getElementById(`cardContainer`).scrollWidth / superGifts.length,
                        behavior: "smooth",
                      });
                }
               
                document.getElementById(`card${tabIndex+1}`).style.border = 'none';
                document.getElementById(`card${tabIndex+1}`).style.scale = 1;

                document.getElementById(`card${tabIndex}`).style.borderWidth = '4px';
                document.getElementById(`card${tabIndex}`).style.borderColor = '#f0bd1f';
                document.getElementById(`card${tabIndex}`).style.borderStyle = 'solid';
                document.getElementById(`card${tabIndex}`).style.borderRadius = '20px';
                document.getElementById(`card${tabIndex}`).style.scale= 1.1; 

                setTimeout(()=>{
                  isAnimating = false
                }, 300);
            
                }

              }
              else {
                
                if (verTabIndex > 0) {

                  isAnimating = true;
                 
                  verTabIndex--;

                  // console.log(isElementHiddenInOverflow(document.getElementById(`card${tabIndex}`)))

                  if (isElementHiddenInOverflow(document.getElementById(`vertCard${verTabIndex}`))) {
                    document.getElementById(`vertCardContainer`).scrollBy({
                    top: 0,
                    left: - document.getElementById(`vertCardContainer`).scrollWidth / vouchers.length,
                    behavior:"smooth"
                  });}

                  document.getElementById(`vertCard${verTabIndex+1}`).style.border = 'none';
                  document.getElementById(`vertCard${verTabIndex+1}`).style.scale = 1;
                
                  
                  document.getElementById(`vertCard${verTabIndex}`).style.borderWidth = '4px';
                  document.getElementById(`vertCard${verTabIndex}`).style.borderColor = 'rgb(10, 62, 235)';
                  document.getElementById(`vertCard${verTabIndex}`).style.borderStyle = 'solid';
                  document.getElementById(`vertCard${verTabIndex}`).style.borderRadius = '20px';
                  document.getElementById(`vertCard${verTabIndex}`).style.scale= 1.1;

                  setTimeout(()=> {
                    
                    isAnimating = false;

                  },300);
                    
                    
                }
              
              
              }

              }
         
             break;

          }

          
        
      });
    
});
