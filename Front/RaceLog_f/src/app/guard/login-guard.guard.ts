import {CanActivateChildFn, Router, RouterModule} from '@angular/router';
import {AuthService} from "../service/AuthService";
import {inject, Inject} from "@angular/core";

export const loginGuardGuard: CanActivateChildFn = (route, state) => {
    const authService = inject(AuthService);
    const  router = new Router();
    console.log('AuthGuard: reaced' + authService.isLoggedIn())

    if(authService.isLoggedIn() === 'true')
      return true;
    else{
      router.navigate(['/login']);
      return false;
    }
};
