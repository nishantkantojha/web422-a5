import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {
  album:any;
  private albumIdSubscription: Subscription | undefined;
  private paramSubscription: Subscription | undefined;

  constructor(private musicData: MusicDataService, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.paramSubscription = this.activatedRoute.params.subscribe(id => {
      this.albumIdSubscription = this.musicData.getAlbumById(id['id']).subscribe(data => {
        this.album = data;
      });
    });
  }

  addToFavourites(trackID: string){
    if (this.musicData.addToFavourites(trackID)) {
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 })

    };
  }

  ngOnDestroy(): void{
    this.paramSubscription?.unsubscribe();
    this.albumIdSubscription?.unsubscribe();
  }


}
