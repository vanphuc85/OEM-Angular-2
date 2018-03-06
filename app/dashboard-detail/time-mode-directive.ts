import { Component, HostListener, Directive, HostBinding, ElementRef ,Input} from '@angular/core';
import { GetData } from './get-data';
@Directive({
    selector: '[timeMode]'
})
export class TimeModeDirective {
    @HostListener('document:click', ['$event'])
    onClick(event) {
        let innerText = this.eRef.nativeElement.innerHTML;
        if (this.getData.timeMode ==  innerText) {
            this.eRef.nativeElement.style.fontWeight = "bold"
        }
        else {
            this.eRef.nativeElement.style.fontWeight = "";
        }

    }

    constructor(private eRef: ElementRef,
        private getData: GetData,

    ) { }

}
