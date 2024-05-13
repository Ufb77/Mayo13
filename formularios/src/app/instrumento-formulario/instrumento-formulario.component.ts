import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Instrumento } from '../_modelo/Instrumento';
import { MiServicioService } from '../_servicio/mi-servicio.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-instrumento-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './instrumento-formulario.component.html',
  styleUrl: './instrumento-formulario.component.css'
})
export class InstrumentoFormularioComponent implements OnInit {


//Qué son los formcontrol, formgroup?
// Son clases que siguen o controlan el valor y las validaciones bien de un solo "componente" del formulario
//o bien de un conjunto de formsControl (en el caso de formgroup)


//Como se detectan los cambios en los formularios reactivos?
//A través de un observable llamado valueChanges. Así quien esté suscrito a él reciben los nuevos datos

//Cómo se vinculan los formularios reactivos con la interfaz de usuario en Angular?
//con la directiva [formControl] = el formulario que has creado en typescript

//Cómo se envían los datos del formulario reactivos a un servidor en Angular?
//Mediante la directiva httpClient haciendo referencia a los diferentes métodos .get .post...

//Para qué sirven el operador reactivo switchmap?
//Permite cambiar un valor de un observable a otro

form: FormGroup
mod: boolean = false;
instrumentos: Instrumento[] = []

constructor(private servicio:MiServicioService){
  this.form = new FormGroup({

    'id': new FormControl(0),
    'nombre': new FormControl(''),
    'precio': new FormControl(0),
    'marca': new FormControl('')

  })
}
  ngOnInit(): void {

    this.servicio.cambio.subscribe(data => {this.instrumentos = data})
    
    this.servicio.obtenerTodos().subscribe(data => {
     this.instrumentos = data
    })
  }



  alta(){

    
    
    let instrumento: Instrumento = {

      'id': this.form.value['id'],
      'nombre': this.form.value['nombre'],
      'precio': this.form.value['precio'],
      'marca': this.form.value['marca']
    }

    if(!this.mod){
     if(this.instrumentos.filter(elemento=> elemento.id === instrumento.id).length<1){
      this.servicio.insertar(instrumento)
    }else{
      console.log('elementos repetidos')
    }
    }else{
      this.servicio.modificar(instrumento)
      this.mod= false;
      
    }

    this.form.reset()
   
    
  }


  borrar(instrumento: Instrumento){
    this.servicio.eliminar(instrumento)
  }

  modificar(instrumento: Instrumento) {
    this.mod = true;
    
    this.form = new FormGroup({
      'id': new FormControl(instrumento.id),
      'nombre': new FormControl(instrumento.nombre),
      'precio': new FormControl(instrumento.precio),
      'marca': new FormControl(instrumento.marca)
    });
      
      
    
  }

  


}
