import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { TableOptions } from "../models/table-options.model";

const API: string = "http://localhost:3000/users";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

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
}
