document.addEventListener("DOMContentLoaded", async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const subId = urlParams.get("subId");
    console.log("subId :", subId);
  
    document.addEventListener("keydown", async (event) => {
        
        console.log(event.key);
        
        switch (event.key) {
            case "Enter":
                
                    window.location.replace(`../views/index.html?subId=${subId}`);
                          
                break;
          }

      });
    
});