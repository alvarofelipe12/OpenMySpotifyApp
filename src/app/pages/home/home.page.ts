import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScopesBuilder } from 'src/app/utils/scope-builder';
import { User } from 'src/app/entities/user.entity';
import { UserService } from 'src/app/services/user.service';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

    /**
     * Store the user data from service
     */
    public userData: User;

    /**
     * Store the playlist's user
     */
    public playlists: any[];


    public isLogged: boolean;

    private subscriptionLoginCallback: Subscription;

    constructor(
        private userService: UserService,
        private playlistsService: PlaylistsService,
        private router: Router,
        private auth: AuthService
    ) {
        this.isLogged = false;
    }

    ngOnInit() {
        this.initHome();
        this.subscriptionLoginCallback = this.auth.callback$.subscribe(() => {
            this.initHome();
        });
    }

    ngOnDestroy() {
        this.subscriptionLoginCallback.unsubscribe();
    }

    /**
     * Detects if the user is logged to run some taks
     */
    private initHome() {
        this.isLogged = Boolean(this.userService.checkToken());
        if (this.isLogged) {
            this.getUserProfile();
            this.getPlaylists();
        }
    }

    /**
     * get the detail's user profile from spotify
     */
    private getUserProfile() {
        this.userService.getUserProfile().subscribe((respUserProfile: User) => {
            this.userData = respUserProfile;
        });
    }

    /**
     * get all the playlists from the user
     */
    private getPlaylists() {
        this.playlistsService.getPlaylists().subscribe((resp: { items: any[] }) => {
            this.playlists = resp.items;
        });
    }

    /**
     * Open the detail page
     * @param playlist object with all the values of the playlist
     */
    public goToDetail(playlist: any) {
        this.router.navigate(['/playlist-detail', playlist.id]);
    }

    /**
     * Let the user log in
     */
    public login(): void {
        const scopes = new ScopesBuilder()/* .withScopes(ScopesBuilder.LIBRARY) */.build();
        const ac: any = {
            client_id: 'e0f1a095c3524b97b0b373b5c8e73ccc',  // WebPortal App Id. Shoud be config
            response_type: 'token',
            redirect_uri: 'http://localhost/callback',  // My URL
            state: '',
            show_dialog: true,
            scope: scopes
        };
        this.auth.configure(ac).authorize();
        this.isLogged = true;
    }

}
