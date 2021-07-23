import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private route: Router) { }

    canActivate() {
        return localStorage.getItem('Username') ? true : this.route.navigate(['/login'])
    }
}