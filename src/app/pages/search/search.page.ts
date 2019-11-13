import { Component, OnInit } from '@angular/core';
import { TracksService } from 'src/app/services/tracks.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    /**
     * Stores tracks
     */
    public tracks: any[];

    /**
     * status to Show a loader or not
     */
    public loading: boolean;

    /**
     * Status to show a landing messsage or not
     */
    public landingMessage: boolean;

    constructor(
        private tracksService: TracksService
    ) {
        this.landingMessage = true;
    }

    ngOnInit() {
    }

    /**
     * Let the user search a song, but if its empty it shows
     * the landing message
     * @param term string to search as a song
     */
    public search(term: string) {
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
