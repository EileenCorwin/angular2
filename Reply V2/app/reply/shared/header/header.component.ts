import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: [ `./header.component.css` ]
})
export class HeaderComponent {
  @Output() setVisibleComponent = new EventEmitter<string>();

  visibleComponent: string;

  //Controls which component is visible
  onMenuSelection(_visibleComponent: string){
    this.setVisibleComponent.emit(_visibleComponent);
  }
  
}
