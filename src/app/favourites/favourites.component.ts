import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
//import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favourites: Array<any> = [];
  private getFavouritesSub: any;
  private removeFromFavouritesSub: any;

  constructor(private data: MusicDataService) {}

  ngOnInit() {
    this.getFavouritesSub = this.data
      .getFavourites()
      .subscribe((data) => (this.favourites = data.tracks));
  }

  removeFromFavourites(trackID: string) {
    this.removeFromFavouritesSub = this.data
      .removeFromFavourites(trackID)
      .subscribe((data) => (this.favourites = data.tracks));
  }

  ngOnDestroy() {
    this.getFavouritesSub.unsubscribe();
    this.removeFromFavouritesSub.unsubscribe();
  }
}
