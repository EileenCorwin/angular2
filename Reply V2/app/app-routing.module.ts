import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReplyMainComponent }   from './reply/replyMain.component';
// import { ReplyListComponent }   from './reply-list.component';
// import { ReplyCreateComponent }  from './reply-create.component';
// import { CarouselComponent }  from './carousel.component';

const routes: Routes = [
  { path: '', component: ReplyMainComponent },
  { path: 'home', component: ReplyMainComponent },
  // { path: 'replylist',  component: ReplyListComponent },
  // { path: 'replycreate',  component: ReplyCreateComponent }
];
  

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
