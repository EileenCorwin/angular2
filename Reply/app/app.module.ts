import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AutoCompleteModule } from 'primeng/primeng';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './home.component';
import { HeaderComponent }  from './header.component';
import { FooterComponent }  from './footer.component';
import { ReplyListComponent }  from './reply-list.component';
import { ReplyCreateComponent }  from './reply-create.component';
import { CarouselComponent }  from './carousel.component';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AutoCompleteModule,

    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ReplyListComponent,
    ReplyCreateComponent,
    CarouselComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
