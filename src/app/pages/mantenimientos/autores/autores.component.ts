import { Component, OnInit } from '@angular/core';
import { Autor } from '../../../models/autor.model';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../../services/busquedas.service';
import { AutorService } from '../../../services/autor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styles: [
  ]
})
export class AutoresComponent implements OnInit {

  public cargando : boolean = true;
  public autores: Autor[] = [];




  constructor(public autorService: AutorService, private activatedRoute: ActivatedRoute,  private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this.cargarAutores();
    
  }

  buscar(termino: string){
    console.log(termino);

    if(termino.length == 0){
      this.cargarAutores();
       return;
    }
    this.busquedasService.buscarAutor(termino)
        .subscribe((resp: any) => {
          console.log(resp);
          this.autores = resp;
        })
  }

  cargarAutores() {


    this.cargando = true;
    this.autorService.cargarAutores()
      .subscribe((autores: any) => {
          console.log(autores);
          this.cargando = false;
          this.autores = autores

        })
  }

  borrarAutor(autor: Autor){

    Swal.fire({
      title: '¿Borrar Autor?',
      text: `Esta a punto de borrar a ${autor.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.autorService.borrarAutor(autor.id)
            .subscribe((resp: any) => {
              Swal.fire('Autor borrado', `${autor.nombre} fue eliminado correctamente`, 'success')
              this.cargarAutores();
            });

      }
    })

  }

}
