import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { UsersComponent } from "./pages/users/users.component";
import { CreateUserComponent } from "./pages/users/create-user/create-user.component";
import { EditUserComponent } from "./pages/users/edit-user/edit-user.component";
import { AdminLayoutComponent } from "./components/admin-layout/admin-layout.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      { path: "profile", component: ProfileComponent },
      { path: "users", component: UsersComponent },
      { path: "users/create", component: CreateUserComponent },
      { path: "users/edit", component: EditUserComponent },
    ],
  },

  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
