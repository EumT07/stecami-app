/* Menu modal*/ 
const menu = document.getElementById("menu")
const modalMenu = document.getElementById("modalMenu");
const close = document.getElementById("close");

//Open
 menu.addEventListener("click", () =>{
    modalMenu.style.display = "block"
 });
//close
close.addEventListener("click", (e)=>{
    if(e.target.classList.contains("close")){
        modalMenu.style.display = "none";
    };
})

/* Btn up */ 
const btn = document.getElementById("btn");
const showBtn = document.getElementById("showBtn");

showBtn.addEventListener("mouseenter", ()=>{
    btn.style.transform = "translate(0%)"
});
showBtn.addEventListener("mouseleave", ()=>{
    btn.style.transform = "translate(220%)"
});

//Filter
const filter = document.getElementById("filter");

filter.addEventListener("keyup", (e)=>{
    let value = e.target.value.toLowerCase();
    let container = document.querySelectorAll(".content__infor_home");
    Array.from(container).forEach((content) =>{
       let recipe = document.querySelectorAll(".content__gallery_home");
        Array.from(recipe).forEach((recip) => {
            let h2 = recip.lastElementChild.firstElementChild.textContent;
            console.log(h2);
            if(h2.toLowerCase().indexOf(value) != -1){
                recip.style.display = 'block';
            }else{
                recip.style.display = 'none';
                 
            }

        });
        
    });

});

// Modal Gallery ingredients
//Container
const recipeModal = document.getElementById("recipeModal");
//close
const closeRecipe = document.getElementById("closeRecipe");
//Img content
const imgModal = document.getElementById("imgModal");
//all images
const images = document.querySelectorAll(".imgGallery");
//all h2
const h2modal = document.querySelectorAll(".h2modal");
//See all recipes
const seeMore = document.querySelectorAll(".seeMore");

for(let i = 0; i <= images.length; i++){
    images[i].addEventListener("click", openImg);
    function openImg(){
        recipeModal.style.display = "block";
        imgModal.src = this.src;
    }      
    closeRecipe.addEventListener("click", (e)=>{
        if(e.target.classList.contains("close_recipe")){
            recipeModal.style.display = "none";}
    });
}


/*
for(let i = 0; i <= seeMore.length; i++){

    seeMore[i].addEventListener("click", ()=>{
        for(let i = 0; i <= images.length; i++){
            imgModal.src = images;
            recipeModal.style.display = "block";
        }

    });
    
}
*/



