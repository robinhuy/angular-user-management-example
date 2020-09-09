import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { TableOptions } from "../models/table-options.model";

const DOMAIN: string = "http://localhost:3000";
const API: string = "http://localhost:3000/users";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ email: string; password: string }>(
      DOMAIN + "/login",
      {
        email,
        password,
      }
    );
  }

  getUsers(options: TableOptions): Observable<HttpResponse<User[]>> {
    let queryParams = [];
    queryParams.push("_page=" + (options.currentPage || 1));
    queryParams.push("_sort=" + (options.column || "id"));
    queryParams.push("_order=" + (options.direction || "desc"));
    queryParams.push("_limit=" + (options.itemsPerPage || 10));
    queryParams.push("q=" + (options.keyword || ""));
    const queryParamsUrl = queryParams.join("&");

    const api = API + `?${queryParamsUrl}`;
    return this.http.get<User[]>(api, { observe: "response" });
  }

  getUserById(userId: string): Observable<User> {
    const api = API + "/" + userId;
    return this.http.get<User>(api);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(API, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(API + "/" + user.id, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<User>(API + "/" + userId);
  }
}
