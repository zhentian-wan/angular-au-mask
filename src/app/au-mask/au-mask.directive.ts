import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

import * as includes from 'lodash.includes';
import * as findLastIndex from 'lodash.findlastindex';
import * as findIndex from 'lodash.findIndex';
import {SPECIAL_CHARACTERS, TAB, overWriteCharAtPosition, LEFT_ARROW, RIGHT_ARROW} from './mask.utils';

@Directive({
  selector: '[au-mask]'
})
export class AuMaskDirective implements OnInit {

  @Input('au-mask') mask = '';

  input: HTMLInputElement;

  ngOnInit() {
    this.input.value = this.buildPlaceHolder();
  }

  constructor(el: ElementRef) {
    this.input = el.nativeElement;
  }

  @HostListener('keydown', ['$event', '$event.keyCode'])
  onKeyDown($event: KeyboardEvent, keyCode) {

    if(keyCode !== TAB) {
      $event.preventDefault();
    }

    // get value for the key
    const val = String.fromCharCode(keyCode);
    // get position
    const cursorPos = this.input.selectionStart;

    switch(keyCode) {
      case LEFT_ARROW:
        this.handleLeftArrow(cursorPos);
        return;
      case RIGHT_ARROW:
        this.handleRightArrow(cursorPos);
        return;
    }

    overWriteCharAtPosition(this.input, val, cursorPos);
    this.handleRightArrow(cursorPos);
  }

  handleRightArrow(cursorPos) {
    const valueBeforeCursor = this.input.value.slice(cursorPos + 1);
    const nextPos = findIndex(valueBeforeCursor, (char) => !includes(SPECIAL_CHARACTERS, char));
    if(nextPos > -1) {
      const newNextPos = cursorPos + nextPos + 1;
      this.input.setSelectionRange(newNextPos, newNextPos);
    }
  }

  handleLeftArrow(cursorPos) {
    const valueAfterCursor = this.input.value.slice(0, cursorPos);
    const previousPos = findLastIndex(valueAfterCursor, (char) => !includes(SPECIAL_CHARACTERS, char));
    if(previousPos > -1) {
      this.input.setSelectionRange(previousPos, previousPos);
    }
  }

  buildPlaceHolder(): string {
    const chars = this.mask.split('');

    const value = chars.reduce((acc, curr) => {
      return acc += includes(SPECIAL_CHARACTERS, curr) ?
        curr :
        '_';
    }, '');

    return value;
  }

}
