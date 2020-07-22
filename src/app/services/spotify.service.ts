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
      'Authorization': 'Bearer BQBF8hq1L3hKD72Xn4tOD10CRN9rp2tCHwSQbYtM0YCJ_JABg5wwu3-ceEQlRGCHo2qK0ELm7DD-FimeupA'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
      .pipe( map( data => data['albums'].items));
    
  }

  getArtista(termino: string) {

    return this.getQuery(`search?q=${ termino }&type=artist&market=ES&limit=15`)
      .pipe( map( data => data['artists'].items));

    
  }
}
