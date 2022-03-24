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
  //album = albumData;
  id: any;
  album: SpotifyApi.SingleAlbumResponse | any;

  private albumByIdSub: any;

  constructor(
    private route: ActivatedRoute,
    private data: MusicDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    //this.id = this.route.snapshot.params['id'];
    this.route.paramMap.subscribe((p) => {
      this.id = p.get('id');
    });

    this.albumByIdSub = this.data
      .getAlbumById(this.id)
      .subscribe((data) => (this.album = data));
  }

  addToFavourites(trackID: string) {
    if (this.data.addToFavourites(trackID)) {
      let snackBarRef = this.snackBar.open('Adding to Favourites...', 'Done', {
        duration: 1500,
      });
    }
  }

  ngOnDestroy() {
    this.albumByIdSub.unsubscribe();
  }
}
