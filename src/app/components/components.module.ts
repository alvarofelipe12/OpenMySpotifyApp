import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { SongsListComponent } from './songs-list/songs-list.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SongsListComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [
        HeaderComponent,
        SongsListComponent
    ],
    entryComponents: [
    ]
})
export class ComponentsModule { }
