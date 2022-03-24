import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MusicDataService {
  constructor(
    private spotifyToken: SpotifyTokenService,
    private http: HttpClient
  ) {}

  favouritesList: Array<any> = [];

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>(
          'https://api.spotify.com/v1/browse/new-releases',
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  getArtistById(id: any): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.SingleArtistResponse>(
          `https://api.spotify.com/v1/artists/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  getAlbumsByArtistId(id: any): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(
          `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  getAlbumById(id: any): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.SingleAlbumResponse>(
          `https://api.spotify.com/v1/albums/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  searchArtists(
    searchString: string
  ): Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<SpotifyApi.ArtistSearchResponse>(
          `https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }

  addToFavourites(id: string): boolean {
    if (!id || this.favouritesList.length >= 50) {
      return false;
    }

    this.favouritesList.push(id);
    return true;
  }

  removeFromFavourites(id: string): Observable<any> {
    // let i = this.favouritesList.indexOf(id);
    // if (i >= 0) {
    //   this.favouritesList.splice(i, 1);
    // }
    this.favouritesList.splice(this.favouritesList.indexOf(id), 1);
    return this.getFavourites();
  }

  getFavourites(): Observable<any> {
    //console.log(this.favouritesList.length);
    if (this.favouritesList.length <= 0) {
      return new Observable((o) => {
        o.next([]);
      });
    }

    return this.spotifyToken.getBearerToken().pipe(
      mergeMap((token) => {
        return this.http.get<any>(
          `https://api.spotify.com/v1/tracks?ids=${this.favouritesList.join()}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      })
    );
  }
}
