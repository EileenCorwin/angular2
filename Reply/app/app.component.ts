//Angular modules
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    
    <div class="container-fluid">
    <router-outlet></router-outlet>
    </div>
    
    `
})
export class AppComponent {
  
}
