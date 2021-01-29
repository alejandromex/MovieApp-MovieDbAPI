import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  public mySwiper;
  @Input() movies: Movie[];

  constructor() { }
  ngAfterViewInit(): void {
     this.mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      loop: true,
    
      
    });
  }
  
  ngOnInit(): void {
  }
  
  NextSlide()
  {
    this.mySwiper.slideNext();

  }

  PrevSlide()
  {
    this.mySwiper.slidePrev();
  }

}
