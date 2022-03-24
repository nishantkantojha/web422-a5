import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  id: any;
  artist: SpotifyApi.SingleArtistResponse | any;
  albums: SpotifyApi.ArtistsAlbumsResponse | any;

  private artistByIdSub: any;
  private albumsByArtistId: any;

  constructor(private route: ActivatedRoute, private data: MusicDataService) {}

  ngOnInit() {
    // this.id = this.route.snapshot.params['id'];
    // console.log(this.id);
    this.route.paramMap.subscribe((p) => {
      this.id = p.get('id');
    });

    this.artistByIdSub = this.data
      .getArtistById(this.id)
      .subscribe((data) => (this.artist = data));

    this.albumsByArtistId = this.data.getAlbumsByArtistId(this.id).subscribe(
      (data) =>
        // filter out duplicate album names
        (this.albums = data.items.filter(
          (curValue, index, self) =>
            self.findIndex(
              (t) => t.name.toUpperCase() === curValue.name.toUpperCase()
            ) === index
        ))
    );
  }

  ngOnDestroy() {
    this.artistByIdSub.unsubscribe();
    this.albumsByArtistId.unsubscribe();
  }
}
