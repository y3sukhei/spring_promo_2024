document.addEventListener("DOMContentLoaded", async () => {
  
  
    const urlParams = new URLSearchParams(window.location.search);
    const subId = urlParams.get("subId");
    console.log("subID: ", subId);

    var isStartPage = true;

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
    <div class="card" name = "horCard">
                <img id="img${i}" src= ${img}
                    style="height: 250px;  object-fit: contain; border-radius: var(--borderRadius);"
                    alt=""
                />
                <div style="position: absolute; bottom: 0; right: 0; margin: 10px; border-radius: var(--iconBorderRadius); background-color: rgba(43, 37, 37, 0.65);">
                <div style="display: flex; align-items: center; padding: 5px; gap: 5px">

                  <h4 style="margin: 0; font-weight: 900; position: relative;">
                    <span style="position: absolute; right: 0;">
                      1 ШИРХЭГ
                    </span>
                    <br>ТОХИРЛЫН ЭРХ
                  </h4>
                  <h2 style="margin: 0; padding-left: 5px; border-left: 3px solid white; font-weight: 900;">
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
      <div class="card" name = "verCard">
                  <img src= ${img}
                      style="height: 200px;  object-fit: contain; border-radius: var(--borderRadius);"
                      alt=""
                  />
                  <div style="position: absolute; bottom: 0; right: 0; margin: 10px; border-radius: var(--iconBorderRadius); background-color: rgba(43, 37, 37, 0.65);">
                    <div style="display: flex; align-items: center; padding: 5px; gap: 4px;">    
                      <h2 style="margin: 0; font-weight: 900;">
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
    var tabIndex = 0; 

    // !Tab Index
    const horElmntsWithTabindex = document.getElementById(`img${tabIndex}`);
    const verElmntsWithTabindex = document.getElementsByName("verCard");

    // !Indexes
    const colIndex = 0;

  
    horElmntsWithTabindex.style.border = "4px, solid, #f0bd1f";
    horElmntsWithTabindex.style.borderRadius = "20px"; 
    horElmntsWithTabindex.style.scale= 1.05;

    console.log(horElmntsWithTabindex);

   
    
    
    document.addEventListener("keydown", async (event) => {

        // console.log("key event :", event.key);
        
          switch (event.key) {
            case "Enter":
                
                if (isStartPage) {
                                
                     document.getElementById("startPage").style.display = "none";
                     document.getElementById("homePage").style.display = "flex";
                     isStartPage = false;
                }
             case "ArrowUp" :

             break;

             case "ArrowDown" :

             break;

             case "ArrowRight" :
                  
                  
                  
                  // document.activeElement.tabIndex;
                 
                  
                  if (tabIndex < horElmntsWithTabindex.length-1) {
                    tabIndex++;

                    
                    horElmntsWithTabindex[tabIndex-1].childNodes[1].style.border = "none";
                    // horElmntsWithTabindex[tabIndex-1].childNodes[1].style.borderRadius = "20px";
                    horElmntsWithTabindex[tabIndex-1].childNodes[1].style.scale= 1;  

                    horElmntsWithTabindex[tabIndex].childNodes[1].style.border = "4px, solid, #f0bd1f";
                    horElmntsWithTabindex[tabIndex].childNodes[1].style.borderRadius = "20px"; 
                    horElmntsWithTabindex[tabIndex].childNodes[1].style.scale= 1.05;
                  }
                  // arrayOfElmnts[0].focus()
                  console.log("tab index :", tabIndex);
                 
                  break;

             case "ArrowLeft":

              // var tabIndex = document.activeElement.tabIndex;
                
              if (tabIndex > 0) {
                tabIndex--;
                horElmntsWithTabindex[tabIndex+1].childNodes[1].style.border = "none";
                // horElmntsWithTabindex[tabIndex+1].childNodes[1].style.borderRadius = "20px"; 
                horElmntsWithTabindex[tabIndex+1].childNodes[1].style.scale= 1;

                horElmntsWithTabindex[tabIndex].childNodes[1].style.border = "4px, solid, #f0bd1f";
                horElmntsWithTabindex[tabIndex].childNodes[1].style.borderRadius = "20px"; 
                horElmntsWithTabindex[tabIndex].childNodes[1].style.scale= 1.05;
            
              }
            // arrayOfElmnts[0].focus()
            console.log("tab index :", tabIndex);

                  

             break;

          }
        
      });
    
});
