import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {


  public medicoForm!: FormGroup;
  public medicoSeleccionado: Medico | any;

  constructor(private fb: FormBuilder,
              private medicoService: MedicoService, private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    // this.cargar2();

    this.activatedRoute.params.subscribe( ({id}) =>{
      this.cargarMedico(id);
     
    })
    // this.medicoService.obtenerMedicoPorId()

   

    this.medicoForm = this.fb.group({
      nombre: ['Giovanni', Validators.required],
      hospital: ['2', Validators.required],
    });

        
   

  }

  
  cargarMedico(id: string){

    if(id === 'nuevo') {
      return;
    }

    this.medicoService.obtenerMedicoPorId(id)
        .subscribe(medico => {

          if(!medico){
            this.router.navigateByUrl(`/dashboard/medicos`)
            return;
          }

          const {nombre, hospital: {_id}} = medico
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({nombre, hospital: _id})
        })
  }

  //  async cargar2(){
  //   this.hospitales =  await this.cargarHospitales();
  // }
  //  cargarHospitales(){
  //   return new Promise<any>(resolve =>{
  //     this.hospitalService.cargarHospitales()
  //     .subscribe( (hospitales) => {
  //       resolve(hospitales);
        
  //     })
  //   })
    

        
     
  // }

  guardarMedico(){

    const {nombre} = this.medicoForm.value;

    if(this.medicoSeleccionado){
      
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }


      this.medicoService.actualizarMedico(data)
          .subscribe(resp => {
            console.log(resp);
            Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
          })
    }
    else {
      
          this.medicoService.crearMedico(this.medicoForm.value)
              .subscribe((resp: any) => {
                Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
                this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
              })

    }

  }
  obtenerMedicoPorId(){

  }

  
}
