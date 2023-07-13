
function initializeApp() {

    var firebaseConfig = {
        apiKey: "AIzaSyDmCcE_vaDqWaULnMUsbeu3vuR-eTfXf70",
        authDomain: "login-signup-daccb.firebaseapp.com",
        databaseURL: "https://login-signup-daccb-default-rtdb.firebaseio.com",
        projectId: "login-signup-daccb",
        storageBucket: "login-signup-daccb.appspot.com",
        messagingSenderId: "531096139624",
        appId: "1:531096139624:web:52ed83caf446a0f76b48dd"
    }

// Initialize Firebase

const app = initializeApp(firebaseConfig);
//Inicializa las Variables 
const auth = firebase.auth(); 
const database = firebase.database(); 

}
var email; 
var password; 
var full_name; 
var selectId; 
var job; 


//Funcion Sign Up 
function signUp(){
    email = document.getElementById("email").value;
    password = document.getElementById("identification");
    full_name = document.getElementById("name").value;
    selectId = document.getElementById("selectId").value; 
    job = document.getElementById("job").value;
}

if(validate_email(email)=== false || validate_Id(id)===false){
    alert("Contrasena o Id Incorrectos!")
   }
   
if(validate_field(full_name)=== false ||
    validate_field(selectId)=== false ||
    validate_field(job)=== false ){
    alert('Por favor diligencie todos los campos!')
}  

//const auth = getAuth(firebaseApp);
//Registrar Usuarios en la base de datos 
auth.createUserWithEmailAndPassword(email, password)
then(function(){        
        var user = auth.currentUser

        //Agregar el Usuario a la base de datos 
        var database_ref = database.ref(); 

        // Crear los datos del usuario
        var user_data = {
            email   : email,
            password : password, 
            full_name : full_name, 
            selectId : selectId, 
            job : job, 
            last_login : Date.now()
        } 
        
        database.ref.child('users/' + user.uid).set(user_data);
        alert('Usuario Creado');
    })
    .catch(function(error){
        //Si hay un error con la base de datos, este sera el error 
        var error_code = error.code
        var error_message = error_message
        alert(error_message)
    }); 



// Funcion para validar que el email este en un formato correcto 
function validate_email(email){
    var expression = /^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(email)== true){
        console.log('Correcto')
        return true
    }else {
        console.log('Inorrecto')
        return false
    }
}

// Funcion para validar que el documento tenga minimo 6 caracteres, esto lo puedes ajustar 

function validate_Id(password){
    if(password < 5 ){
        return false
    }else {
        return true
    }
}

function validate_field(field){
    if(field === null || field.length <= 0){
        return false
    }else {
        return true
    }
}



