import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';


@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  private paramSubscription: Subscription | undefined;
  private artistIdSubscription:  Subscription | undefined;
  private albumArtistSubscription:  Subscription | undefined;

  artist:any;
  albums:any;



  constructor(private musicData: MusicDataService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.paramSubscription = this.activatedRoute.params.subscribe(id=>{

      this.artistIdSubscription = this.musicData.getArtistById(id['id']).subscribe(artist=>{
        this.artist = artist
      });

      this.albumArtistSubscription = this.musicData.getAlbumsByArtistId(id['id']).subscribe(data => {
        this.albums = data.items.filter((curValue, index, self) => self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index)
      });
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.artistIdSubscription?.unsubscribe();
    this.albumArtistSubscription?.unsubscribe();
  }
}
