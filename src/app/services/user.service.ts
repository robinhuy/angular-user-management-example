import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { TableOptions } from "../models/table-options.model";

import { environment } from "src/environments/environment";

const USER_API_ENDPOINT: string = environment.API_ENDPOINT + "/users";

@Injectable({
  providedIn: "root",
})
export class UserService {
  authToken = "";
  redirectUrl: string = "/admin/profile";

  constructor(private http: HttpClient) {
    if (window && window.localStorage) {
      this.authToken = window.localStorage.getItem("token");
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(environment.API_ENDPOINT + "/login", {
      email,
      password,
    });
  }

  setAuthToken(token: string): void {
    this.authToken = token;

    if (window && window.localStorage && token) {
      window.localStorage.setItem("token", token);
    }
  }

  logout(): void {
    this.authToken = "";

    if (window && window.localStorage) {
      window.localStorage.setItem("token", "");
    }
  }

  getUsers(options: TableOptions): Observable<HttpResponse<User[]>> {
    let queryParams = [];
    queryParams.push("_page=" + (options.currentPage || 1));
    queryParams.push("_sort=" + (options.column || "id"));
    queryParams.push("_order=" + (options.direction || "desc"));
    queryParams.push("_limit=" + (options.itemsPerPage || 10));
    queryParams.push("q=" + (options.keyword || ""));
    const queryParamsUrl = queryParams.join("&");

    const api = USER_API_ENDPOINT + `?${queryParamsUrl}`;
    return this.http.get<User[]>(api, { observe: "response" });
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(USER_API_ENDPOINT + "/" + userId);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(USER_API_ENDPOINT, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(USER_API_ENDPOINT + "/" + user.id, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<User>(USER_API_ENDPOINT + "/" + userId);
  }
}
