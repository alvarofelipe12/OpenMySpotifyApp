import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private requestAuthUrl = 'https://accounts.spotify.com/authorize';

    private authorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private callbackSource: BehaviorSubject<void>;

    public callback$: Observable<void>;

    private authConfig: {
        client_id: string,  // WebPortal App Id. Shoud be config
        response_type: string,
        redirect_uri: string,  // My URL
        state: string,
        show_dialog: boolean,
        scope: string[]
    };

    private browser: InAppBrowserObject;

    constructor(
        private iab: InAppBrowser
    ) {
        this.callbackSource = new BehaviorSubject(null);
        this.callback$ = this.callbackSource.asObservable();
    }

    /**
     * Navigates to the auth page
     */
    public authorize() {
        this.browser = this.iab.create(this.buildAuthUrl());
        // The loadstart event runs everytime is loaded a page in the inappbrowser
        this.browser.on('loadstart').subscribe((event: any) => {
            // Check for the callback
            if ((event.url).startsWith('http://localhost/callback')) {
                const hash = event.url;

                if (hash.substring(1).indexOf('error') !== -1) {
                    // login failure
                    this.browser.close();
                } else if (hash) {
                    // login success
                    const token = hash.split('&')[0].split('=')[1];
                    localStorage.setItem('spotify-token', token);
                    this.callbackSource.next();
                    this.browser.close();
                }
            }
        });
    }

    /**
     * Signal someone, that router can navigate somewhere
     */
    public authorized(): void {
        console.log('Called auth');
        this.authorized$.next(true);
    }

    public get authorizedStream(): Observable<boolean> {
        return this.authorized$.asObservable();
    }

    public configure(config: any): AuthService {
        // Validate Config
        this.authConfig = config;
        return this;
    }

    private buildAuthUrl(): string {

        const params = [];
        for (const [key, value] of Object.entries(this.authConfig)) {
            if (typeof (value) === 'object') {
                params.push(`${key}=${(value as string[]).join(' ')}`);
            } else {
                params.push(`${key}=${value}`);
            }
        }
        return `${this.requestAuthUrl}?${params.join('&')}`;
    }
}
