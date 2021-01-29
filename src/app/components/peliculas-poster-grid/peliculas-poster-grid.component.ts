import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];

  constructor(
    private _router: Router
  ) { }

  
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    
  }

  detalle(id: number)
  {
    this._router.navigate(['/pelicula',id]);
  }

}
