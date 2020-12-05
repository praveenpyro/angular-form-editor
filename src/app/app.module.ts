import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { FormEditorComponent } from "./form-editor/form-editor.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgbModule],
  declarations: [AppComponent, HelloComponent, FormEditorComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
