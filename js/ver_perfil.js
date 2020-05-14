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

      imprimirTablas(cantidadAlumnos, detalles, fechaLimite, modalidadRadio, selectorMarcado, tecnologiaRadio){

            console.log('dentro de imprimirTablasEnfirebase')

            // el div donde se meteran las tablas
            const repositorioTablas = document.getElementById('tablaPerfil')
            //crear el div principal de la tabla
            const divTabla = document.createElement('div')
            divTabla.classList.add('card', 'text-dark', 'carta', 'col-md-3', 'mb-4')
            divTabla.style.margin = '10px 10px'
            // div header que ira dentro de la tabla
            const divHeader = document.createElement('div')
            divHeader.classList.add('card-header', 'mover')
            // elemento P que ira dentro del div header
            const materia = document.createElement('p')
            materia.setAttribute('id', 'cabezaPerfil')
            materia.innerHTML = selectorMarcado
            divHeader.appendChild(materia)
            // el cardBody
            const cuerpoTabla = document.createElement('div')
            cuerpoTabla.classList.add('card-body')
            // elemento P de los aparatos necesarios
            const aparatos = document.createElement('p')
            aparatos.classList.add('card-text')
            aparatos.innerHTML = 'Aparatos necesarios: ' + '<br>' + tecnologiaRadio
            // detalles adicionales
            const detallesTabla = document.createElement('p')
            detallesTabla.classList.add('card-text')
            detallesTabla.innerHTML = 'Los detalles dados fueron: ' + '<br>' + '<b>' + detalles + '</b>'

            //Modalidad
            const modalidad = document.createElement('p')
            modalidad.classList.add('card-text')
            modalidad.innerHTML = 'La modalidad elegida fue: ' + '<br>' + '<b>' + modalidadRadio + '</b>'

            // cantidad de alumnos 
            const alumnos = document.createElement('p')
            alumnos.classList.add('card-text')
            alumnos.innerHTML = 'La cantidad de alumnos es: ' + '<br>' + '<b>' + cantidadAlumnos + '</b>'

            // Fecha limite

            const fecha = document.createElement('p')
            fecha.classList.add('card-text')
            fecha.innerHTML = 'La fecha limite es:' + '<br>' + '<b>' + fechaLimite + '</b>'


            //Boton de borrar tablon
            
            let botonBorrar = document.createElement('p')
            botonBorrar.classList = 'btn btn-light borrar'
            botonBorrar.setAttribute('id', 'borrar')
            botonBorrar.innerHTML = 'x'
    
    
            //terminar de agregar los bloques mas grandes al html
             divHeader.appendChild(botonBorrar)
            
             botonBorrar.addEventListener('click', (e) =>{


                  if(e.target.classList.contains('borrar')){
                        e.target.parentElement.parentElement.parentElement.remove()
                  }

             })


            cuerpoTabla.appendChild(divHeader)
            cuerpoTabla.appendChild(detallesTabla)
            cuerpoTabla.appendChild(aparatos)
            cuerpoTabla.appendChild(modalidad)
            cuerpoTabla.appendChild(alumnos)
            cuerpoTabla.appendChild(fecha)
            divTabla.appendChild(cuerpoTabla)
            repositorioTablas.appendChild(divTabla)




      }
      

    
}