import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {BoardComponent} from './board/board.component';
import {AiService} from "./ai/ai.service";
import {StoreModule} from "@ngrx/store";
import {stateReducer} from "./store/state.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({state: stateReducer}),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [
    AiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
