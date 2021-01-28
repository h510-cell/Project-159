AFRAME.registerComponent("cursor listener", {
    schema: {
        selectedItemId: {default : "", type: "string"},
    },
    init: function () {
      this.HandleMouseEnterEvents();
      this.HandleMouseLeaveEvents();
      
    },
  
    HandlePosterListState: function () {
      const id = this.el.getAttribute("id");
      const postersId = ["Avengers The Ultimate Character Guide","Avengers Alliance", "DC Super Hero Stamp Album",
       "Superboy and the legion  of Super Hero"];
      if (posterId.includes(id)) {
        const comicContainer = document.querySelector("#comic-container");
        comicContainer.setAttribute("cursor-listener", {
          selectedItemId: id,
        });
        this.el.setAttribute("material", {
          color: "blue",
          opacity: 1,
        });
      }
    },
    HandleMouseEnterEvents: function () {
      // Mouse Enter Events
      this.el.addEventListener("mouseEnter", () => {
        this.HandlePosterListState();
      });
    },
    HandleMouseLeaveEvents: function () {
      // Mouse Leave Event
      this.el.addEventListener("mouseLeave",()=>{
        const {selectedItemId} = this.data;
        if (selectedItemId){
          const el = document.querySelector("#${selectedItemId}");
          const id = this.el.getAttribute("id")
        if(id == selectedItemId) {
          this.el.setAttribute("material", {
            color: "orange",
            opacity: "1"
          })
        }
        }
      })
    },
  });