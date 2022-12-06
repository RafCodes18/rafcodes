let dateB = document.getElementById("dateBox");
let pictureBox = document.getElementById("nasaImage");

dateB.onchange = function(){

 let date = dateB.value;
 
fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date='+date)
.then((res)=>{
 return res.json();
})
.then((json) => {
 
if(json.media_type == "image")
{
 pictureBox.innerHTML = '<img src="'+json.hdurl+'"><h1>'+json.title+'</h1><p>'+json.explanation+'</p>';
} else if(json.media_type =="video"){
 pictureBox.innerHTML = '<iframe src="'+json.hdurl+'"><h1>'+json.title+'</h1><p>'+json.explanation+'</p>';
} else {
 pictureBox.innerHTML=json.msg;
}
 console.log(json);
})
.catch((err)=>console.log(err))
}