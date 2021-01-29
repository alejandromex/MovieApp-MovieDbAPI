import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  transform(poster: string): unknown {
    if(poster)
    {
      return "https:www.themoviedb.org/t/p/w300/"+poster;
    }
    else{
      return './assets/no-image.jpg';
    }
  }

}
//https://www.themoviedb.org/t/p/w500/{{movie.backdrop_path}}