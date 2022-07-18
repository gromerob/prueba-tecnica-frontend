import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AutoresComponent } from './mantenimientos/autores/autores.component';
import { AutorComponent } from './mantenimientos/autores/autor.component';
import { LibrosComponent } from './mantenimientos/Libros/libros.component';
import { LibroComponent } from './mantenimientos/Libros/libro.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    NopagefoundComponent,
    AutoresComponent,
    AutorComponent,
    LibrosComponent,
    LibroComponent    
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
