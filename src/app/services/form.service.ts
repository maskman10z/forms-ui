import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Form } from '../models/form';
import { ObservableInput, Subject, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {


  private readonly baseUrl: string = environment.apiUrl;
  private readonly postUrl: string = this.baseUrl + "/questionnaire";
  private readonly getUrl: string =  this.baseUrl + "/questionnaire";
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  private readonly newForm: Subject<Form[]>;
  public dataSource: Form[] = [];

  constructor(private readonly httpClient: HttpClient) {
    this.newForm = new Subject<Form[]>();

    this.newForm.subscribe(data => {
      this.dataSource = data;
    });
  }

  public save(form: Form) {
     const obj = this.httpClient.post<Form>(this.postUrl, form, this.httpOptions).pipe(
      catchError(this.handleErrors)
    );

    obj.subscribe(_ => {
      this.get();
    });
  }

  public get() {
    const get = this.httpClient.get<Form[]>(this.getUrl)
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
