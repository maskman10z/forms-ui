import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Form } from '../models/form';
import { ObservableInput, throwError} from 'rxjs';
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
  constructor(private httpClient: HttpClient) { }

  public save(form: Form) {
    return this.httpClient.post<Form>(this.postUrl, form, this.httpOptions)
    .pipe(
      catchError(this.handleErrors)
    );
  }

  public get() {
    return this.httpClient.get<Form[]>(this.getUrl)
    .pipe(
      retry(3),
      catchError(this.handleErrors)
    );
  }

  private handleErrors(error: HttpErrorResponse) : ObservableInput<any> {
    return throwError("Something bad happened; please try again later.");
  }

}
