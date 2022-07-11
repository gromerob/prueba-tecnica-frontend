import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any [] = [
  
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Autores', url: 'autores' },
        { titulo: 'Libros', url: 'libros' }        
      ]
    }
  ]

  constructor() { }
}
