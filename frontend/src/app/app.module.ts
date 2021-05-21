import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@components/app-component/app.component';
import { FormNoteComponent } from './components/form-note/form-note.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { ListNotesComponent } from '@components/list-notes/list-notes.component';
import { UpdateNoteComponent } from './components/update-note/update-note.component';

@NgModule({
  declarations: [
    AppComponent,
    FormNoteComponent,
    CreateNoteComponent,
    ListNotesComponent,
    UpdateNoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
