import { Component, OnInit } from '@angular/core';

declare function customInitFuncionts(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {



  constructor( ) { }

  ngOnInit(): void {
    customInitFuncionts();

  }

}
