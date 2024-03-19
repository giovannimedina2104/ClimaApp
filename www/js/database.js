var databaseName = 'climaDB';
var databaseVersion = 1;
var openRequest = window.indexedDB.open(databaseName, databaseVersion);
openRequest.onerror = function (event) {
    console.log(openRequest.errorCode);
};
openRequest.onsuccess = function (event) {
    // Database is open and initialized - we're good to proceed.
    var db = openRequest.result;
    console.log("The DataBase was succesfully opened")
    //displayData();
};
openRequest.onupgradeneeded = function (event) {
    // This is either a newly created database, or a new version number
    // has been submitted to the open() call.
    var db = event.target.result;
    db.onerror = function () {
        console.log(db.errorCode);
    };

    // Create an object store and indexes. A key is a data value used to organize
    // and retrieve values in the object store. The keyPath option identifies where
    // the key is stored. If a key path is specified, the store can only contain
    // JavaScript objects, and each object stored must have a property with the
    // same name as the key path (unless the autoIncrement option is true).
    var store = db.createObjectStore('climas', { keyPath: 'climaId', autoIncrement:true });

    // Define the indexes we want to use. Objects we add to the store don't need
    // to contain these properties, but they will only appear in the specified
    // index of they do.
    //
    // syntax: store.createIndex(indexName, keyPath[, parameters]);
    //
    // All these values could have duplicates, so set unique to false
    store.createIndex('Latitud', 'Latitud', { unique: false });
    store.createIndex('Longitud', 'Longitud', { unique: false });
    store.createIndex('country', 'country', { unique: false });
    store.createIndex('city', 'city', { unique: false });
    store.createIndex('main', 'main', { unique: false });
    store.createIndex('hum', 'hum', { unique: false });
    store.createIndex('description', 'description', { unique: false });
    store.createIndex('temperatura', 'temperatura', { unique: false });

};

function displayData() {
}