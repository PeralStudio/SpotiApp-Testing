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
      'Authorization': 'Bearer BQBccExJhyS7dkdN2sqsuTw_qYoNwwvQbDzP2o47M8qjnw65oJYg7zSl2I-XUH7OVm1EyxEi5Xe0ZJ_Cn6U' 
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
