import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PlaylistsService {

    constructor(
        private http: HttpClient
    ) { }

    /**
     * get the detail's user profile from spotify
     */
    public getPlaylists() {
        const url = 'https://api.spotify.com/v1/users/' + '12124313683' + '/playlists';
        return this.http.get(url);
    }

    /**
     * get the detailed data from a playlist
     * @param idPlaylist id's playlist
     */
    public getPlaylistDetail(idPlaylist: string) {
        const url = 'https://api.spotify.com/v1/playlists/' + idPlaylist;
        return this.http.get(url);
    }
}
