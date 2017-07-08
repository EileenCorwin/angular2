import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReplyMainComponent }   from './reply/replyMain.component';

const routes: Routes = [
  { path: '', component: ReplyMainComponent },
  { path: 'home', component: ReplyMainComponent },
];
  

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
