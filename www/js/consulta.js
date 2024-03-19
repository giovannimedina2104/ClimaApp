
var objetoLocalStorage = JSON.parse(localStorage.getItem("clima1Object"));

document.getElementById("viewAltitud").textContent = objetoLocalStorage.lat;
document.getElementById("viewLongitud").textContent = objetoLocalStorage.lon;
document.getElementById("viewCountry").textContent = objetoLocalStorage.cou;
document.getElementById("viewCity").textContent = objetoLocalStorage.cit;
document.getElementById("viewMWeather").textContent = objetoLocalStorage.main;
document.getElementById("viewHumidity").textContent = objetoLocalStorage.hum;
document.getElementById("viewDWeather").textContent = objetoLocalStorage.des;
document.getElementById("viewDWeather").textContent = objetoLocalStorage.des;
document.getElementById("viewTemp").textContent = objetoLocalStorage.temp;


var urlImg= 'https://api.openweathermap.org/img/w/'+ objetoLocalStorage.ico+'.png';

var icono = document.getElementById("iconoW");
icono.src="";
icono.src = urlImg;






function volver(){
    window.location.href = "../index.html";
}





 




//Guardar base de datos

var employeeData = [];

saveData();

function saveData(){
    var Latitud = objetoLocalStorage.lat;
    var Longitud = objetoLocalStorage.lon;
    var country= objetoLocalStorage.cou;
    var city = objetoLocalStorage.cit;
    var main = objetoLocalStorage.main;
    var hum = objetoLocalStorage.hum;
    var description= objetoLocalStorage.des;
    var temperatura = objetoLocalStorage.temp;
    console.log(Latitud,Longitud,country,city,main, hum, description, temperatura);

    var employeeObject = {
        "Latitud": Latitud,
        "Longitud": Longitud,
        "country":country,
        "city": city,
        "main": main,
        "hum": hum,
        "description": description,
        "temperatura": temperatura
    }
    employeeData.push(employeeObject);
    console.log(employeeObject);

    var databaseName = 'climaDB';
    var databaseVersion = 1;
    var openRequest = window.indexedDB.open(databaseName, databaseVersion);

    openRequest.onerror = function (event) {
    console.log(openRequest.errorCode);
    };

    openRequest.onsuccess = function (event) {
    // Database is open and initialized - we're good to proceed.
    var db = openRequest.result;
    console.log("The DataBase is ready to start...");
    const transaction = db.transaction(["climas"], "readwrite");
    // Do something when all the data is added to the database.
  transaction.oncomplete = (event) => {
    console.log("All done!");
  };
  
  transaction.onerror = (event) => {
    // Don't forget to handle errors!
    console.log("Try again");
  };
  
  const objectStore = transaction.objectStore("climas");
  employeeData.forEach((climas) => {
    console.log(climas);
    const request = objectStore.add(climas);
    request.onsuccess = (event) => {
      // event.target.result === customer.ssn;
    };
  });
    };
}