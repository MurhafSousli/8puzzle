import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router";
import {ShareButtonsModule} from "ng2-sharebuttons";

import {PuzzleService} from "./puzzle/puzzle.service";

import {AppComponent} from './app.component';
import {BoardComponent} from './board/board.component';
import {StoreModule} from "@ngrx/store";
import {stateReducer} from "./store/state.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {MenuComponent} from './menu/menu.component';
import {GalleryComponent} from './gallery/gallery.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {GameComponent} from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    GameComponent,
    BoardComponent,
    MenuComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'about', component: AboutComponent},
    ]),
    StoreModule.provideStore({state: stateReducer}),
    ShareButtonsModule
  ],
  providers: [
    PuzzleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
