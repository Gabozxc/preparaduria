export class Interfaz {

    constructor(error, divError, buscador) {

        this.error = error
        this.divError = divError
        this.buscador = buscador

    }

    mensajeError() {

        this.divError.innerHTML = this.error
        divError.classList = 'alert alert-danger'
        setTimeout(() => {
            this.divError.innerHTML = ''
            this.divError.classList.remove('alert')
            this.divError.classList.remove('alert-danger')
        }, 3000)

    }





}