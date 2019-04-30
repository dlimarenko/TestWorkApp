import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';


import { DepartmentService } from '../services/department.service';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  public departments = [];
  constructor(
    private departService: DepartmentService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadDepartments();
  }

  public editDepartment(item) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '350px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.departService.editDep(item.id, result).subscribe(() => this.loadDepartments());
      }
    }); 
  }

  public deleteDepartment(item) {
    this.departService.deleteDep(item.id).subscribe(() => this.loadDepartments());
  }

  public viewEmployees(item) {
    this.router.navigate([`/departments/${item.id}/employees`]);
  }

  public addNewDep() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.departService.addNewDep(result).subscribe(() => this.loadDepartments());
    }); 
  }

  private loadDepartments() {
    this.departService.getDepartments().subscribe(data => this.departments = data);
  }
}
