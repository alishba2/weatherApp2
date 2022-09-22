
var Lat=''
var Lon=''
var cityName=''
var tempValue='false'




         function fetchWeather (city){
          API_key = '1e4f2fab590d5a0c1205da5099fd381b'
          fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+API_key)
          .then(response=>{
              return response.json();
          })
          
          .then(json=> this.displayWeather(json));
     
    
         }
         
         function displayWeather(data){
          const{name} = data;
          cityName=name;
          const{humidity , temp , wind_speed}= data.main;

     
        dir =data.coord;
        Lon = dir.lon;;   
        Lat = dir.lat;
      
        getWeatherData();

        }
        function search () {
          this.fetchWeather(document.querySelector(".Input").value);
        }
      
      
            document
            .querySelector(".Input")
            .addEventListener("keyup", function (event) {
              if (event.key == "Enter") {
                search();
              }
          });
       

      fetchWeather("Lahore");
      function changeFunc() {
        var selectBox = document.getElementById("selectBox");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    
       if(selectedValue == 1){
        return 1;
       }
       if(selectedValue == 2){
        return 0;
       }
        }
        if(changeFunc()==1){
            tempValue='true';
        }
        
        if(changeFunc()==2){
            tempValue='false';
        }
      
    
console.log(tempValue)
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const currentTempEl2 = document.getElementById('otherInfo');

var day=[]

var days = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',]
const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();

}, 1000);

getWeatherData()
function getWeatherData () {
      console.log(Lat);
      console.log(Lon);
    
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${Lat}&lon=${Lon}&exclude=hourly,minutely&units=metric&appid=1e4f2fab590d5a0c1205da5099fd381b`)
    .then(res => res.json()).then(data => {
        console.log(data);
        showWeatherData(data);
    });
    
 
}
var result;
function showWeatherData (data){
    var{timezone_offset} = data;
    
    var {temp, wind_speed, humidity, dt,dew_point} = data.current;
    var currentTemp = temp;

    if(tempValue=='true'){
      currentTemp = (temp * 9/5) + 32 + " F";
      console.log("temperature: "+currentTemp);
    }
    else{
        currentTemp = temp + "C"
      }
      
  

    var result = data.current;
    var{description} = result.weather[0];
    console.log(description)    
    const cday = new Date(dt)
    console.log( days[cday.getUTCDay()])

    currentWeatherItemsEl.innerHTML = 

    `
  
                <div class="card-body">
                    <div class="weather loading.." id="current-weather-items" >
                        <h2 class="currentDay">${ days[cday.getUTCDay()]}</h2>
                    
                        
                      
                        <h5 class="city"><i class="fa fa-map-marker " aria-hidden="true" style="font-size: 20px;"></i>${cityName}</h5>
                       <div class="icon">

                       </div>
                        <h3 class="temp">${currentTemp}</h3>
                        <h5 class="description">${description}</h5>
                     
                        
                    </div>
                </div>
            
 
    `;

    currentTempEl2.innerHTML=
        `
        <div class="item2text" id="otherInfo">
        <div class="precipation">
            Precipation : ${dew_point}%
        </div>
        <div class="humidity">
            Humidity: ${humidity} %
        </div>
        <div class="wind">
            Wind: ${wind_speed}kmh
        </div>
       
    
    </div>
        `;
 
      
    let otherDayForcast = ''
    
    data.daily.forEach((day, idx) => {
        var currentTemp = day.temp.day;
        if(tempValue=='true'){
            currentTemp = (day.temp.day * 9/5) + 32 + " F";
            console.log("temperature: "+currentTemp);
          }
          else{
            currentTemp = day.temp.day + "C"
          }
          
   
        fullDate = new Date(data.daily[idx].dt * 1000)
        let year = fullDate.getFullYear();
        let date1 = fullDate.getDate()
        let day1 = days[fullDate.getDay()]
      

if(idx<=3)
{
  otherDayForcast += 
          
          `
          <div  class="card smcard" class="col-4"> 
                          <div class="card-body">
                              <div class="icon">
                                <i class="fa fa-cloud"style="font-size: 50px;" aria-hidden="true"></i>
                              </div>
                              <div class="currentDay">
                              
                                 ${days[idx + 1]}
                              
                              </div>
                          
                              <div>
                              ${currentTemp}
                              </div>
                          </div>
                      </div>
          
          `
}
        

      // }

      
      

    })


    weatherForecastEl.innerHTML = otherDayForcast;
}