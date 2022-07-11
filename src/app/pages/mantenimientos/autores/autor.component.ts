import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Autor } from '../../../models/autor.model';
import { AutorService } from '../../../services/autor.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styles: [
  ]
})
export class AutorComponent implements OnInit {

  public autorForm!: FormGroup;
  public autorSeleccionado: Autor | any;

  public submitted: boolean = false;

  constructor(private fb: FormBuilder, public autorService: AutorService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    
    this.activatedRoute.params.subscribe( ({id}) =>{
      this.cargarAutor(id);
     
    })


    this.autorForm = this.fb.group({
       nombre: ['', Validators.required],
       apellido: ['', Validators.required],
    });

  }

   campo( campo: string) {

    return this.autorForm.get(campo);
    
   }
  
   addclass(iddiv: any, idinput: any, field: any) {



    const div = document.querySelector(`#${iddiv}`);
    const input = document.querySelector(`#${idinput}`);

   
  
    // console.log(this.campo(field)?.errors);

    // console.log(this.campo(field));

    if (this.campo(field)?.errors?.['required']) {
      


      div?.classList.remove('has-success');
      input?.classList.remove('form-control-success');


      div?.classList.add('has-danger');


      input?.classList.add('form-control-danger');

  

      // this.imprimirAlerta('El primer nombre es requerido', 'error', input);

      return true;

    }
    else {


      
      div?.classList.remove('has-danger');
      input?.classList.remove('form-control-danger');

      div?.classList.add('has-success');
      input?.classList.add('form-control-success');

      return false;

    }
       
  }
  
     
  onReset() {
    
        this.submitted = false;
        this.autorForm.reset();
  }


  guardarAutor() {
    

    this.submitted = true;

    console.log(this.autorForm.value);

    // stop here if form is invalid
    if (this.autorForm.invalid) {
        return;
    }

    const {nombre} = this.autorForm.value;

    if(this.autorSeleccionado){
      // Modo edicion
      
      const data = {
        ...this.autorForm.value,
        id: this.autorSeleccionado.id
      }


      this.autorService.actualizarAutor(data)
          .subscribe(resp => {
            console.log(resp);
            Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
            this.router.navigateByUrl('/dashboard/autores');
          })
    }
    else {

        console.log('entrando al else..');

          
          this.autorService.crearAutor(this.autorForm.value)
            .subscribe((resp: any) => {
                
              
                  
                  Swal.fire('Autor Creado', `${nombre} creado correctamente`, 'success');
                  this.router.navigateByUrl('/dashboard/autores');
            
     
              },
                error => {
                  Swal.fire('Error', 'Ha ocurido un error ver logs', 'error');
              })

    }

  }

  cargarAutor(id: string){
    if(id === 'nuevo') {
      return;
    }

    this.autorService.obtenerAutorPorId(id)
        .subscribe(autor => {

          if(!autor){
            this.router.navigateByUrl(`/dashboard/autores`)
            return;
          }

          const  {
            nombre, 
            apellido} = autor;
          this.autorSeleccionado = autor;
          this.autorForm.setValue({nombre, apellido});
        })
  }
}
