//Angular modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

//App components

//App modules
import { AppRoutingModule }     from './app-routing.module';
import { ReplyMainModule } from './reply/ReplyMain.module';

//App startup component
import { AppComponent }  from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    
    AppRoutingModule,
    ReplyMainModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
