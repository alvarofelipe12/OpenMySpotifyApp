import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistsService } from 'src/app/services/playlists.service';
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

    constructor(
        private playlistsService: PlaylistsService,
        private route: ActivatedRoute,
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
}
