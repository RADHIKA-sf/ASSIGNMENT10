import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Usermodel } from './usermodel';
import { Input, Type } from "@angular/core";
import { response } from "express";
import { catchError } from "rxjs/operators";
import { map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  data: any = [];
  user: any = [];

  url = 'http://localhost:4200/';
  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',

      }),

  };
  constructor(private http: HttpClient) { }
  getRoleList() {
    return this.http
        .get<{ name: string; key: string }[]>(this.url + 'roles')
        .pipe(
            map((res) => {
                const roleslist: { name: string; key: string }[] = [];
                res.forEach((response) => {
                    roleslist.push(response);
                });
                return roleslist;
            }),
            catchError(this.errorHandler)
        );
}

getCustomerList() {
    return this.http
        .get<{ name: string; id: number }[]>(this.url + 'customerList')
        .pipe(
            map((res) => {
                const list: { name: string; id: number }[] = [];
                res.forEach((res) => {
                    list.push(res);
                });
                return list;
            }),
            catchError(this.errorHandler)
        );
}

getCustomer() {
    return this.http
        .get<{ name: string; id: number }[]>(this.url + 'customer')
        .pipe(
            map((res) => {
                const list: { name: string; id: number }[] = [];
                res.forEach((res) => {
                    list.push(res);
                });
                return list;
            }),
            catchError(this.errorHandler)
        );
}
get() {
    return this.http.get<Usermodel>('http://localhost:4200/users');
}

onDelete(id: number) {
    return this.http.delete<Usermodel>('http://localhost:4200/delete/' + `${id}`);
}
updateUser(user: Usermodel) {
    const url = 'http://localhost:4200/update/';

    return this.http.put<Usermodel>(url + user.id, user, this.httpOptions);
}
createUser(data: Usermodel) {
    const url = 'http://localhost:4200/add';
    return this.http
        .post(url, JSON.stringify(data), this.httpOptions)
        .pipe(catchError(this.errorHandler));
}

getUserId(id: any) {
    const url = 'http://localhost:4200/users';
    return this.http.get(`${url}/${id}`, this.httpOptions)
        .pipe(
            map((res: any) => {
                return res || {};
            }),
            catchError(this.errorHandler)
        );
}
errorHandler(error: any) {
    let errorMessage = 'generic error';

    if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
    } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
}
}
