const wrapper=document.querySelector(".wrapper"),
inputPart=wrapper.querySelector(".input-part"),
infoTxt=inputPart.querySelector(".info-txt"),
inputField=inputPart.querySelector("input"),
locationbtn=inputPart.querySelector("button"),
wicons=document.querySelector(".weather-part img"),
arrowback=document.querySelector("header i");
const api_key='6a0fb6b3ce2d4b202bcd0df6948ac3b9';
let api;
inputField.addEventListener("keyup",e=>{
    if(e.key == "Enter" && inputField.value !="")
    requestApi(inputField.value);
});
locationbtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else
    {
        alert("your browser did not support geolocation  api");
    }
});
function onSuccess(position){
   //console.log(position);
   const{latitude,longitude}=position.coords;
   api='https://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude +'&units=metric&appid=' + '6a0fb6b3ce2d4b202bcd0df6948ac3b9';
    fetchData();
}

function onError(error){
    //console.log(error);
    infoTxt.innerHTML="error.message";
   infoTxt.classList.add("error");
}

function requestApi(_city){
     api='https://api.openweathermap.org/data/2.5/weather?q='+_city+ '&units=metric&appid=' + '6a0fb6b3ce2d4b202bcd0df6948ac3b9';
   
    fetchData();
}
function fetchData(){
    infoTxt.innerHTML="Getting weather details";
    infoTxt.classList.add("pending");
    fetch(api).then(response =>response.json()).then(result=>weatherDetails(result));
}
function weatherDetails(info){
    if(info.cod=="404"){
        infoTxt.innerHTML="isn't a valid city name";
        infoTxt.classList.replace("pending","error");
    }
    else
    {  //get values from json
        const city=info.name;
        const country=info.sys.country;
        const {description,id}=info.weather[0];
        const {feels_like,humidity,temp}=info.main;
        if(id == 800)
        {
            wicons.src="clear.svg";
        }
        else if(id>=200 && id<=232)
        {
            wicons.src="strom.svg";
        }
        else if(id >=600  && id<=622 )
        {
            wicons.src="snow.svg";
        }
        else if(id >=701  && id<=781 )
        {
            wicons.src="haze.svg";
        }
        else if(id>=801 && id<=804)
        {
            wicons.src="cloud.svg";
        }
        else if((id>=300  && id<=321 )|| (id>=500  && id<=531 ))
        {
            wicons.src="rain.svg";
        }
        

        //set values to html
        wrapper.querySelector(".temp .numb").innerText=Math.floor(temp);
        wrapper.querySelector(".weather").innerText=description;
        wrapper.querySelector(".location span").innerText=city+','+country;
        wrapper.querySelector(".temp .numb-2").innerText=Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText= humidity +'%';
        infoTxt.classList.remove("pending","error");
        wrapper.classList.add("active");

        console.log(info);
    }
   
}
arrowback.addEventListener("click",()=>{
    wrapper.classList.remove("active");
    
});



