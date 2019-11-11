import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScopesBuilder } from '../utils/scope-builder';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private requestAuthUrl = 'https://accounts.spotify.com/authorize';
    private authorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private authConfig = {
        client_id: 'd19fb7ab5cc04272b21de97a8486aae0',  // WebPortal App Id. Shoud be config
        response_type: 'token',
        redirect_uri: 'http://localhost:4200/assets/callback.html',  // My URL
        state: '',
        show_dialog: true,
        scope: new ScopesBuilder().build()
    };

    public authorize() {
        window.location.href = this.buildAuthUrl();
    }

    // Signal someone, that router can navigate somewhere
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
