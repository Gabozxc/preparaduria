export class Formulario {

    constructor(selector, modalidadRadio, tecnologiaRadio, cantidadAlumnos, fechaLimite, detalles, profesor) {

        this.selector = selector
        this.modalidadRadio = modalidadRadio
        this.tecnologiaRadio = tecnologiaRadio
        this.cantidadAlumnos = cantidadAlumnos
        this.fechaLimite = fechaLimite
        this.detalles = detalles
        this.profesor = profesor
    }



   

    buscador(buscador, idCabeza) {

       
        let buscadorChiquito = buscador.toLowerCase()

        idCabeza.forEach((elementos, index) => {

            if (buscador === idCabeza[index].innerText.toLowerCase() || buscadorChiquito.toUpperCase() === idCabeza[index].innerText.toUpperCase()) {

                let carta = idCabeza[index].parentElement.parentElement

                carta.classList.remove('d-none')

            } else {
                let carta = idCabeza[index].parentElement.parentElement
                carta.classList.add('d-none')
            }


        })



    }

    imprimirDesdeFirebase(selector, modalidadRadio, tecnologiaRadio, cantidadAlumnos, fechaLimite, detalles, profesor, id){

        

        let divCard = document.createElement('div')
        divCard.classList = 'card text-white  mb-4 '
        divCard.classList += id
        divCard.setAttribute('id', 'carta') ////
        let divCardHeader = document.createElement('div')
        divCardHeader.classList = 'card-header mover'

        let parrafo = document.createElement('p')
        parrafo.setAttribute('id', 'cabeza')
        parrafo.innerText = selector
        divCardHeader.appendChild(parrafo)


        let cardBody = document.createElement('div')
        cardBody.classList = 'card-body'
        let Profesor = document.createElement('h5')
        Profesor.classList = 'card-text'
        Profesor.appendChild(document.createTextNode('Profesor: ' + profesor))
        cardBody.appendChild(Profesor)
        let modalidad = document.createElement('p')
        modalidad.classList = 'card-text'
        let MensajeModalidadClase = `Modalidad de la clase: ${modalidadRadio}`
        modalidad.innerHTML = MensajeModalidadClase
        cardBody.appendChild(modalidad)
        let tecnologia = document.createElement('p')
        tecnologia.classList = 'card-text'
        let mensajeAparatosNecesarios = `Aparato necesario: ${tecnologiaRadio}`
        tecnologia.innerHTML = mensajeAparatosNecesarios
        cardBody.appendChild(tecnologia)
        let detallesTitutlo = document.createElement('p')
        detallesTitutlo.classList = 'card-text'
        detallesTitutlo.style.fontWeight = 'bold'
        detallesTitutlo.appendChild(document.createTextNode('detalles adicionales'))
        cardBody.appendChild(detallesTitutlo)
        let detallesInfo = document.createElement('p')
        detallesInfo.appendChild(document.createTextNode( detalles))
        cardBody.appendChild(detallesInfo)
        let fechaFinal = document.createElement('p')
        let mensajeFechaFinal = `Fecha limite de inscripcion:  <b> ${fechaLimite} </b>`
        fechaFinal.innerHTML =  mensajeFechaFinal
        
        cardBody.appendChild(fechaFinal)
        let cupos = document.createElement('p')
        let mensajeCantidadAlumnos = `Cupos disponibles: ${cantidadAlumnos}`
        cupos.innerHTML = mensajeCantidadAlumnos
        cardBody.appendChild(cupos)
        let botonInscribirse = document.createElement('button')
        botonInscribirse.classList = 'btn btn-light'
        botonInscribirse.setAttribute('type', 'button')
        botonInscribirse.appendChild(document.createTextNode('incribirse'))
        cardBody.appendChild(botonInscribirse)
        let botonPreguntar = document.createElement('button')
        botonPreguntar.classList = 'btn btn-outline-light'
        botonPreguntar.setAttribute('type', 'button')
        botonPreguntar.appendChild(document.createTextNode('Mandar mensaje'))
        cardBody.appendChild(botonPreguntar)


        let botonBorrar = document.createElement('button')
        botonBorrar.classList = 'btn btn-light borrar'
        botonBorrar.setAttribute('id', 'borrar')


        let spanBorrar = document.createElement('span')
        spanBorrar.setAttribute('aria-hidden', 'true')
        spanBorrar.innerText = `x`
        botonBorrar.appendChild(spanBorrar)

        //terminar de agregar los bloques mas grandes al html
        // divCardHeader.appendChild(botonBorrar)
        divCard.appendChild(divCardHeader)
        divCard.appendChild(cardBody)
        document.getElementById('tabla').appendChild(divCard)

    }



}

