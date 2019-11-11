import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TracksService {

    constructor(
        private http: HttpClient
    ) { }

    public getTrack(id: string) {
        const url = 'https://api.spotify.com/v1/tracks/' + id;
        return this.http.get(url);
    }
}
