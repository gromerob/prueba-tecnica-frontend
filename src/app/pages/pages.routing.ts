import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AutoresComponent } from './mantenimientos/autores/autores.component';
import { AutorComponent } from './mantenimientos/autores/autor.component';
import { LibrosComponent } from './mantenimientos/Libros/libros.component';
import { LibroComponent } from './mantenimientos/Libros/libro.component';



const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
            {path: '', component: AutoresComponent, data: {titulo: 'Manteninimientos de Autores'}},
           
            
            // Autores y libros

            { path: 'autores', component: AutoresComponent, data: { titulo: 'Manteninimientos de Autores' } },
            {path: 'autor/:id', component: AutorComponent, data: {titulo: 'Manteninimientos de Autores'}  },
            { path: 'autor/nuevo', component: AutorComponent, data: { titulo: 'Manteninimientos de Autores' } },

            { path: 'libros', component: LibrosComponent, data: { titulo: 'Manteninimientos de Libros' } },
            {path: 'libro/:id', component: LibroComponent, data: {titulo: 'Manteninimientos de Libros'}  },
            { path: 'libro/nuevo', component: LibroComponent, data: { titulo: 'Manteninimientos de Libros' } },


        ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
