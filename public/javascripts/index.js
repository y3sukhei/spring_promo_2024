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

    var isStartPage = true;

    var isAnimating = false;

    var balance = 100;

    const superGifts = [
        {name:"charming", img : "../images/gifts/CHARMING_01.png", price:10},
        {name:"air", img : "../images/gifts/AIR_01.png", price:10},
        {name:"delonghi", img : "../images/gifts/Delonghi_01.png", price:10},
        {name:"dualipa", img : "../images/gifts/DUALIPA_01.png", price:10},
        {name:"macbook", img : "../images/gifts/MACBOOK_01.png", price:10},
        {name:"steamdeck", img : "../images/gifts/STEAMDECK_01.png", price:10},

    ];

    const vouchers = [
        {name:"apple", img : "../images/vouchers/apple.png", price : 60},
        {name:"chinese", img : "../images/vouchers/chinese.png", price : 40},
        {name:"entertainment", img : "../images/vouchers/entertainment.png", price : 10},
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
    cardContainer.innerHTML = superGifts
    .map(({name,img,price},i) => 
    `
    <div class="card" name = "horCard" id = "card${i}">
                <img id="img${i}" src= ${img} 
                    style="height: 250px;  object-fit: contain; border-radius: var(--borderRadius);"
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
                    ${price}
                  </h2>
                  <img src="../images/star.png"  style="height: 20px; aspect-ratio: 1; object-fit: fit"/>
                </div>
                </div>
              </div>
  `).join("");

  const vertCardContainer = document.getElementById("vertCardContainer");
  vertCardContainer.innerHTML = vouchers
    .map(({name,img,price},i) => 
    `
      <div class="card" name = "verCard" id="vertCard${i}">
                  <img src= ${img}
                      style="height: 200px;  object-fit: contain; border-radius: var(--borderRadius); position: relative;"
                      alt=""
                  />
                  <div style="position: absolute; bottom: 0; right: 0; margin: 10px; border-radius: var(--iconBorderRadius); background-color: rgba(43, 37, 37, 0.65);">
                    <div style="display: flex; align-items: center; padding: 5px;">    
                      <h2 style="margin: 0; margin-right: 5px; font-weight: 900;">
                        ${price}
                      </h2>
                      <img src="../images/star.png"  style="height: 20px; aspect-ratio: 1; object-fit: fit"/>
                    </div>
                    </div>
                </div>
  `

).join("");

    // !TEMP
    document.getElementById("startPage").style.display = "none";
    document.getElementById("homePage").style.display = "flex";
    document.getElementById("stars").innerHTML = balance;
    
    // !Indexes
    var colIndex = 0;
    var tabIndex = 0; 
    var verTabIndex = 0;

    // !Tab Index

    document.getElementById(`card${tabIndex}`).style.borderWidth = '4px';
    document.getElementById(`card${tabIndex}`).style.borderColor = 'white';
    document.getElementById(`card${tabIndex}`).style.borderStyle = 'solid';
    document.getElementById(`card${tabIndex}`).style.borderRadius = '20px';
    document.getElementById(`card${tabIndex}`).style.borderColor = '#f0bd1f';

    const horElmntsWithTabindex = document.getElementsByName("horCard");
    const verElmntsWithTabindex = document.getElementsByName("verCard");

  

    document.addEventListener("keydown", async (event) => {


          switch (event.key) {
            
            case "Enter":
                
                if (isStartPage) {
                                
                     document.getElementById("startPage").style.display = "none";
                     document.getElementById("homePage").style.display = "flex";
                     isStartPage = false;
                }
                break;
             case "ArrowUp" :

             if (colIndex > 0) {
              
               colIndex--;
               console.log("col index :", colIndex);

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
