import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Libro } from '../models/libro.model';

const base_url = 'http://localhost:8080/tecnica'

@Injectable({
  providedIn: 'root'
})
export class LibroService {



  constructor(private http: HttpClient, private router: Router) { }

  



  cargarLibros(){

    const url = `${base_url}/libros`;

    return this.http.get(url)
                .pipe(
                  map( (resp: any) => resp.libros),
                  catchError(e => {
                    return throwError(e)
                  })
                );
  }



  crearLibro(libro: any){

    console.log(libro);

    const data = {
      titulo: libro.titulo,
      precio: libro.precio,
      autor: {
        id: Number(libro.autor)
      }
    }

    console.log(data);
    

    const url = `${base_url}/libros`;

    return this.http.post(url, data)
                .pipe(
                  map((resp: any) => {
                    return resp;
                  }),
                  catchError(e => {
                 
                    return throwError(e)
                  })
                )
  }

  obtenerLibroPorId(id: string){

    const url = `${base_url}/libros/${id}`;

    return this.http.get(url, )
                .pipe(
                  map( (resp: any) => resp.libro),
                  catchError(e => {
                   
                    return throwError(e)
                  })
                )
  }

  actualizarLibro(libro: Libro){

    const url = `${base_url}/libros/${libro.id}`;

    return this.http.put(url, libro).pipe(
      catchError(e => {
        return throwError(e)
      })
    );
  }

    borrarLibro(_id: any){

    const url = `${base_url}/libros/${_id}`;

    return this.http.delete(url);
  }
}
