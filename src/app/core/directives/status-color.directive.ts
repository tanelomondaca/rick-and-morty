import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appStatusColor]'
})
export class StatusColorDirective implements OnChanges {
  @Input() appStatusColor!: string;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) { }

  ngOnChanges(_: SimpleChanges) {
    const status = this.appStatusColor?.toLowerCase();

    let color = 'gray';
    if(status === 'alive') color = 'green';
    else if(status === 'dead') color = 'red';

    this.renderer.setStyle(this.el.nativeElement, 'color', color);
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
  }
}
