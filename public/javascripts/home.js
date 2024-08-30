document.addEventListener("DOMContentLoaded", async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const subId = urlParams.get("subId");
    console.log("subId :", subId);


    const fetchGiftsInit = async () => {
        try {
          const res = await fetch(`/api/get_gifts_init`);
          const data = await res.json();
          console.log("fetch gifts init", data);
          return data;
        } catch (error) {
          console.log(error);
        }
      };
      
      // ! init
      fetchGiftsInit();

  
    document.addEventListener("keydown", async (event) => {
        
        
        switch (event.key) {
            case "Enter":
                
                    window.location.replace(`../views/index.html?subId=${subId}`);
                          
                break;
          }

      });
    
});