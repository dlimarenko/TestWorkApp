import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { DepartmentItem } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }
  private mockData: any = [
    {
      id: 1,
      name: 'Department 1',
    },
    {
      id: 2,
      name: 'Department 2',
    },
    {
      id: 3,
      name: 'Department 3',
    },
    {
      id: 4,
      name: 'Department 4',
    },
    {
      id: 5,
      name: 'Department 5',
    }
  ];
  private url = 'localhost:8080/departments';

  public getDepartments() {
    return of(this.mockData);
    //return this.http.get(this.url);
  }

  public addNewDep(name) {
    const newlastId = this.mockData && this.mockData.legnth ? this.mockData[this.mockData.length - 1].id + 1 : 1;
    const newObj = {
      id: newlastId,
      name
    };
    this.mockData.push(newObj);
    return of(this.mockData);
    //return this.http.post(this.url, name);
  }

  public deleteDep(id) {
    this.mockData = this.mockData.filter(item => item.id !== id);
    return of(this.mockData);
    //return this.http.delete(this.url, id);
  }

  public editDep(id, newName) {
    const foundIndex = this.mockData.findIndex(x => x.id == id);
    this.mockData[foundIndex].name = newName;
    return of(this.mockData);
    //return this.http.put(this.url, id, newName);
  } 
}
