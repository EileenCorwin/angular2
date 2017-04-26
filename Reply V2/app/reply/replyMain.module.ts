//Angular modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

//PrimeNG modules
import { AutoCompleteModule } from 'primeng/primeng';
import {AccordionModule} from 'primeng/primeng';
import {SharedModule} from 'primeng/primeng';

//App components
import { HeaderComponent }  from './shared/header/header.component';
import { FooterComponent }  from './shared/footer/footer.component';
import { CarouselComponent }  from './shared/carousel/carousel.component';
import { ReplyListComponent }  from './list/replyList.component';
import { ReplyCreateComponent }  from './create/replyCreate.component';
import { ReplyConfirmComponent }  from './confirm/replyConfirm.component';

//Main component for this module
import { ReplyMainComponent } from './replyMain.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    
    AutoCompleteModule, AccordionModule, SharedModule
  ],
  declarations: [
    ReplyMainComponent,

    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    ReplyListComponent,
    ReplyCreateComponent,
    ReplyConfirmComponent
  ],
  exports: [ ReplyMainComponent ]
})

export class ReplyMainModule { }
