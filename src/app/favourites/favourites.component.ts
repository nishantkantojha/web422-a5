import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  private favouriteSubscription: Subscription | undefined;
  private removeSubscription: Subscription | undefined;

  favourites: Array<any> = [];



  constructor(private musicData: MusicDataService) {
  }

  ngOnInit(): void {
    this.favouriteSubscription = this.musicData.getFavourites().subscribe(data=>{
      this.favourites = data.tracks;
    });
  }

  removeFromFavourites(id: string){
    this.removeSubscription = this.musicData.removeFromFavourites(id).subscribe(data=>{
      this.favourites = data.tracks;
    });

  }

  ngOnDestroy(): void{
    this.favouriteSubscription?.unsubscribe();
    this.removeSubscription?.unsubscribe();
  }

}
