import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify listo')
  }

  getQuery(query: string) {

    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQD6Syh8nNr27P29fmjRgRrL09Shd4qmSm3fpcRa3pyTn7muYNMInTTtzmo-bkZ-95mRqWGK7Eh1Ug0HHxY1Grm8WTGZYNU1HlMPFQW2OudhavaPCx297ABHZsPP5yQYzIN2YDQu0Ig_HS3N10XBFuIZm8TE04VU3iPoa6sGLkkKxNcNZw3NrmifnNmA5_cnBpw9jfSUHhzTseMWhvWcm8Bt7tNKVQ2_02Q5n9khJaTFGUtE42VMg3M8ZFELSlqM4_7ytl66au057OmM1-_lNg'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?country=US&limit=15')
      .pipe(map(data => data['albums'].items));

  }

  getArtistas(termino: string) {

    return this.getQuery(`search?q=${termino}&type=artist&market=US&limit=15`)
      .pipe(map(data => data['artists'].items));


  }

  getArtista(id: string) {

    return this.getQuery(`artists/${id}`);
    //.pipe( map( data => data['artists'].items));

  }


  getTopTracks(id: string) {

    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map(data => data['tracks']));

  }
}
