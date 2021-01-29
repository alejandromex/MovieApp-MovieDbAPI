import { Component, HostListener, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { CarteleraResponse, Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public peliculas: Movie[] = [];
  public peliculasSlideshow: Movie[] = [];
  
  @HostListener('window:scroll',['$event'])
  onScroll()
  {

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    if(pos > max)
    {
      this.peliculaService.getCartelera().subscribe(
        response =>{
          this.peliculas.push(...response);
        }
      )
    }
  }

  constructor(private peliculaService: PeliculasService) { }

  ngOnInit(): void {
    this.peliculaService.getCartelera().subscribe(
      response =>{
        this.peliculas = response;
        this.peliculasSlideshow = response;

      },
      error =>{
        console.log(error);
      }
    )
  }

}
