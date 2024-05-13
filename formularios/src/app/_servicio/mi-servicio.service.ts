import { Injectable } from '@angular/core';
import { Instrumento } from '../_modelo/Instrumento';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiServicioService {

  
  instrumentos: Instrumento[];
  //subject: BehaviorSubject<Instrumento[]>
  
  cambio = new Subject<Instrumento[]>()
  


  constructor() {

    this.instrumentos = [
      {'id': 1, 'nombre': 'Batería', 'precio': 300, 'marca': 'Milleium'},
      {'id': 2, 'nombre': 'Guitarra', 'precio': 150, 'marca': 'Fender'},
    ]

   }

   


  
   obtenerTodos(): Observable<Instrumento[]>{


   this.cambio.next(this.instrumentos)
   return this.cambio.asObservable();

   }


   modificar(instrumento: Instrumento){

    this.instrumentos[instrumento.id-1] = instrumento;

    
 
    this.cambio.next(this.instrumentos)

   }
   

   insertar(instrumento: Instrumento){
    this.instrumentos.push(instrumento);


    this.cambio.next(this.instrumentos)
    
   }

   eliminar(instrumento: Instrumento){

    this.instrumentos = this.instrumentos.filter(elemento=> elemento.id != instrumento.id)

    this.cambio.next(this.instrumentos)
   }

}
