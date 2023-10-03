// video
const video=document.querySelector("#video"); //sự kiện khi video kết thúc.
video.style.border="5px";
video.addEventListener("ended", ()=>{
    video.currentTime=0; //dat lai thoi gian
    video.play();
});
video.addEventListener("loadeddata", ()=>{ //load lai trang
    video.play();
    console.log("loadeddata event fired");
})


// tim kiem
const form=document.querySelector('.form-search');
const input=document.querySelector("#search");
form.addEventListener("submit",(event)=>{
event.preventDefault();
// alert('tim kiem')
let valueInput=input.value;
console.log(valueInput);
if(valueInput && valueInput !==""){
    console.log('loc tim kiem');
    const apiSearch=URL_API+`?title=${valueInput}`;
    console.log(apiSearch);
    getApi(apiSearch);
    input.value='';

}else{
    console.log("reload");
    window.location.reload();
}
})

