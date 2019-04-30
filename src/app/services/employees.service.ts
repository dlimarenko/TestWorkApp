import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { EmployeeItem } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }
  private mockData: any = [
    {
      id: 1,
      name: 'person 1',
      email: 'test@test.com',
      depId: 1,
      age: 18
    },
    {
      id: 2,
      name: 'person 2',
      depId: 1,
      email: 'test1@test.com',
      age: 18
    },
    {
      id: 3,
      name: 'person 4',
      depId: 1,
      email: 'test2@test.com',
      age: 18
    },
  ];
  private url = (id) => `localhost:8080/departments/${id}/employees`;

  public getEmployees(id) {
    return of(this.mockData);
    //return this.http.get(this.url(id));
  }

  public addNewEmp(depId, newEmployee) {
    return this.http.post(this.url(depId), newEmployee);
  }

  public deleteEmp(depId, empId) {
    return this.http.delete(this.url(depId), empId);
  }

  public editEmp(depId, updatedEmp) {
    return this.http.put(this.url(depId), updatedEmp);
  }
}
