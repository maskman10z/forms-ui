import { Component, OnInit } from '@angular/core';
import { Form } from 'src/app/models/form';
import { FormService } from 'src/app/services/form.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  questionnaire: FormGroup;

  constructor(private service: FormService, private snackBar: MatSnackBar) {
    this.questionnaire = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required])
    });
   }

  ngOnInit(): void {}

  onSubmit(): void {
    
    this.service.save(this.toForm()).subscribe(_ => {
      this.snackBar.open("Form submitted", 'Close', {duration: 3000});
      // retrigger loading of the dataSource in the service
    });
  }

  private toForm() {
    return new Form((Math.random() * 100) + "", this.questionnaire.get("firstName")?.value, this.questionnaire.get("lastName")?.value);
  }

  isInvalid(control: string): boolean | undefined {
    return this.questionnaire.get(control)?.invalid;
  }

  getErrorMessage(controlName: string): string | undefined {
    
    let control = this.questionnaire.get(controlName);
    
    if(control?.errors?.required) {
      return "Field is required";
    }
    console.log(this.questionnaire.get(controlName)?.errors);
    if(control?.errors?.maxlength) {
      return "Input is too long";
    }
    
    return;
  }
}
