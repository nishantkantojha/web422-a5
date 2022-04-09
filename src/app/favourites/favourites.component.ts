import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: Array<any> = [];
  private getFavouritesSub: any;
  private removeFromFavouritesSub: any;

  constructor(private musicDataService: MusicDataService) {}

  ngOnInit() {
    this.getFavouritesSub = this.musicDataService
      .getFavourites()
      .subscribe((data) => {
        console.log(data.tracks.length);
        this.favourites = data.tracks;
      });
  }

  removeFromFavourites(trackID: string) {
    this.removeFromFavouritesSub = this.musicDataService
      .removeFromFavourites(trackID)
      .subscribe((data) => (this.favourites = data.tracks));
  }

  removeAllTracksFromFavourites() {
    this.favourites.forEach((f) => {
      this.removeFromFavouritesSub = this.musicDataService
        .removeFromFavourites(f.id)
        .subscribe((data) => (this.favourites = data.tracks));
    });
  }

  ngOnDestroy() {
    this.getFavouritesSub.unsubscribe();
    //this.removeFromFavouritesSub.unsubscribe();
  }
}
