import { Component, OnInit, Input } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';


@Component({
    selector: 'app-songs-list',
    templateUrl: './songs-list.component.html',
    styleUrls: ['./songs-list.component.scss'],
})
export class SongsListComponent implements OnInit {

    @Input() private tracks: any;

    /**
     * Status of player
     */
    public playing: boolean;

    /**
     * Store's media object played
     */
    public currentTrack: MediaObject;

    /**
     * Processed data to show in the view
     */
    public tracksProccessed: any[];

    constructor(
        private media: Media,
    ) {
        this.tracksProccessed = [];
    }

    ngOnInit() {
        this.tracks.items.forEach(element => {
            if (element.hasOwnProperty('track')) {
                this.tracksProccessed.push(element.track);
            } else {
                this.tracksProccessed = this.tracks.items;
                return;
            }
        });
    }



    /**
     * Plays a preview song
     * @param item song selected
     */
    play(item: string): void {
        this.playing = true;
        this.currentTrack = this.media.create(item);
        this.currentTrack.onSuccess.subscribe(() => {
            this.playing = false;
        });
        this.currentTrack.onError.subscribe(() => {
            this.playing = false;
        });
        this.currentTrack.play();
    }

    /**
     * Stop the played file
     */
    stop() {
        if (this.currentTrack) {
            this.currentTrack.stop();
            this.playing = false;
        }
    }
}
