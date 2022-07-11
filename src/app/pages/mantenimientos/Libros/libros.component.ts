import { Component, OnInit } from '@angular/core';
import { Libro } from '../../../models/libro.model';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { LibroService } from '../../../services/libro.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styles: [
  ]
})
export class LibrosComponent implements OnInit {

  public cargando : boolean = true;
  public libros: Libro[] = [];




  constructor(public libroService: LibroService, private activatedRoute: ActivatedRoute,  private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this.cargarLibros();
    
  }

  buscar(termino: string){
    console.log(termino);

    if(termino.length == 0){
      this.cargarLibros();
       return;
    }
    this.busquedasService.buscarLibro(termino)
        .subscribe((resp: any) => {
          console.log(resp);
          this.libros = resp;
        })
  }

  cargarLibros() {


    this.cargando = true;
    this.libroService.cargarLibros()
      .subscribe((libros: any) => {
          console.log(libros);
          this.cargando = false;
          this.libros = libros

        })
  }

  borrarLibro(libro: Libro){

    Swal.fire({
      title: '¿Borrar Libro?',
      text: `Esta a punto de borrar a ${libro.titulo}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.libroService.borrarLibro(libro.id)
            .subscribe((resp: any) => {
              Swal.fire('Libro borrado', `${libro.titulo} fue eliminado correctamente`, 'success')
              this.cargarLibros();
            });

      }
    })

  }
}
