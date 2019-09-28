import { Component, OnInit } from '@angular/core';
import { MessageModel, MessageType } from '../../../../Services/shared/models/message-model';
import { GlobalService } from '../../../../Services/shared/global.service';

@Component({
  selector: 'app-global-component',
  templateUrl: './global-component.component.html',
  styleUrls: ['./global-component.component.css']
})
export class GlobalComponentComponent implements OnInit {
  messages: MessageModel[] = [];
  currentMessage: MessageModel = new MessageModel();
  loadings = new Array<boolean>();
  loading: boolean = false;
  timeShowMessage = 4500;

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.getMessage().subscribe((message: MessageModel) => {
      if (!message) {
        this.messages = [];
        return;
      }
      this.messages.push(message);
      if (message.isModalContainer) {
        setTimeout(() => this.currentMessage = message, 10);
      } else {
        setTimeout(() => message.isVisible = true, 10);
        setTimeout(() => setTimeout(this.removeMessage(message)), this.timeShowMessage);
      }
    });

    this.globalService.getLoader().subscribe((isLoading: boolean) => {
      if (isLoading) {
        this.loadings.push(isLoading);
      } else {
        this.loadings.pop();
      }
      if (this.loadings.length == 0) {
        this.loadings = new Array<boolean>();
        this.loading = false;
      } else {
        this.loading = true;
      }
    });
  }

  removeMessage(message: MessageModel) {
    message.isVisible = false;
    if (message.isModalContainer) {
      this.messages = this.messages.filter(x => x !== message);
      if (this.messages.length != 0) {
        this.currentMessage = this.messages[0];
      }
    } else {
      setTimeout(() => this.messages = this.messages.filter(x => x !== message), 400);
    }
  }

  cssClass(message: MessageModel) {
    if (!message) {
      return;
    }
    switch (message.type) {
      case MessageType.Success:
        return 'success';
      case MessageType.Error:
        return 'danger';
      case MessageType.Info:
        return 'info';
      case MessageType.Warning:
        return 'warning';
    }
  }

  showAlert($event) {
    console.log($event);
  }
}
