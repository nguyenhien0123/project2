// resposive
// mobile
const iconMenu=document.querySelector('.icon-menu');
const iconClocse=document.querySelector('.icon-close');
let popupMenu=document.querySelector('.popup-menu');
iconMenu.addEventListener('click',()=>{
    popupMenu.style.transform="translateX(0)";
    popupMenu.style.transition=".5s";
});
iconClocse.addEventListener('click',()=>{
    popupMenu.style.transform="translateX(-250px)";

})