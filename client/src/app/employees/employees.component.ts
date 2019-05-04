import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { EmployeesService } from '../services/employees.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  public employeesList = [];
  private currentDepId: string;
  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.currentDepId = params['departmentId'];
      this.loadEmployees(this.currentDepId);
    });
  }

  public editEmployee(item) {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '350px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeesService.editEmp(this.currentDepId, result).subscribe(() => this.loadEmployees(this.currentDepId));
      }
    });
  }

  public deleteEmployee(item) {
    this.employeesService.deleteEmp(this.currentDepId, item.id).subscribe(() => this.loadEmployees(this.currentDepId));
  }

  public addNewEmp(item) {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {width: '350px',});

    dialogRef.afterClosed().subscribe(result => {
      this.employeesService.addNewEmp(this.currentDepId, result).subscribe(() => this.loadEmployees(this.currentDepId));
    });
  }

  private loadEmployees(id) {
    this.employeesService.getEmployees(id).subscribe(data => this.employeesList = data);
  }
}
