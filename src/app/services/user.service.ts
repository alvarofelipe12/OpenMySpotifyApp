import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    /**
     * get the detail's user profile from spotify
     */
    public getUserProfile() {
        const url = 'https://api.spotify.com/v1/users/' + '12124313683';
        return this.http.get(url);
    }

    public login() {
        // const scopes = 'user-read-private user-read-email';
        const url = 'https://accounts.spotify.com/authorize?client_id=d19fb7ab5cc04272b21de97a8486aae0&response_type=code&redirect_uri=http://localhost:4200/home&scope=user-read-private';
        return this.http.get(url);
    }

    public checkToken() {
        if (localStorage.getItem('spotify-token')) {
            return localStorage.getItem('spotify-token');
        } else {
            return null;
        }
    }
}
