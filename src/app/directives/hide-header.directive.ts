import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController, isPlatform } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective {

  @Input('appHideHeader') header: any;
  private headerHeight = isPlatform('ios') ? 44 : 46;
  private children: any;

  constructor(
    private renderer: Renderer2,
    private domCtrl: DomController
  ) { }

  ngAfterContentInit() {
    this.header = this.header.el;
    this.children = this.header.children;

  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event) {

    const scrollTop: number = $event.detail.scrollTop;
    let newPosition = -scrollTop;

    if (newPosition < -this.headerHeight) {
      newPosition = -this.headerHeight;
    }
    let newOpacity = 1 - (newPosition / -this.headerHeight);

    this.domCtrl.write(() => {

      this.renderer.setStyle(this.header, 'top', newPosition + 'px');
      for (let c of this.children) {
        this.renderer.setStyle(c, 'opacity', newOpacity);
      }

    });
  }

}
