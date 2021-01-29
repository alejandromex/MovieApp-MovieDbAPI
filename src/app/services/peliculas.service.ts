

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { catchError, map, tap } from 'rxjs/operators';
import { Cast, CreditsResponse } from '../interfaces/credits-response';

@Injectable({
    providedIn: 'root'
})
export class PeliculasService {

    private baseUrl: string = "https://api.themoviedb.org/3/";
    private carteleraPage = 1;
    public cargando: boolean = false;

    constructor(private _http: HttpClient)
    {

    }

    get params()
    {
        return {
            api_key: "dea065d643c4abec1c9ba62f089e3c3b",
            lenguage: "es-ES",
            page: this.carteleraPage.toString()
        }
    }

    getCartelera(): Observable<Movie[]>
    {
        
        if(this.cargando) 
        {
        return of([]);
        }
        this.cargando = true;
       return this._http.get<CarteleraResponse>(this.baseUrl+"movie/popular",{ params: this.params}).pipe(
           map((resp: CarteleraResponse) =>   resp.results ),
           tap( resp => {
                this.carteleraPage+=1;  
                this.cargando = false;
           })
       )
       //?api_key=dea065d643c4abec1c9ba62f089e3c3b&language=en-US&page=1    
    }

    buscarPeliculas(query: string): Observable<Movie[]>
    {
        const params = {...this.params, page: '1', query};
        return this._http.get<CarteleraResponse>(this.baseUrl+'search/movie', {params}).pipe(
            map((resp) =>  resp.results)
        );
    }

    getDetails(id: number): Observable<any>
    {
        const params = {...this.params, page:'1'};
        return this._http.get(this.baseUrl+'movie/'+id,{params}).pipe(
            catchError((err)=> of(null))
        )
        
    }

    getCast(id: number): Observable<Cast[]>
    {
        const params = {...this.params, page: '1'};
        return this._http.get<CreditsResponse>(this.baseUrl+'movie/'+id+'/credits', {params}).pipe(
            map((resp)=> resp.cast),
            catchError((err)=> of([]))
        )
    }

    //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

}