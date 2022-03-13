import { Component, OnInit } from '@angular/core';
import { Form } from 'src/app/models/form';
import { FormService } from 'src/app/services/form.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  questionnaire: FormGroup;
  questions: Question[] = [
    new Question("question11", "Klasse", new FormControl('', [Validators.required, Validators.maxLength(30)])),
    new Question("question12", "Fach", new FormControl('', [Validators.required, Validators.maxLength(30)])),
    
    new Question("question1", "Haben Sie sich selbst auf den Unterricht vorbereitet?", new FormControl('', [Validators.required, Validators.maxLength(20)])),
    new Question("question2", "Wurde im Unterricht Ihr Verhalten interpretiert und gedeutet?", new FormControl('', [Validators.required, Validators.maxLength(20)])),
    new Question("question3", "Konnten Sie dem Unterrichtsverlauf folgen?", new FormControl('', [Validators.required, Validators.maxLength(20)])),
    new Question("question4", "Haben Sie während des Unterrichts Störungen wahrgenommen?", new FormControl('', [Validators.required, Validators.maxLength(20)])),
    new Question("question5", "Hatte Sie Möglichkeiten, sich selbst im Unterricht zu vertreten?", new FormControl('', [Validators.required, Validators.maxLength(20)])),
    new Question("question6", "Wurde die Bedeutung der Unterrichtsinhalte deutlich gemacht?", new FormControl('', [Validators.required, Validators.maxLength(20)])),
    new Question("question7", "War ihnen klar, warum sie diese Unterrichtsinhalte behandelt haben?", new FormControl('', [Validators.required, Validators.maxLength(20)])),
    new Question("question8", "Gab es für Sie Gestaltungsmöglichkeiten?", new FormControl('', [Validators.required, Validators.maxLength(20)])),
    new Question("question9", "Waren Ihnen die Bewertungskriterien bekannt?", new FormControl('', [Validators.required, Validators.maxLength(20)])),
    new Question("question10", "Wussten Sie was getan werden kann, um die eigene Leistung zu verbessern?", new FormControl('', [Validators.required, Validators.maxLength(20)]))
  ];


  constructor(private service: FormService, private snackBar: MatSnackBar) {
    this.questionnaire = new FormGroup({});
   }

  ngOnInit(): void {
    this.questions.forEach(q => { this.questionnaire.addControl(q.getName(), q.getControl()) });
  }

  onSubmit(): void {

    this.service.save(this.toForm())
    this.snackBar.open("Form submitted", 'Close', {duration: 3000});
  }

  private toForm() {
    let f: Form = new Form();
    this.questions.forEach(q => {
      let name = q.getName();
      f[name] = this.questionnaire.get(q.getName())?.value
    });
    return f;
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
