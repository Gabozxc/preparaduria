export class verPerfil {
      constructor(profesor, correo, ocupacion){

            this.profesor = profesor
            this.correo = correo
            this.ocupacion = ocupacion
            

      }

      imprimirDatos(){

            const nombre = document.querySelector('#nombrePerfil span')
            nombre.innerHTML = this.profesor
            
            const correo = document.querySelector('#correoPerfil span')
            correo.innerHTML = this.correo

            const ocupacion = document.querySelector('#ocupacionPerfil span')
            ocupacion.innerHTML = this.ocupacion


      }

      actualizarDatos(nombrePerfil, correoPerfil, ocupacionEducacion){

            
            const nombre = document.querySelector('#nombrePerfil span')
            nombre.innerHTML = nombrePerfil
            
            const correo = document.querySelector('#correoPerfil span')
            correo.innerHTML = correoPerfil

            const ocupacion = document.querySelector('#ocupacionPerfil span')
            ocupacion.innerHTML = ocupacionEducacion
      }

      

    
}