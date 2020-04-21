import { Formulario } from './interfaz_formulario.js'
import { Interfaz } from './interfaz.js'
import { Registrarse } from './registrarse.js'

const botonEnviado = document.getElementById('subir')
const inputBuscador = document.getElementById('buscador')
const botonBorrar = document.getElementById('tabla')
const botonRegistrarse = document.getElementById('formularioRegistrarse')

cargarEventos();


function cargarEventos() {

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
            let formulario = new Formulario(selectorMarcado, modalidadRadio, tecnologiaRadio, cantidadAlumnos, fechaLimite, detalles)

            formulario.imprimirDatos()

        }








    })

    botonBorrar.addEventListener('click', (e) => {

        e.preventDefault()

        console.log(e.target)

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


}