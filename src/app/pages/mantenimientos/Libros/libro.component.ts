import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Libro } from '../../../models/libro.model';
import { LibroService } from '../../../services/libro.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Autor } from '../../../models/autor.model';
import { AutorService } from '../../../services/autor.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styles: [
  ]
})
export class LibroComponent implements OnInit {

  public libroForm!: FormGroup;
  public libroSeleccionado: Libro | any;

  public autoresSeleccionar!: Autor[];

  public submitted: boolean = false;

  constructor(private fb: FormBuilder, public libroService: LibroService, private router: Router,
    private activatedRoute: ActivatedRoute, private autorService: AutorService) { }

  ngOnInit(): void {

       
    this.cargarAutores();

    this.activatedRoute.params.subscribe( ({id}) =>{
      this.cargarLibro(id);
     
    })


    this.libroForm = this.fb.group({
       titulo: ['', Validators.required],
      precio: ['', Validators.required],
       autor: []
    });

  }

  cargarAutores() {
     this.autorService.cargarAutores() // aca sin paginar
      .subscribe(autores => {
        console.log(autores);
        this.autoresSeleccionar = autores;
      })
   }

   campo( campo: string) {

    return this.libroForm.get(campo);
    
   }
  
   addclass(iddiv: any, idinput: any, field: any) {



    const div = document.querySelector(`#${iddiv}`);
    const input = document.querySelector(`#${idinput}`);


    if (this.campo(field)?.errors?.['required']) {
      


      div?.classList.remove('has-success');
      input?.classList.remove('form-control-success');
      div?.classList.add('has-danger');
      input?.classList.add('form-control-danger');

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
        this.libroForm.reset();
  }


  guardarLibro() {
    

    this.submitted = true;

    console.log(this.libroForm.value);

    // stop here if form is invalid
    if (this.libroForm.invalid) {
        return;
    }

    const {titulo} = this.libroForm.value;

    if(this.libroSeleccionado){
      // Modo edicion
      
      const data = {
        ...this.libroForm.value,
        id: this.libroSeleccionado.id
      }


      this.libroService.actualizarLibro(data)
          .subscribe(resp => {
            console.log(resp);
            Swal.fire('Actualizado', `${titulo} actualizado correctamente`, 'success');
            this.router.navigateByUrl('/dashboard/libros');
          })
    }
    else {

        console.log('entrando al else..');


          console.log()
          
          this.libroService.crearLibro(this.libroForm.value)
            .subscribe((resp: any) => {
                
              
                  
                  Swal.fire('Libro Creado', `${titulo} creado correctamente`, 'success');
                  this.router.navigateByUrl('/dashboard/libros');
            
     
              },
                error => {
                  Swal.fire('Error', 'Ha ocurido un error ver logs', 'error');
              })

    }

  }

  cargarLibro(id: string){
    if(id === 'nuevo') {
      return;
    }

    this.libroService.obtenerLibroPorId(id)
        .subscribe(libro => {

          if(!libro){
            this.router.navigateByUrl(`/dashboard/libros`)
            return;
          }

          const  {
            titulo, 
            precio,
            autor} = libro;
          this.libroSeleccionado = libro;
          this.libroForm.setValue({titulo, precio, autor});
        })
  }

}
