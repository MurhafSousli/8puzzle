import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {AiService} from "../ai/ai.service";

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {

  constructor(private aiService: AiService) {
  }

  ngOnInit() {
  }

  getStyles(node) {
    return {
      top: node.location.top + 'px',
      left: node.location.left + 'px',
      width: this.aiService.nodeWidth + 'px',
      height: this.aiService.nodeWidth + 'px',
      visibility: (node.isBlank) ? 'hidden' : 'visible',
    };

  }

  nodeClick(node){
    this.aiService.move(node);
  }


}

