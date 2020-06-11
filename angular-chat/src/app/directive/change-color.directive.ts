import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective {
  @Input('appChangeColor') userName: string;

  public createdEl;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
    ) { }

  @HostListener('mouseenter') onMouseEnter() {
    const positionNativeEl = this.el.nativeElement.getBoundingClientRect();
    const parentNativeElHeight = this.el.nativeElement.offsetParent.getBoundingClientRect();
    const countSpace = positionNativeEl.top - parentNativeElHeight.top;

    this.createdEl = this.renderer.createElement('div');
    this.renderer.addClass(this.createdEl, 'tooltip-style');
    this.renderer.setProperty(this.createdEl, 'before', 'before');
    this.renderer.setProperty(this.createdEl, 'innerHTML', `${this.userName}`);
    this.renderer.setAttribute(this.createdEl, 'tooltip', 'tooltip');

    if (countSpace > 25) {
      this.renderer.addClass(this.createdEl, 'tooltip-top');
      this.renderer.setStyle(this.createdEl, 'position', 'absolute');
      this.renderer.setStyle(this.createdEl, 'top', `calc(${positionNativeEl.top}px - 30px)`);
    } else {
      this.renderer.addClass(this.createdEl, 'tooltip-bottom');
      this.renderer.setStyle(this.createdEl, 'position', 'absolute');
      this.renderer.setStyle(this.createdEl, 'top', `${positionNativeEl.bottom}px`);
    }

    this.renderer.setStyle(this.createdEl, 'left', `${positionNativeEl.left}px`);

    this.el.nativeElement.style.color = 'red';
    this.renderer.appendChild(document.body, this.createdEl);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeChild(document.body, this.createdEl);
    this.el.nativeElement.style.color = null;
  }

}
