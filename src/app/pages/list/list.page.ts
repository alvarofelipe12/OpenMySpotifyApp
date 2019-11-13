import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

    /**
     * Stores all the playlist data
     */
    public playlistData: any;

    /**
     * Store the id's playlist
     */
    private idPlaylist: string;

    /**
     * Status of player
     */
    public playing: boolean;

    /**
     * Store's media object played
     */
    public currentTrack: MediaObject;

    constructor(
        private playlistsService: PlaylistsService,
        private route: ActivatedRoute,
        private media: Media,
        private changeRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.idPlaylist = this.route.snapshot.paramMap.get('id');
        this.getPlaylistDetail();
    }

    /**
     * get the details of the playlist selected
     */
    private getPlaylistDetail() {
        this.playlistsService.getPlaylistDetail(this.idPlaylist).pipe(finalize(() => {
            this.changeRef.detectChanges();
        }))
            .subscribe(resp => {
                this.playlistData = resp;
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
