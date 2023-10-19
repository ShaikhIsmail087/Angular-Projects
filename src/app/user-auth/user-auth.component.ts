import { Component, OnInit } from '@angular/core';
import { SignUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  constructor(private user:UserService) { }

  ngOnInit():void {
    this.user.userAuthReload();
  }

  signUp(data:SignUp){
    this.user.userSignUp(data);
    
  }

}
