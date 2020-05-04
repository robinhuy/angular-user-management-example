import { Component } from "@angular/core";
import { FormBuilder, FormArray, Validators } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent {
  avatarUrl: string = "assets/img/default-avatar.jpg";

  profileForm = this.fb.group({
    name: ["Robin", [Validators.required]],
    birthday: [""],
    phone: ["", Validators.required],
    bio: [""],
    addresses: this.fb.array([this.fb.control("Address 1")]),
  });

  constructor(private fb: FormBuilder) {}

  get addresses() {
    return this.profileForm.get("addresses") as FormArray;
  }

  addAddress() {
    this.addresses.push(this.fb.control(""));
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  onFileChange(event): void {
    const files = event.target.files;
    let reader = new FileReader();

    if (files && files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.avatarUrl = reader.result.toString();
      };
    }
  }

  updateProfile() {
    console.log(this.profileForm.value);
  }
}
