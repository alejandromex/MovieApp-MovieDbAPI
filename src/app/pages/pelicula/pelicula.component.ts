import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { Cast } from 'src/app/interfaces/credits-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: Movie;
  private peliculaId: number;
  public cast: Cast[] = [];


  constructor(private peliculaService: PeliculasService,
    private location: Location,
    private router: Router,
    private _route: ActivatedRoute) {
        this._route.params.subscribe(params => {
          this.peliculaId = params.id;
        })
     }

  ngOnInit(): void {

    this.peliculaService.getDetails(this.peliculaId).subscribe(
      response =>{
        if(response == null)
        {
          this.router.navigate(['/home']);
          return;
        }
        this.pelicula = response;
      },
      error =>{
        console.log(error);
      }
    )

    this.peliculaService.getCast(this.peliculaId).subscribe(
      cast =>{
        this.cast = cast;
      },
      error =>{
        console.log(error);
      }
    )
  }

  goBack(){
    this.location.back();
    console.log("Click");
  }

}
