import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: [ `./header.component.css`, '../replyShared.css' ]
})
export class HeaderComponent {
  @Output() setVisibleComponent = new EventEmitter<string>();
  visibleComponent: string;

  /* Controls which component is visible */
  onMenuSelection(_visibleComponent: string){
    this.setVisibleComponent.emit(_visibleComponent);

    /* menu selections don't act like regular active anchor tags because these anchor tags are not URL redirects
       need to change font color for selected and not selected menu options */
    let selectedColor: string = "white";
    let elementId: string = "a-" + _visibleComponent;
    
    // set color for selected menu option
    let origColor: string = document.getElementById(elementId).style.color;
    document.getElementById(elementId).style.color = selectedColor;
    document.getElementById(elementId).blur();

    // set color for not selected menu options (only if selected was not already the selected menu option)
    if (origColor != selectedColor) {
      if (elementId != "a-main") {document.getElementById("a-main").style.color = origColor;}
      if (elementId != "a-list") {document.getElementById("a-list").style.color = origColor;}
      if (elementId != "a-create") {document.getElementById("a-create").style.color = origColor;}
    }
  } //onMenuSelection
  
} //export
