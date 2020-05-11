let errores = []
export class Registrarse {


    constructor(correo, nombreYapellido, ocupacion, contra1, contra2, check) {
        this.correo = correo
        this.nombreYapellido = nombreYapellido
        this.ocupacion = ocupacion
        this.contra1 = contra1
        this.contra2 = contra2
        this.check = check
    }


    validarCorreo() {

        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;


        if (emailRegex.test(this.correo)) {
            
            let formulario = document.getElementById('correoRegistrarse')

            formulario.classList.remove('is-invalid')
            formulario.classList.add('is-valid')
            errores.shift()

        } else {

            let formulario = document.getElementById('correoRegistrarse')
            formulario.classList.add('is-invalid')
            errores.push("Error en el correo")
        }

    }

    validarNombre() {

        if (this.nombreYapellido === '') {


            //enviar a localStorage
            let formulario = document.getElementById('nombreRegistrarse')

            formulario.classList.add('is-invalid')
            errores.push("Nombre y apellido vacio")
        } else {

            let formulario = document.getElementById('nombreRegistrarse')
            formulario.classList.remove('is-invalid')
            formulario.classList.add('is-valid')
            errores.shift()

        }


    }

    validarContra() {


        if (this.contra1 !== this.contra2 || this.contra1 === '' || this.contra2 === '' || this.contra1.length <= 8 ) {
            let formulario = document.getElementById('contraRegistrarse')
            let formulario2 = document.getElementById('contraRegistrarse2')
            let formulario3 = document.getElementById('errorChecked')


            formulario.classList.add('is-invalid')
            formulario2.classList.add('is-invalid')

            let parrafo = document.createElement('p')
            parrafo.innerText = 'Verifique que la contraseña sea igual y tenga 8 caracteres o mas'
            
            formulario3.appendChild(parrafo)
            parrafo.classList = 'text-danger'

            errores.push("Error al marcar terminos y condiciones")

            setTimeout(() => {
                parrafo.innerText = ''
                formulario.appendChild(parrafo)
            }, 3000)


            errores.push("Error en contrase;a")
        } else {
            //enviar a localStorage

            let formulario = document.getElementById('contraRegistrarse')
            let formulario2 = document.getElementById('contraRegistrarse2')
            formulario.classList.remove('is-invalid')
            formulario.classList.add('is-valid')
            formulario2.classList.remove('is-invalid')
            formulario2.classList.add('is-valid')
            
            errores.shift()

        }

    }

    validarOcupacion() {
        let formulario = document.getElementById('idOcupacion')
        let eleccion = formulario.options[formulario.selectedIndex].value

        if (eleccion) {

            formulario.classList.add('is-valid')
        }
    }

    valirChecked() {

        let formulario = document.getElementById('errorChecked')
        console.log(formulario)
        let label = document.getElementById('unLabel')

        if (this.check === true) {

            label.classList.add('text-success')
            errores.shift()

        } else {
            let parrafo = document.createElement('p')
            parrafo.innerText = 'Acepte terminos y condiciones'
            formulario.appendChild(parrafo)
            parrafo.classList = 'text-danger'
            label.classList.remove('text-success')
            errores.push("Error al marcar terminos y condiciones")
            setTimeout(() => {
                parrafo.innerText = ''
                formulario.appendChild(parrafo)
            }, 3000)

        }

    }

    botonRegistrarse(){
       

        let tabla = document.getElementById('tablaRegistrarse')
        let tablaLogin = document.getElementById('tablaLogin')
        tablaLogin.classList.add('d-none')
        tablaLogin.style.display = 'none'
        tabla.style.display = 'block'
        tabla.classList.remove('d-none')
        console.log('entro')
    
        
    }


    Comprobar() {

            if (errores.length === 0 ) {

            firebase.auth().createUserWithEmailAndPassword(this.correo, this.contra1)
            .then(() => {
                
                let IdUsuario = ''
                IdUsuario =  uuid.v1()

                let formulario2 = document.getElementById('correoRegistrarse')
                formulario2.classList.remove('is-invalid')
                formulario2.classList.add('is-valid')

                this.verificarConCorreo()
                this.aparecerLogin()


            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
    
                if(errorMessage){
    
                    let formulario = document.getElementById('errorChecked')


                    let parrafo = document.createElement('p')
                    parrafo.innerText = 'El correo que mando esta siendo utilizado'
                    
                    let formulario2 = document.getElementById('correoRegistrarse')
                    formulario2.classList.add('is-invalid')

                    formulario.appendChild(parrafo)
                    parrafo.classList = 'text-danger'


                    setTimeout(() => {
                        parrafo.innerText = ''
                        formulario.appendChild(parrafo)
                    }, 3000)
        
    
                }
    
                console.log(errorCode)
                console.log(errorMessage)
                console.log(error)
                
                // ...
              });
    



          


        } else {
            console.log('no enviado')
          
        }
    }

    aparecerLogin() {
     
        let tabla = document.getElementById('tablaRegistrarse')
        let tablaLogin = document.getElementById('tablaLogin')
        tablaLogin.classList.remove('d-none')
        tablaLogin.style.display = 'block'
        tabla.style.display = 'none'


        this.iniciarSesion()
    }

    iniciarSesion() {

        document.getElementById('formIniciar').addEventListener('submit', (e) => {

            e.preventDefault()

            let tablaLogin = document.getElementById('tablaLogin')
            let tablaCartas = document.querySelector('.container-cartas')
            let inputCorreo = document.getElementById('correoLogin').value
            let inputPass = document.getElementById('login1').value
            const header = document.getElementById('cabezon')


            firebase.auth().signInWithEmailAndPassword(inputCorreo, inputPass)
                .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('error')
                let formulario = document.getElementById('errorLogin')
                    formulario.innerText = ''
                    formulario.innerText = 'Error en que sean iguales los datos'
                    formulario.classList = 'text-danger'
                    
                    setTimeout(() => {
                      formulario.innerText = ''
                      
                        
                    }, 8000)


                // ...
              });
              
              firebase.auth().onAuthStateChanged(function(user) {
               
                if (user) {
                    console.log(user)
                    console.log('se ha comenzado una sesion')
                    tablaLogin.style.display = 'none'
                    tablaCartas.style.display = 'block'
                    header.classList.remove('d-none')
                  // User is signed in.
                
                  var displayName = user.displayName;
                  var email = user.email;
                  var emailVerified = user.emailVerified;
                  var photoURL = user.photoURL;
                  var isAnonymous = user.isAnonymous;
                  var uid = user.uid;
                  var providerData = user.providerData;
                  // ...
                } else {
                  // User is signed out.
                  // ...
                
                }
              });
            


        })
    }

    verificarConCorreo(){
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function() {
        // Email sent.
         console.log('se envio el correo')
        }).catch(function(error) {
        // An error happened.
        console.log('se cancelo el correo')
        });

    }



}