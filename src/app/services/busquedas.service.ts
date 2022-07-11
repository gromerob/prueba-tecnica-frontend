import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


const base_url = 'http://localhost:8080/tecnica'

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }


  buscarAutor(termino: string){
    const url = `${base_url}/autores/filtrar/${termino}`;
    return this.http.get<any[]>(url)
                .pipe(
                  map((resp: any) => { 
                    return resp.autores;
                  })
                )
  }

  buscarLibro(termino: string){
    const url = `${base_url}/libros/filtrar/${termino}`;
    return this.http.get<any[]>(url)
                .pipe(
                  map((resp: any) => { 
                    return resp.libros;
                  })
                )
  }


}
