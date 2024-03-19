const latlogR = document.getElementById('latlogR');
const ciuR = document.getElementById('ciuR');
const porCiudad = document.getElementById('ciuSec');
const porLatLog = document.getElementById('latlogSec');
var inputLatitud;
var inputLongitud;
var inputCiudad;
var inputMetrica, inputIdioma;
var inputMetricaA, inputIdiomaA;
var url,urlA;

let latitudGlobal;
let longitudGlobal;

porLatLog.style.display = 'block';
porCiudad.style.display = 'none';



const radioButtons = [latlogR, ciuR];
radioButtons.forEach(radioButton => {
  radioButton.addEventListener('click', () => {
    if (radioButton.checked) {
      porLatLog.style.display = radioButton.id === 'latlogR' ? 'block' : 'none';
      porCiudad.style.display = radioButton.id === 'ciuR' ? 'block' : 'none';
    }
  });
});

// onSuccess Callback
var onSuccess = function(position) {
  console.log('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n');
      inputLatitud = document.getElementById('latitudLog');
      inputLongitud = document.getElementById('longitudLog');
      inputLatitud.value = position.coords.latitude ;
      inputLongitud.value= position.coords.longitude;
};

// onError Callback
function onError(error) {
  alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}


function positionActual(){

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
  
  
}


//Imprimir los datos



//Aqui armo la url para enviarla a principal 
function consultaLatLon(){

  inputLatitud = document.getElementById('latitudLog');
  inputLongitud = document.getElementById('longitudLog');
  inputMetrica = document.getElementById('tipoUnidadB');
  inputIdioma = document.getElementById('inputIdiomaB');
 
 

  url= 'https://api.openweathermap.org/data/2.5/weather?lat='+ inputLatitud.value+'&lon='+ inputLongitud.value+'&appid=77a2b87caa70e64f5c499d2563b07135&units='+inputMetrica.value+'&lang='+inputIdioma.value;
  principal(url);
  

}
function consultaCiudad(){

 inputCiudad= document.getElementById('ciudadLog');
  inputMetricaA = document.getElementById('tipoUnidadA');
  inputIdiomaA = document.getElementById('inputIdiomaA');
 url='https://api.openweathermap.org/data/2.5/weather?q='+inputCiudad.value+'&appid=77a2b87caa70e64f5c499d2563b07135&units='+inputMetricaA.value+'&lang='+inputIdiomaA.value;
  principal(url);
}




//Aqui solo llamo la url del clima y la mando a crearFila para su uso

function principal(url){
  
  console.log("Ya entreeeeeeeeeee");
  fetch(url)
.then(res => res.json())
.then(resObject =>{
  console.log(resObject);
  crearFila(resObject);
});
}


//Aqui guardo los valos solicitados y los envio a local storage para redireccionar a consulta.html
function crearFila(resObject){
 

  var object = {
      lat: resObject.coord.lat,
      lon:resObject.coord.lon,
      temp:resObject.main.temp,
      cou:resObject.sys.country,
      cit:resObject.name,
      main:resObject.weather[0].main,
      hum:resObject.main.humidity,
      des:resObject.weather[0].description,
      ico:resObject.weather[0].icon
  }

  console.log(object.lat);
  localStorage.setItem("clima1Object",JSON.stringify(object));
  window.location.href = "../consulta.html";

}










