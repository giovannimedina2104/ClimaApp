// Definir e inicializar la variable openRequest
var databaseName = 'climaDB';
var databaseVersion = 1;
var openRequest = window.indexedDB.open(databaseName, databaseVersion);

// Función para mostrar los datos en la tabla HTML
function displayData(db) {
    var transaction = db.transaction(["climas"], "readonly");
    var objectStore = transaction.objectStore("climas");

    // Limpiar la tabla antes de agregar nuevas filas
    var tableBody = document.getElementById("tablaHis");
    tableBody.innerHTML = "";

    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            // Crear una fila de la tabla para cada entrada en la base de datos
            var newRow = tableBody.insertRow();
            newRow.insertCell(0).textContent = cursor.value.Latitud;
            newRow.insertCell(1).textContent = cursor.value.Longitud;
            newRow.insertCell(2).textContent = cursor.value.country;
            newRow.insertCell(3).textContent = cursor.value.city;
            newRow.insertCell(4).textContent = cursor.value.main;
            newRow.insertCell(5).textContent = cursor.value.hum;
            newRow.insertCell(6).textContent = cursor.value.description;
            newRow.insertCell(7).textContent = cursor.value.temperatura;

            cursor.continue();
        } else {
            console.log("No more entries!");
        }
    };
}

// Llamar a la función displayData cuando la base de datos se abra con éxito
openRequest.onsuccess = function(event) {
    var db = openRequest.result;
    console.log("The DataBase was successfully opened");
    displayData(db); // Llamar a displayData() cuando la base de datos se haya abierto correctamente
};

// Manejar errores de apertura de la base de datos
openRequest.onerror = function(event) {
    console.error("Error opening database:", openRequest.error);
};