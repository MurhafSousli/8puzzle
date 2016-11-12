import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ShareButtonsService} from "ng2-sharebuttons";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  shareDialog: boolean = false;

  constructor(share: ShareButtonsService){
    share.twitterAccount = 'MurhafSousli';
  }
}
