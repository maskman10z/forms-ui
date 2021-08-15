import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Form } from '../models/form';
import { ObservableInput, Subject, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FormService {

  private postUrl: string = "http://localhost:8080/questionnaire";
  private getUrl: string = "http://localhost:8080/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  private newForm: Subject<Form[]>;
  public dataSource: Form[] = [];

  constructor(private httpClient: HttpClient) { 
    this.newForm = new Subject<Form[]>();

    this.newForm.subscribe(data => {
      this.dataSource = data;
    });
  }

  public save(form: Form) {
     let obj = this.httpClient.post<Form>(this.postUrl, form, this.httpOptions).pipe(
      catchError(this.handleErrors)
    );
    
    obj.subscribe(_ => {
      this.get();
    });
  }

  public get() {
     let  get = this.httpClient.get<Form[]>(this.getUrl)
    .pipe(
      retry(3),
      catchError(this.handleErrors)
    );

    get.subscribe(data => {
      this.newForm.next(data);
    });
  }

  private handleErrors(error: HttpErrorResponse) : ObservableInput<any> {
    return throwError("Something bad happened; please try again later.");
  }

}
