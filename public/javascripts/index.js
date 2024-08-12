document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const subId = urlParams.get("subId");
    console.log("subID: ", subId);

    const superGifts = [

        {name:"charming", img : "../images/gifts/CHARMING_01.png"},
        {name:"air", img : "../images/gifts/AIR_01.png"},
        {name:"delonghi", img : "../images/gifts/Delonghi_01.png"},
        {name:"dualipa", img : "../images/gifts/DUALIPA_01.png"},
        {name:"macbook", img : "../images/gifts/MACBOOK_01.png"},
        {name:"steamdeck", img : "../images/gifts/STEAMDECK_01.png"},
    ];
    
    var isStartPage = true;

    var balance = 100;
    
    // !TEMP
    document.getElementById("startPage").style.display = "none";
    document.getElementById("homePage").style.display = "flex";
    document.getElementById("stars").innerHTML = balance;
    
    
    document.addEventListener("keydown", async (event) => {

        // console.log("key event :", event.key);
        
          switch (event.key) {
            case "Enter":
                
                if (isStartPage) {
                                
                     document.getElementById("startPage").style.display = "none";
                     document.getElementById("homePage").style.display = "flex";
                     isStartPage = false;
                }
            //   if (activeModal != "") {
            //     location.reload();
            //   }
            //   if (userInventory.total_voucher == 0) {
            //     drawSendModalError();
            //     activeModal = "sendModalError";
            //     return;
            //   }
            //   const carStart = document.getElementById("carStart");
            //   carStart.style.display = "none";
            //   car.style.display = "block";
            //   if (path.length === 0) {
            //     path = movements.movements;
            //     carMovement(path);
            //   } else if (path == movements.up.movements && direction == "") {
            //     path = movements.up.straight.movements;
            //     userMoves.push("right");
            //     carMovement(path);
            //   } else if (path == movements.down.movements && direction == "") {
            //     path = movements.down.straight.movements;
            //     userMoves.push("right");
            //     carMovement(path);
            //   } else if (direction === "up") {
            //     drawGifts();
            //     userMoves.push("up");
            //     if (path == movements.up.movements) {
            //       path = movements.up.up.movements;
            //     } else if (path == movements.down.movements) {
            //       path = movements.down.up.movements;
            //     } else {
            //       path = movements.up.movements;
            //     }
            //     carMovement(path);
            //   } else if (direction === "down") {
            //     drawGifts();
            //     userMoves.push("down");
            //     if (path == movements.down.movements) {
            //       path = movements.down.down.movements;
            //     } else if (path == movements.up.movements) {
            //       path = movements.up.down.movements;
            //     } else {
            //       path = movements.down.movements;
            //     }
            //     carMovement(path);
            //   }
              break;
    
            case "ArrowUp":
            //   direction = "up";
            //   arrow1.style.opacity = "100%";
            //   arrow2.style.opacity = "20%";
            //   arrow3.style.opacity = "20%";
              break;
    
            case "ArrowDown":
            //   direction = "down";
            //   arrow1.style.opacity = "20%";
            //   arrow3.style.opacity = "100%";
            //   arrow2.style.opacity = "20%";
              break;
    
            case "ArrowRight":
            //   direction = "";
            //   arrow1.style.opacity = "20%";
            //   arrow3.style.opacity = "20%";
            //   arrow2.style.opacity = "100%";
              break;
          }
        
      });
    
});
