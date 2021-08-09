import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  listCategories: Array<any> = [];
  listHighlights: Array<any> = [];
  listFeatured: Array<any> = [];
  showLocationDetail: boolean = false;

  catSlideOpts = {
    speed: 300,
    spaceBetween: 10,
    slidesOffsetBefore: 11,
    slidesPerView: 3.5,
    freeMode: true,
  };

  highLightSlideOpts = {
    speed: 300,
    spaceBetween: 10,
    slidesPerView: 1.1,
    centeredSlides: true,
    loop: true
  };

  featureSlideOpts = {
    speed: 300,
    spaceBetween: 10,
    slidesPerView: 1.2,
    freeMode: true,
    loop: true
  };

  constructor(
    private http: HttpClient,
    private navCtrl: NavController
  ) {}
  
  ngOnInit() {
   this.http.get('https://devdactic.fra1.digitaloceanspaces.com/foodui/home.json')
   .subscribe((res: any) => {

    this.listCategories = res.categories;
    this.listHighlights = res.highlights;
    this.listFeatured = res.featured;

   });
  }

  onScroll(ev){

    const offset = ev.detail.scrollTop;
    offset > 50 ? this.showLocationDetail = true : this.showLocationDetail = false;

  }

  doRefresh(ev){

    setTimeout(() => {

      ev.target.complete();

    },3000);

  }

  openDetailProduct(item){

    this.navCtrl.navigateForward('details');

  }

}
