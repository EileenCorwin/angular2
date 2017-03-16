//Angular modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule }   from '@angular/forms'; --was for template model
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service'; 

//PrimeNG modules
import { AutoCompleteModule } from 'primeng/primeng';

//App modules
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
    // FormsModule, --was for template model
    BrowserModule, ReactiveFormsModule,
    AutoCompleteModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),

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
