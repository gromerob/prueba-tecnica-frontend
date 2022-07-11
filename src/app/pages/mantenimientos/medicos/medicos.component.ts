import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando : boolean = true;
  public imgSubs!: Subscription;


  constructor(private medicoService: MedicoService, private busquedaService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {

    this.cargarMedicos();

  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos()
        .subscribe(medicos => {
          console.log(medicos);
          this.cargando = false;
          this.medicos = medicos;
        });
  }

  buscar(termino: string){
    if(termino.length == 0){
       this.cargarMedicos();
       return;
    }

   
  }


  borrarMedico(medico: Medico){

    Swal.fire({
      title: '¿Borrar Medico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.medicoService.borrarMedico(medico._id || '')
            .subscribe(resp => {
              Swal.fire('Medico Borrado', `${medico.nombre} fue eliminado correctamente`, 'success')
              this.cargarMedicos();
            });

      }
    })

  }

}
