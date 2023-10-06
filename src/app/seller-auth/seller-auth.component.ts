import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{

  showLogin=false;
  authError:string='';

  ngOnInit():void{
    this.seller.reloadSeller();
  }
  constructor(public seller:SellerService, private router:Router) { }

  signUp(data:SignUp):void{
    
    this.seller.userSignUp(data);
    // this.seller.userSignUp(data).subscribe((result)=>{
    //   if(result)
    //   {
    //     this.router.navigate(['seller-home']);
    //   }
    // }); 
  }

  login(data:SignUp):void{
    this.authError="";
    // console.warn(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or Password is incorrect";
      }

    })
  }

  openLogin(){
    this.showLogin=true;
  }

  openSignUp(){
    this.showLogin=false;
  }
}
