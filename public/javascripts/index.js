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

  window.addEventListener('pageshow', function(event) {
  if (event.persisted) {

    window.location.reload(true);
  
  }
});

  
 
    const urlParams = new URLSearchParams(window.location.search);
    const subId = urlParams.get("subId");

    var isAnimating = false;
    
    const fetchUserGifts = async () => {
      try {
        const res = await fetch(`/api/get_user_wish_list?sub_id=${subId}`
          ,{  
            headers: {  
            'Cache-Control': 'no-cache, max-age=0'
          }}
        );
        const data = await res.json();
        document.getElementById("stars").innerHTML = data.score;
        return data;
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchGifts = async () => {
      try {
        const res = await fetch(`/api/get_gifts`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    let userGiftList = await fetchUserGifts();
    let giftList = await fetchGifts();
    
    const idsToRemove = new Set(userGiftList.wish_list.map(item => item.gift_id));

    
    const superGifts = giftList.gift_list.filter((item)=> item.gift_type == "SUPER" );

    const vouchers = giftList.gift_list.filter((item)=> item.gift_type !== "SUPER" );
    
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = superGifts
    .map(({gift_cost, gift_id, gift_name, gift_type, gift_count},i) => 
    `
    <div class="card" name = "horCard" id = "card${i}" style = "filter: grayscale(${gift_count <= 0 ? 100: 0 }%">
                <img id="img${i}" src= "../images/gifts/${gift_id}.webp" 
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
  vertCardContainer.innerHTML = vouchers
    .map(({gift_cost, gift_id, gift_name, gift_type, gift_count},i) => 
    `
      <div class="vertCard" id="vertCard${i}" style = "filter: grayscale(${gift_count <= 0 || idsToRemove.has(gift_id) ? 100 : 0 }%">
                  <img src= "../images/gifts/${gift_id}.webp"
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


    // !Indexes
    var colIndex = 1;
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
                    console.log("my gifts"); 
                    window.location.href = `../views/gifts.html?subId=${subId}`; 
                  }

                  else if (colIndex == 1) {
                    console.log("super gift modal"); 
                    window.location.href = `../views/detail.html?subId=${subId}&giftId=${superGifts[tabIndex].gift_id}&balance=${userGiftList.score}`;
                   
                  }

                  else {
                    window.location.href = `../views/detail.html?subId=${subId}&voucherId=${vouchers[verTabIndex].gift_id}&balance=${userGiftList.score}`;
                    console.log("voucher gift modal"); 
                  }

                
              
                break;
             case "ArrowUp" :

             if (colIndex > 0) {
              
               colIndex--;

               if (colIndex == 1) {

                document.getElementById(`vertCard${verTabIndex}`).style.border = 'none'; 
                document.getElementById(`vertCard${verTabIndex}`).style.scale = 1;

                document.getElementById(`card${tabIndex}`).style.borderWidth = '4px';
                document.getElementById(`card${tabIndex}`).style.borderColor = '#f0bd1f';
                document.getElementById(`card${tabIndex}`).style.borderStyle = 'solid';
                document.getElementById(`card${tabIndex}`).style.borderRadius = '20px';
                document.getElementById(`card${tabIndex}`).style.scale= 1.1;


                   
               }
                else {

                  document.getElementById(`card${tabIndex}`).style.border = 'none';
                  document.getElementById(`card${tabIndex}`).style.scale = 1;

                  document.getElementById(`footer`).style.borderWidth = '4px';
                  document.getElementById(`footer`).style.borderColor = '#f0bd1f';
                  document.getElementById(`footer`).style.borderStyle = 'solid';
                  document.getElementById(`footer`).style.borderRadius = '20px';
                  
                }

               
             
              }

             break;

             case "ArrowDown" :

             if (colIndex < 2) {
              
                colIndex++;

                if (colIndex == 1) {
                  
                  document.getElementById(`footer`).style.border = 'none';
                  document.getElementById(`footer`).style.scale = 1;

                  document.getElementById(`card${tabIndex}`).style.borderWidth = '4px';
                  document.getElementById(`card${tabIndex}`).style.borderColor = '#f0bd1f';
                  document.getElementById(`card${tabIndex}`).style.borderStyle = 'solid';
                  document.getElementById(`card${tabIndex}`).style.borderRadius = '20px';
                  document.getElementById(`card${tabIndex}`).style.scale= 1.1;
                    
                }
                else { 
                 
                  document.getElementById(`card${tabIndex}`).style.border = 'none'; 
                  document.getElementById(`card${tabIndex}`).style.scale = 1;

                  document.getElementById(`vertCard${verTabIndex}`).style.borderWidth = '4px';
                  document.getElementById(`vertCard${verTabIndex}`).style.borderColor = 'rgb(10, 62, 235)';
                  document.getElementById(`vertCard${verTabIndex}`).style.borderStyle = 'solid';
                  document.getElementById(`vertCard${verTabIndex}`).style.borderRadius = '20px';
                  document.getElementById(`vertCard${verTabIndex}`).style.scale= 1.1;

                
                  // document.getElementById(`footer`).style.scale= 1.1;

                  }

               }


             break;

             case "ArrowRight" :
              
                if (!isAnimating && colIndex > 0) {

                  if(colIndex == 1 ) {

                
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

             if (!isAnimating && colIndex > 0) {

              if(colIndex == 1 ) {

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
