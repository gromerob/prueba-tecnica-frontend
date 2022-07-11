import { Autor } from './autor.model';
export class Libro{

  constructor(
    public id: number,
    public titulo: string,
    public precio: number,
    public autor: Autor
  ) {}
}
