AFRAME.registerComponent("cursor-listener", {
    schema: {
      selectedItemId: { default: "", type: "string" }
    },
    init: function () {
      this.handleMouseLeaveEvents();
    },
    infoBanner: function () {
        const { selectedItemId } = this.data;
        //Set the 360 degree image to the sky element.
        const skyEl = document.querySelector("#main-container");
        skyEl.setAttribute("material", {
          src: `./assets/360_images/${selectedItemId}/pages-0.jpg`,
          color: "white"
        });
      },
    handleClickEvents: function () {
     //check the selected item to set the "info banner" component on the plane
     if (selectedItemId) {
         fadebackgroundel.setAttribute("visible",true)
         fadebackgroundel.setAttribute("info banner", {
             itemId : selectedItemId
         })
         titleEl.setAttribute("visible",false)
         cursorEl.setAttribute("position", {x:0, y:0, z:-1});
         cursorEl.setAttribute("geometry", {
            radiusInner: 0.03,
            radiusouter: 0.04
        })
     } else {
         // else make the plane invisible
         fadebackgroundel.setAttribute("visible",false)
         titleEl.setAttribute("visible",true)
         cursorEl.setAttribute("position", {x:0, y:0, z:-3});
         cursorEl.setAttribute("geometry", {
            radiusInner: 0.08,
            radiusouter: 0.12
        })
     }
    },
    handleMouseLeaveEvents: function () {
      //Cursor 'mouseleave' Events
      this.el.addEventListener("mouseleave", () => {
        const { selectedItemId } = this.data;
        if (selectedItemId) {
          const el = document.querySelector(`#${selectedItemId}`);
          const id = el.getAttribute("id");
          if (id == selectedItemId) {
            el.setAttribute("material", {
              color: "#0077CC",
              opacity: 1,
            });
          }
        }
      });
    },
    update: function() {
        const fadebackgroundel = document.querySelector("#fadebackground")

        //check if the infoBanner plane already has comic text info child entity
        //if so remove the child to avoid the overlapping of the text
        c = fadebackgroundel.children;
        if(c.length > 0) {
            var i;
            for ( i=0;i <= c.length; i++) {
                fadebackgroundel.removeChild(c[i])
            }
        } else {
            this.handleClickEvents();
        }
    },
    createComics: function () {
        const thumbNailsRef = [
          {
            id: "Avengers The Ultimate Character Guide",
            title: "Avengers The Ultimate Character Guide",
            url: "./images/thumbnails/Avenger Character.jpg",
          },
          {
            id: "Avengers Alliance",
            title: "Avengers Alliance",
            url: "./images/thumbnails/Avenger Alliance.jpg",
          },
    
          {
            id: "DC Super Hero Stamp Album",
            title: "DC Super Hero Stamp Album",
            url: "./images/thumbnails/DC Stamp Album.jpg",
          },
          {
            id: "Superboy and the legion  of Super Hero",
            title: "Superboy and the legion  of Super Hero",
            url: "./images/thumbnails/DC Super Heroes.jpg",
          },
        ];
        
        let prevoiusXPosition = -50;
    
        for (var item of thumbNailsRef) {
          const posX = prevoiusXPosition + 25;
          const posY = 10;
          const posZ = -40;
          const position = { x: posX, y: posY, z: posZ };
          prevoiusXPosition = posX;
    
          // Border Element
          const BannerEl = this.createBorder(position, item.id);
    
          // Thumbnail Element
          const Image = this.createImage(item);
          BannerEl.appendChild(Image);
    
          // Title Text Element
          const TitleEl = this.createTitleEl(position, item);
          BannerEl.appendChild(TitleEl);

            // Description Element
            const DescriptionEl = this.createDescriptionEl(position, item);
            BannerEl.appendChild(DescriptionEl);
    
          this.comicContainer.appendChild(BannerEl);
        }
      },
      createBanner: function (position, id) {
        const EntityEl = document.createElement("a-entity");
        EntityEl.setAttribute("id", id);
        EntityEl.setAttribute("visible", true);
        EntityEl.setAttribute("geometry", {
          primitive: "plane",
          length: 30,
          width: 22,
        });
        EntityEl.setAttribute("position", {x: 0,y: 5,z: 0.01});
        EntityEl.setAttribute("material", {
          color: "orange",
          opacity: 1,
        });
    
        return EntityEl;
      },
      createImage: function (item) {
        const EntityEl = document.createElement("a-entity");
        EntityEl.setAttribute("visible", true);
        EntityEl.setAttribute("geometry", {
          primitive: "plane",
          length = 28,
          width = 20
        });
        EntityEl.setAttribute("material", { src: item.url });
    
        return EntityEl;
      },
      createDescriptionEl: function (position, item) {
        const EntityEl = document.createElement("a-entity");
        EntityEl.setAttribute("text", {
          font: "exo2bold",
          align: "center",
          width: 70,
          color: "white",
          value: item.Description,
        });
        const elPosition = position;
        elPosition.y = -20;
        EntityEl.setAttribute("position", elPosition);
        EntityEl.setAttribute("visible", true);
        return EntityEl;
      },
      createTitleEl: function (position, item) {
        const EntityEl = document.createElement("a-entity");
        EntityEl.setAttribute("text", {
          font: "exo2bold",
          align: "center",
          width: 70,
          color: "green",
          value: item.title,
        });
        const elPosition = position;
        elPosition.y = -20;
        EntityEl.setAttribute("position", elPosition);
        EntityEl.setAttribute("visible", true);
        return EntityEl;
      },
    });