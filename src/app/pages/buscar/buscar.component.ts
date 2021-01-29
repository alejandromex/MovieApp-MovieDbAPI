import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public title: string;
  public peliculas: Movie[] = [];

  constructor(
      private route: ActivatedRoute,
      private peliculasService: PeliculasService
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.peliculasService.buscarPeliculas(params.texto).subscribe(
        response =>{
          this.title = params.texto;
          this.peliculas = response;
        },
        error =>{
          console.log(error);
        }
      )
    })
  }

}
