import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './services/seller.service';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private router: Router,
    private sellerService:SellerService) { }
  // constructor(private sellerService:SellerService){}
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if (localStorage.getItem('seller')) {
        return true;
      }
    return this.sellerService.isSellerLoggedIn;
  }
  
}
export const authGuard: CanActivateFn = (route, state) => {
  return false;
};
