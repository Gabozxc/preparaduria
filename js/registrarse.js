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


        if (this.contra1 !== this.contra2 || this.contra1 === '' || this.contra2 === '') {

            let formulario = document.getElementById('contraRegistrarse')
            let formulario2 = document.getElementById('contraRegistrarse2')

            formulario.classList.add('is-invalid')
            formulario2.classList.add('is-invalid')
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

    Comprobar() {

        const tablaLogin = document.getElementById('tablaLogin')

        console.log(errores)
        if (errores.length === 0) {
            console.log('enviado')
            this.guardarLocalStorage(this.correo, this.nombreYapellido, this.ocupacion, this.contra1)

            tablaLogin.classList.remove('d-none')

        } else {
            console.log('no enviado')
          
        }
    }

    guardarLocalStorage(correo, nombreYapellido, ocupacion, contra) {

        let direccion = correo
        let pass = contra

        // mandar al local storage  y luego aparecer el login

        let tabla = document.getElementById('tablaRegistrarse')
        let tablaLogin = document.getElementById('tablaLogin')
            // let tablita = document.querySelector('.container-cartas')

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

            if (this.correo == inputCorreo && this.contra1 == inputPass) {

                tablaLogin.style.display = 'none'
                tablaCartas.style.display = 'block'
                header.classList.remove('d-none')
            } else {

                let formulario = document.getElementById('errorLogin')
                let parrafo = document.createElement('p')
                parrafo.innerText = 'Error en que sean iguales los datos'
                parrafo.classList = 'text-danger'
                formulario.appendChild(parrafo)
                setTimeout(() => {
                    parrafo.innerText = ''
                    formulario.appendChild(parrafo)
                }, 3000)



            }





        })
    }



}