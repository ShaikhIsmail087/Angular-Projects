import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];
  userName: string = '';
  cartItems=0;
  constructor(private route: Router, private product: ProductService) { }

  ngOnInit() {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        // console.warn(val.url);
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          // console.warn("in seller area");
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
        }
        else {
          // console.warn("outside seller");
          this.menuType = 'default';
        }
      }
    });
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartItems=JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length;
    })
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        // console.warn(result);
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }
  submitSearch(val: string) {
    this.route.navigate([`search/${val}`])
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
}
