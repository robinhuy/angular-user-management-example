import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"],
})
export class CreateUserComponent {
  createUserForm = this.fb.group({
    profile: [],
    password: [],
  });

  constructor(private fb: FormBuilder) {}

  createUser() {
    console.log(this.createUserForm);
  }
}
