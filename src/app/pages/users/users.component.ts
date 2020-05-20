import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users: User[];

  displayedColumns: string[] = [
    "avatar",
    "name",
    "email",
    "birthday",
    "action",
  ];

  itemsPerPage: number = 5;
  totalItems: 10;
  column: string = "id";
  direction: string = "desc";

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
  }
}
