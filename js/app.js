import { Formulario } from './interfaz_formulario.js'
import { Interfaz } from './interfaz.js'
import { Registrarse } from './registrarse.js'
import { verPerfil } from './ver_perfil.js'

const botonEnviado = document.getElementById('subir')
const inputBuscador = document.getElementById('buscador')
const subirServicio = document.getElementById('subirServicio')
const botonBorrar = document.getElementById('tabla')
const botonRegistrarse = document.getElementById('formularioRegistrarse')
const botonCrearCuenta = document.getElementById('crearCuenta')
const botonVerPerfil = document.getElementById('verPerfil')
const saltarseRegistro = document.getElementById('SaltarseRegistro')
const iniciarSesion = document.getElementById('formIniciar')
const botonIniciarSesion = document.getElementById('botonIniciar')
let cerrarSesion = document.getElementById('cerrarSesion'),
     datosUsuarios = '',
     nombreUsuario = '',
     correoLogeado = '',
     ocupacionUsuario = ''
export { mandarAFirebaseUsuarios, mandarAFirebaseTablas, datosVerPerfil, imprimirTablonesPerfil}


// iniciar base de dato
let firebaseConfig = {

    apiKey: "AIzaSyDdpE9yzE8XEdn6KaZzR8mTHR584LadczE",
    authDomain: "preparaduria-usb.firebaseapp.com",
    databaseURL: "https://preparaduria-usb.firebaseio.com",
    projectId: "preparaduria-usb",
    storageBucket: "preparaduria-usb.appspot.com",
    messagingSenderId: "640089705591",
    appId: "1:640089705591:web:b0fe5fbf93a21703698a72"

}
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

cargarEventos();


firebase.auth().onAuthStateChanged(function(user) {

    let tablaLogin = document.getElementById('tablaLogin')
    let tablaCartas = document.querySelector('.container-cartas')
    const header = document.getElementById('cabezon')

           
    if (user) {
        tablaLogin.style.display = 'none'
        tablaCartas.style.display = 'block'
        header.classList.remove('d-none')
        correoLogeado = user.email
        datosUsuarios = user
      // ...
      
      db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        
            if( doc.data().correo === user.email){
                    nombreUsuario = doc.data().nombre
                    ocupacionUsuario = doc.data().ocupacion
                    console.log('entro arriba')

            }
        });
    });
    imprimirTablonesPerfil()
    leerDatos()

    } else {
      // User is signed out.
      // ...
    
    }
    if(user.emailVerified){
        subirServicio.setAttribute('data-target', '#exampleModal')
    }

    
  });

function cargarEventos() {
    

    document.querySelector('body').classList.add('fondoTablones')


    inputBuscador.addEventListener('input', (e) => {

        e.preventDefault()


        let formularioBuscador = new Formulario()

        const idCabeza = document.querySelectorAll('#cabeza')
        let buscador = document.getElementById('buscador').value


        if (buscador.length > 3) {
            //buscar api
            formularioBuscador.buscador(buscador, idCabeza)

        } else {

            idCabeza.forEach((elementos, index) => {


                let carta = idCabeza[index].parentElement.parentElement

                carta.classList.remove('d-none')

            })

        }
    })

    subirServicio.addEventListener('click', (e) => {
        e.preventDefault()

        if(subirServicio.getAttribute('data-target') === null){

            Swal.fire({
                title: 'Error!',
                text: 'Para subir una preparaduria debes verificar tu cuenta con el enlace que enviamos a tu correo',
                icon: 'error',
                confirmButtonText: 'Esta bien'
              })
              

        }

    })

    botonEnviado.addEventListener('click', () => {

        const selector = document.getElementById('exampleFormControlSelect1')
        const selectorMarcado = selector.options[selector.selectedIndex].value
        const modalidadRadio = document.modulos.modoClase.value;
        const tecnologiaRadio = document.modulos.tecnologiaRequerida.value
        let cantidadAlumnos = document.getElementById('numerosAlumnos').value
        const fechaLimite = document.getElementById('fecha').value
        const detalles = document.getElementById('exampleFormControlTextarea1').value
    

        const divError = document.getElementById('divError')

        if (cantidadAlumnos === 0 || cantidadAlumnos === '0') {

            cantidadAlumnos = 'ilimitados'
        }


        if (selectorMarcado === '' || modalidadRadio === '' || tecnologiaRadio === '' || cantidadAlumnos === '' || fechaLimite === '' || detalles === '') {

            //crear metodo de interfaz donde cree los erroes en la interfaz

            const interfaz = new Interfaz('Rellene todos los campos', divError)
            interfaz.mensajeError()
            

        } else {
                
            let formulario = new Formulario(selectorMarcado, modalidadRadio, tecnologiaRadio, cantidadAlumnos, fechaLimite, detalles, nombreUsuario)
            
            mandarAFirebaseTablas(selectorMarcado, modalidadRadio, tecnologiaRadio, cantidadAlumnos, fechaLimite, detalles, nombreUsuario)

            const tablasPerfil = document.querySelectorAll('.carta')

            tablasPerfil.forEach((tabla) => {

                tabla.remove()

            })

            


        }

    })

    botonBorrar.addEventListener('click', (e) => {

        e.preventDefault()

        

        if (e.target.classList.contains('borrar')) {


            e.target.parentElement.parentElement.remove()




        }
        if (e.target.innerHTML === 'x') {

            e.target.parentElement.parentElement.parentElement.remove()

        }

    })

    botonRegistrarse.addEventListener('submit', (e) => {

        e.preventDefault() 

        const correo = document.getElementById('correoRegistrarse').value
        const nombreYapellido = document.getElementById('nombreRegistrarse').value
        const ocupaciones = document.getElementById('idOcupacion')
        const ocupacion = ocupaciones.options[ocupaciones.selectedIndex].value
        const contra1 = document.getElementById('contraRegistrarse').value
        const contra2 = document.getElementById('contraRegistrarse2').value
        const check = document.getElementById('comprobarRegistrarse').checked

        const validar = new Registrarse(correo, nombreYapellido, ocupacion, contra1, contra2, check)

      
            validar.validarCorreo()
            validar.validarNombre()
            validar.validarContra()
            validar.validarOcupacion()
            validar.valirChecked()
            validar.Comprobar()
         
            
     
        

    })

    botonCrearCuenta.addEventListener('click', () => {
        const botonCrearCuenta = new Registrarse()

        botonCrearCuenta.botonRegistrarse()
    })

    botonVerPerfil.addEventListener('click', () => {

        document.getElementById('tablonPerfil').classList.remove('d-none')
        const cerrarPerfil = document.createElement('Button')
        cerrarPerfil.classList.add('btn', 'my-sm-0', 'btn-outline-light', 'ml-3')
        cerrarPerfil.setAttribute('id', 'cerrarPerfil')
        cerrarPerfil.innerText = 'Salir del perfil'

        const dibBtones = document.getElementById('botonesPerfilCerrar')
        dibBtones.appendChild(cerrarPerfil)


        let botonCerrarSesion = document.getElementById('cerrarSesion')
        botonCerrarSesion.remove()

         botonCerrarSesion = document.createElement('Button')
         botonCerrarSesion.classList.add('btn', 'my-sm-0', 'btn-outline-light', 'ml-3')
        botonCerrarSesion.setAttribute('id', 'cerrarSesion')
        botonCerrarSesion.innerText = 'Cerrar sesion'
        dibBtones.appendChild(botonCerrarSesion)

        botonCerrarSesion.addEventListener('click', (e)=> {
            e.preventDefault()
    
            console.log('hola')
            firebase.auth().signOut()
            .then(() => {
    
                let tabla = document.getElementById('tablaRegistrarse')
                let tablaLogin = document.getElementById('tablaLogin')
                tablaLogin.classList.remove('d-none')
                tablaLogin.style.display = 'block'
                tabla.style.display = 'none'
                tabla.classList.add('d-none')
                console.log('sesion cerrada')
    
            })
            .catch((error) => {
                console.log(error)
            })
    
        })
        
        const body = document.querySelector('body')

        body.classList.add('fondoVerPerfil')
        body.classList.remove('fondoTablones')

        const documentoCartas = document.querySelector('.container-cartas')
        documentoCartas.classList.add('d-none')
        const datosCaja = document.querySelector('.datos')
        botonVerPerfil.classList.add('d-none')

            //crear boton de guardar
            const botonGuardar = document.createElement('button')
            botonGuardar.classList.add('btn', 'botonGuardar')
            botonGuardar.setAttribute('type', 'button')
            botonGuardar.innerText = 'Guardar Cambios'

        datosCaja.addEventListener('click', (e) => {
           
            if (e.target.classList.contains('botonEditar')) {

                const cambio = e.target.parentElement.parentElement.parentElement.querySelector('span')
              
                //crear input para agregar valores modificados
                const input = document.createElement('input')
                input.setAttribute('type', 'text')
                input.setAttribute('placeholder', `cambiar el ${cambio.innerText}`)
                input.classList.add('form-control')
                cambio.appendChild(input) 

                //eliminar el lapiz de agregar
                cambio.parentElement.querySelector('a').remove()

                

                if(!cambio.parentElement.parentElement.parentElement.parentElement.querySelector('.botonGuardar')){

                    cambio.parentElement.parentElement.parentElement.parentElement.querySelector('.boto').appendChild(botonGuardar)

                }

                const perfil = new verPerfil()
              
                botonGuardar.addEventListener('click', () => {

                    const nombre = document.getElementById('nombrePerfil').querySelector('input')
                    const nombrePerfil = nombre.value

                    const correo = document.getElementById('correoPerfil').querySelector('input')
                    const correoPerfil = correo.value

                    const ocupacion = document.getElementById('ocupacionPerfil').querySelector('input')
                    const ocupacionPerfil = ocupacion.value
    
                    perfil.actualizarDatos(nombrePerfil, correoPerfil, ocupacionPerfil)
                   
    
                  })
                 

            }


        })

        cerrarPerfil.addEventListener('click', () => {

            document.getElementById('tablonPerfil').classList.add('d-none')
            cerrarPerfil.remove()
            botonVerPerfil.classList.remove('d-none')
            documentoCartas.classList.remove('d-none')
            body.classList.remove('fondoVerPerfil')
            body.classList.add('fondoTablones')

        })



       
    })

    saltarseRegistro.addEventListener('click', () => {

        let tabla = document.getElementById('tablaRegistrarse')
        let tablaLogin = document.getElementById('tablaLogin')
        tablaLogin.classList.remove('d-none')
        tablaLogin.style.display = 'block'
        tabla.style.display = 'none'
        tabla.classList.add('d-none')
        console.log('entro')



    })
    
    iniciarSesion.addEventListener('submit', (e) => {
        e.preventDefault()
        const usuario = new Registrarse()
        datosVerPerfil()
        usuario.iniciarSesion()

    } )

    cerrarSesion.addEventListener('click', (e)=> {
        e.preventDefault()
        const header = document.getElementById('cabezon')
        header.classList.add('d-none')
        
        firebase.auth().signOut()
        .then(() => {

            
            const tabla = document.getElementById('tablaRegistrarse')
            const tablaLogin = document.getElementById('tablaLogin')
            tablaLogin.classList.remove('d-none')
            tablaLogin.style.display = 'block'
            tabla.style.display = 'none'
            tabla.classList.add('d-none')
            console.log('sesion cerrada')

        })
        .catch((error) => {
            console.log(error)
        })

    })

   
    botonIniciarSesion.addEventListener('click', datosVerPerfil())
}

function mandarAFirebaseUsuarios(correo, nombre, ocupacion){
        
    db.collection("users").add({
        correo: correo,
        nombre: nombre,
        ocupacion:ocupacion,
        IdUsuario: uuid.v1()
      })
       .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
       })
      .catch(function(error) {
        console.error("Error adding document: ", error);
       });

   }
  
function mandarAFirebaseTablas(selectorMarcado, modalidadRadio, tecnologiaRadio, cantidadAlumnos, fechaLimite, detalles, profesor){

    db.collection("tablas").add({
        profesor: profesor,
        modalidadRadio: modalidadRadio,
        tecnologiaRadio: tecnologiaRadio,
        cantidadAlumnos: cantidadAlumnos,
        fechaLimite: fechaLimite,
        detalles: detalles,
        selectorMarcado: selectorMarcado,
        correo: correoLogeado,
      })
       .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
       })
      .catch(function(error) {
        console.error("Error adding document: ", error);
       });

       

}

function leerDatos(){

    let formulario = new Formulario()
    const tablas = document.getElementById('tabla')

    db.collection("tablas").onSnapshot((querySnapshot) => {
        tablas.innerHTML = ''
        querySnapshot.forEach((doc) => {
        
            formulario.imprimirDesdeFirebase(doc.data().selectorMarcado, doc.data().modalidadRadio,  doc.data().tecnologiaRadio, doc.data().cantidadAlumnos, doc.data().fechaLimite, doc.data().detalles, doc.data().profesor, doc.id)
            
        });
    });

}

function datosVerPerfil(){
    
    db.collection("users").get().then((querySnapshot) => {

        

        querySnapshot.forEach((doc) => {
            
            if(doc.data().correo === datosUsuarios.email){
                let nombre = doc.data().nombre
                let ocupacion = doc.data().ocupacion
                    console.log('entro abajo')
                    let perfil = new verPerfil(nombreUsuario, correoLogeado, ocupacionUsuario)
                    perfil.actualizarDatos(nombre, correoLogeado, ocupacion)
            }
        });
    });

    
}

function imprimirTablonesPerfil(){
   
    let tablasPerfil = new verPerfil()
    const tablas = document.getElementById('tablaPerfil')

    db.collection("tablas").onSnapshot((querySnapshot) => {
        tablas.innerHTML = ''
        querySnapshot.forEach((doc) => {
  
            if(doc.data().correo === datosUsuarios.email){
                
                tablasPerfil.imprimirTablas(doc.data().cantidadAlumnos, doc.data().detalles, doc.data().fechaLimite, doc.data().modalidadRadio, doc.data().selectorMarcado, doc.data().tecnologiaRadio, doc.id, db)

            }
        });
    });






}


