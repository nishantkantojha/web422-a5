import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  private querySubscription: Subscription | undefined;
  private artistsSubscription: Subscription | undefined;

  results: any;
  searchQuery: string= "";

  constructor(private musicData: MusicDataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySubscription = this.activatedRoute.queryParams.subscribe(parameter => {
      this.searchQuery = parameter['q'];

      this.artistsSubscription = this.musicData.searchArtists(this.searchQuery).subscribe(data=>{
        this.results = data.artists.items.filter(img=>img.images.length > 0);
      });
    });
  }

  ngOnDestroy(): void {
    this.querySubscription?.unsubscribe();
    this.artistsSubscription?.unsubscribe();
  }

}
