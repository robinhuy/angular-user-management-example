import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login() {
    this.userService.login(this.email, this.password).subscribe(
      (user) => {
        this.userService.setAuthToken(user.token);
        this.router.navigateByUrl(this.userService.redirectUrl);
      },
      (err) => {
        this.snackBar.open(err.error.message || err.message, "", {
          duration: 2000,
        });
      }
    );
  }
}
