import { Component, OnInit } from '@angular/core';
import { Form } from 'src/app/models/form';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private service: FormService) { }
  dataSource: Form[] = []; // should be moved to FormService to make it work
  displayedColumns: string[] = ['ID', 'First Name', 'Last Name'];
  ngOnInit(): void {
    this.service.get().subscribe((forms: Form[]) => {
        this.dataSource = forms;
      }
    )
  }

}
