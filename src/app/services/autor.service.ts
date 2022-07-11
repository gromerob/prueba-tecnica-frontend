import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Autor } from '../models/autor.model';

const base_url = 'http://localhost:8080/tecnica'

@Injectable({
  providedIn: 'root'
})
export class AutorService {




  constructor(private http: HttpClient, private router: Router) { }

  



  cargarAutores(){

    const url = `${base_url}/autores`;

    return this.http.get(url)
                .pipe(
                  map( (resp: any) => resp.autores),
                  catchError(e => {
                    return throwError(e)
                  })
                );
  }



  crearAutor(autor: any){

    const url = `${base_url}/autores`;

    return this.http.post(url, autor)
                .pipe(
                  map((resp: any) => {
                    return resp;
                  }),
                  catchError(e => {
                 
                    return throwError(e)
                  })
                )
  }

  obtenerAutorPorId(id: string){

    const url = `${base_url}/autores/${id}`;

    return this.http.get(url, )
                .pipe(
                  map( (resp: any) => resp.autor),
                  catchError(e => {
                   
                    return throwError(e)
                  })
                )
  }

  actualizarAutor(autor: Autor){

    const url = `${base_url}/autores/${autor.id}`;

    return this.http.put(url, autor).pipe(
      catchError(e => {
        return throwError(e)
      })
    );
  }

    borrarAutor(_id: any){

    const url = `${base_url}/autores/${_id}`;

    return this.http.delete(url);
  }
  
}
