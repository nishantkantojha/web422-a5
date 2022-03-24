import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  results: any;
  searchQuery: string = '';
  private searchArtistsSub: any;

  constructor(private route: ActivatedRoute, private data: MusicDataService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((p) => {
      this.searchQuery = p['q'];
      console.log('comp: ' + this.searchQuery);
    });

    this.searchArtistsSub = this.data.searchArtists(this.searchQuery).subscribe(
      (data) =>
        (this.results = data.artists.items.filter(
          (t) => t.images.length > 0
          // (curValue, index, self) =>
          //   self.findIndex((t) => t.images.length > 0) === index
        ))
    );
  }

  ngOnDestroy() {
    this.searchArtistsSub.unsubscribe();
  }
}
