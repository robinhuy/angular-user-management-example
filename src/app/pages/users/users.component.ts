import { Component, OnInit, ViewChild } from "@angular/core";
import { Sort, MatPaginator } from "@angular/material";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  displayedColumns: string[] = [
    "avatar",
    "name",
    "email",
    "birthday",
    "action",
  ];

  itemsPerPage: number = 5;
  totalItems: number = 0;
  column: string = "id";
  direction: string = "desc";

  searchUserInput: string = "";
  searchUserInput$ = new Subject<string>();

  @ViewChild("paginator", { static: false }) paginator: MatPaginator;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Get users with default options
    this.userService
      .getUsers({
        column: this.column,
        direction: this.direction,
        itemsPerPage: this.itemsPerPage,
      })
      .subscribe((result) => {
        this.users = result.body;
        this.totalItems = parseInt(result.headers.get("X-Total-Count"));
      });

    // Listen search user input change
    this.searchUserInput$
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.paginator.firstPage();

        this.userService
          .getUsers({
            column: this.column,
            direction: this.direction,
            itemsPerPage: this.itemsPerPage,
            keyword: value,
          })
          .subscribe((result) => {
            this.users = result.body;
            this.totalItems = parseInt(result.headers.get("X-Total-Count"));
          });
      });
  }

  changePage(event) {
    this.itemsPerPage = event.pageSize;

    this.userService
      .getUsers({
        currentPage: event.pageIndex + 1,
        column: this.column,
        direction: this.direction,
        itemsPerPage: this.itemsPerPage,
      })
      .subscribe((result) => {
        this.users = result.body;
        this.totalItems = parseInt(result.headers.get("X-Total-Count"));
      });
  }

  sortData(sort: Sort) {
    this.paginator.firstPage();
    this.column = sort.active;
    this.direction = sort.direction;

    this.userService
      .getUsers({
        column: this.column,
        direction: this.direction,
        itemsPerPage: this.itemsPerPage,
        keyword: this.searchUserInput,
      })
      .subscribe((result) => {
        this.users = result.body;
        this.totalItems = parseInt(result.headers.get("X-Total-Count"));
      });
  }

  searchUser() {
    this.paginator.firstPage();
    this.searchUserInput$.next(this.searchUserInput);
  }
}
