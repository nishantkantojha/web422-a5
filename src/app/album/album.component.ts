import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  id: any;
  album: SpotifyApi.SingleAlbumResponse | any;
  albumTracks: SpotifyApi.AlbumTracksResponse | any;

  private albumByIdSub: any;
  //private addToFavouritesSub: any;

  constructor(
    private route: ActivatedRoute,
    private musicDataService: MusicDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    //this.id = this.route.snapshot.params['id'];
    this.route.paramMap.subscribe((p) => {
      this.id = p.get('id');
    });

    this.albumByIdSub = this.musicDataService
      .getAlbumById(this.id)
      .subscribe((data) => (this.album = data));

    this.albumByIdSub = this.musicDataService
      .getAlbumTracksById(this.id)
      .subscribe((data) => {
        //data.items.map((i) => console.log('AlbumComponent: ' + i.id));
        this.albumTracks = data;
      });
  }

  addToFavourites(trackID: string) {
    //console.log(trackID);
    //this.addToFavouritesSub =
    this.musicDataService.addToFavourites(trackID).subscribe(
      (success) => {
        //console.log(success);
        let snackBarRef = this.snackBar.open(
          'Adding to Favourites...',
          'Done',
          {
            duration: 1500,
          }
        );
      },
      (err) => {
        let snackBarRef = this.snackBar.open(
          '"Unable to add song to Favourites...',
          'Done',
          {
            duration: 1500,
          }
        );
      }
    );

    // if (this.data.addToFavourites(trackID)) {
    //   let snackBarRef = this.snackBar.open('Adding to Favourites...', 'Done', {
    //     duration: 1500,
    //   });
  }

  addAllAlbumTracksToFavourites() {
    let success1: boolean = true;
    let addedtoFaves = [];
    let notAddedtoFaves = [];

    for (let i = 0; i < this.albumTracks.items.length; i++) {
      let element = this.albumTracks.items[i];
      let trackID = element.id;
      //this.addToFavouritesSub =
      this.musicDataService.addToFavourites(trackID).subscribe(
        (success) => {
          //console.log('trackID: ' + success);
          addedtoFaves.push(trackID);
        },
        (err) => {
          notAddedtoFaves.push(trackID);
          //console.log('trackID: ' + err);
          success1 = false;
        }
      );
    }

    if (addedtoFaves.length) {
      //console.log('trackID: ' + addedtoFaves.join());
      //let user = addedtoFaves.find((user: any) => user.id === query);
    }

    if (success1) {
      let snackBarRef = this.snackBar.open(
        'All tracks in this album were added to favourites...',
        'Done',
        {
          duration: 1500,
        }
      );
    }
  }

  ngOnDestroy() {
    this.albumByIdSub.unsubscribe();
    //this.addToFavouritesSub.unsubscribe();
  }
}
