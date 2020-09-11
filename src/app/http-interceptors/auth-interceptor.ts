import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { UserService } from "../services/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Add Bearer token to request headers
    const authToken = this.userService.authToken;
    const authReq = req.clone({
      setHeaders: { Authorization: "Bearer " + authToken },
    });

    return next.handle(authReq).pipe(
      tap(
        () => {},
        // Log out user if unauthorized (token expired)
        (error) => {
          if (error.status === 401) {
            this.userService.logout();
            this.router.navigateByUrl("/admin/login");
          }
        }
      )
    );
  }
}
