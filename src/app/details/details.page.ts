import { IonContent, IonList, IonSlide, IonSlides, isPlatform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, QueryList, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  @ViewChild(IonList, { read: ElementRef }) lists: QueryList<ElementRef>;
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonSlides) slides: IonSlides;
  data = null;
  slideOpts = {
    freeMode: true,
    slidePerView: 2.6,
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 100,
  };
  catSlidesVisible: boolean = false;

  activeCategory = 0;
  listElements = [];

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.http.get('https://devdactic.fra1.digitaloceanspaces.com/foodui/1.json')
      .subscribe((res) => {

        this.data = res;
        console.log(res);

      });

    const headerHeight = isPlatform('ios') ? 44 : 56;
    this.document.documentElement.style.setProperty('--header-position', `calc(env(safe-area-inset-top) + ${headerHeight}px)`)
  }

  ngAfterViewInit() {
  
    this.lists.changes.subscribe(_ => {
      this.listElements = this.lists.toArray();
      console.log(this.lists.toArray())
    });
  }

  selectCategory(index) {

    const child = this.listElements[index].nativeElement;
    this.content.scrollToPoint(0, child.offsetTop, 1000);

  }

  onScroll(ev) {

    const offset = ev.detail.scrollTop;
    offset > 500
      ? this.catSlidesVisible = true
      : this.catSlidesVisible = false;
    for (let i = 0; i < this.listElements.length; i++) {

      const item = this.listElements[i].nativeElement;
      if (this.isElementInViewPort(item)) {

        this.activeCategory = i;
        this.slides.slideTo(i, 1000);

        break;
      }

    }

  }

  isElementInViewPort(el) {

    const rect = el.getBoundingClientRect();

    return (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || this.document.documentElement.clientHeight)
    )
  }

}
