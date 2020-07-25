import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) { 
    console.log('Spotify listo')
  }

  getQuery( query: string) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAjvqbOfa-TBC7CuVHBxe4IaLfnJR3Y_5cU5jxzXQ1G2cfYT8NUN0SkMA7eKCaMpy-R7uOX_-j-72ObYX0'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?country=US&limit=15')
      .pipe( map( data => data['albums'].items));
    
  }

  getArtistas(termino: string) {

    return this.getQuery(`search?q=${ termino }&type=artist&market=US&limit=15`)
      .pipe( map( data => data['artists'].items));

    
  }

  getArtista(id: string) {

    return this.getQuery(`artists/${id}`);
      //.pipe( map( data => data['artists'].items));
      
  }


  getTopTracks(id: string) {

    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe( map( data => data['tracks']));
      
  }
}
