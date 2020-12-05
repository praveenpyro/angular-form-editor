import { Component, OnInit } from "@angular/core";
import { initValue, metaData } from "../data";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators
} from "@angular/forms";
@Component({
  selector: "app-form-editor",
  templateUrl: "./form-editor.component.html",
  styleUrls: ["./form-editor.component.css"]
})
export class FormEditorComponent implements OnInit {
  public formFields: any;
  public eidtable = false;
  public model: NgbDateStruct;
  public fieldForm: FormGroup;
  public initialValue = initValue;
  public diffJsonObject;
  constructor(private calendar: NgbCalendar, private fb: FormBuilder) {
    this.fieldForm = this.fb.group({});
  }

  ngOnInit() {
    this.formFields = metaData.field.filter(item => item.system !== true);
    this.addFromControls();
    //patch intial values to the form
    this.fieldForm.patchValue(this.initialValue);
  }
  addFromControls() {
    this.formFields.forEach((item, i) => {
      this.fieldForm.addControl(
        item.name,
        new FormControl("", Validators.required)
      );
    });
  }
  save() {
    if (this.fieldForm.invalid) {
      this.fieldForm.markAllAsTouched();
      alert("Form is invalid");
    } else {
      //save the form
      this.eidtable = false;
      console.log(this.fieldForm.value);

      let editedValue = this.fieldForm.value;
      let originalValue = JSON.parse(sessionStorage.getItem("formValue"));
      if (!originalValue) {
        originalValue = this.initialValue;
      }
      this.diffJsonObject = JSON.stringify(
        this.findDifference(editedValue, originalValue)
      );

      sessionStorage.setItem("formValue", JSON.stringify(this.fieldForm.value));
    }
  }

  cancel() {
    let formValue = JSON.parse(sessionStorage.getItem("formValue"));
    if (formValue) {
      this.fieldForm.patchValue(formValue);
    } else {
      this.fieldForm.patchValue(this.initialValue);
    }
    this.fieldForm.markAsUntouched();
    this.eidtable = false;
  }
  edit() {
    this.eidtable = true;
  }

  findDifference(edited, original) {
    let keys = Object.keys(edited);
    let diffObj = {
      $original: {}
    };

    keys.forEach(key => {
      if (key === "birthdate") {
        //Need to compare the dates with revised date formats
        //left thsi comparison for now due to time factor
      } else if (edited[key] !== original[key]) {
        diffObj[key] = edited[key] || "null";
        diffObj.$original[key] = original[key] || "null";
      }
    });

    return diffObj;
  }
}
