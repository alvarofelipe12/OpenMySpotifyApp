import { Component, OnInit } from '@angular/core';
import { TracksService } from 'src/app/services/tracks.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
    tracks: any[];
    loading: boolean;
    landingMessage: boolean;
    constructor(
        private tracksService: TracksService
    ) {
        this.landingMessage = true;
    }

    ngOnInit() {
    }

    buscar(term: string) {
        if (term !== '') {
            this.loading = true;
            this.landingMessage = false;
            this.tracksService.searchTrack(term)
                .pipe(finalize(() => {
                    this.loading = false;
                }))
                .subscribe((data: any) => {
                    if (!data.error) {
                        this.tracks = data.tracks;
                    } else {
                        this.tracks = [];
                    }
                });
            return;
        }
        this.loading = false;
        this.landingMessage = true;
        this.tracks = [];
    }

}
