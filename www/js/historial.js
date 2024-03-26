// Definir e inicializar la variable openRequest
var databaseName = 'climaDB';
var databaseVersion = 1;
var openRequest;

// Función para eliminar un registro de la tabla y la base de datos
// Función para eliminar un registro de la tabla y la base de datos
function deleteRecord(key) {

    var confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este registro?");

    if (confirmDelete) {

        openRequest = window.indexedDB.open(databaseName, databaseVersion);

        openRequest.onerror = function (event) {
            console.log(openRequest.errorCode);
        };
        openRequest.onsuccess = function (event) {
            // Database is open and initialized - we're good to proceed.

            var transaction = openRequest.result.transaction(["climas"], "readwrite");
            var objectStore = transaction.objectStore("climas");

            var deleteRequest = objectStore.delete(key);
            deleteRequest.onsuccess = function(event) {
                console.log("Registro eliminado exitosamente");
                // Después de eliminar el registro, volvemos a mostrar los datos en la tabla
                location.reload();
            };
            deleteRequest.onerror = function(event) {
                console.log("Error al eliminar el registro");
            };
        };
        
    }
}

// Función para mostrar los datos en la tabla HTML
function displayData() {
    openRequest.onsuccess = function(event) {
        var db = openRequest.result;
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

                 // Agregar un botón de eliminar a la fila
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.dataset.key = cursor.primaryKey; // Almacenar la clave principal del registro como un atributo de datos
            deleteButton.addEventListener("click", function() {
                var key = parseInt(this.dataset.key);
                deleteRecord(key); // Llamar a la función para eliminar el registro
           
        
            });
            newRow.insertCell(8).appendChild(deleteButton);

                cursor.continue();
            } else {
                console.log("No more entries!");
               
            }
        };
    };
}




// Llamar a la función displayData cuando la página se cargue
document.addEventListener("DOMContentLoaded", function() {
    displayData();
});