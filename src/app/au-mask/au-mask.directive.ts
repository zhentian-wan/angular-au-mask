import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

import * as includes from 'lodash.includes';
import * as findLastIndex from 'lodash.findlastindex';
import * as findIndex from 'lodash.findIndex';
import {SPECIAL_CHARACTERS, TAB, overWriteCharAtPosition, LEFT_ARROW, RIGHT_ARROW, BACKSPACE, DELETE} from './mask.utils';
import {digitValidators, neverValidator} from './digit_validation';

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
      case BACKSPACE:
        this.handleBackSpace(cursorPos);
        return;
      case DELETE:
        this.handleDelete(cursorPos);
        return;
    }

    const maskDigit = this.mask.charAt(cursorPos);
    const digitValidator = digitValidators[maskDigit] || neverValidator;
    if (digitValidator(val)) {
      overWriteCharAtPosition(this.input, val, cursorPos);
      this.handleRightArrow(cursorPos);
    }
  }

  handleDelete(cursorPos) {
    overWriteCharAtPosition(this.input, '_', cursorPos);
    this.input.setSelectionRange(cursorPos, cursorPos);
  }

  handleBackSpace(cursorPos) {
    const previousPos = this.calculatePreviousCursorPos(cursorPos);
    if (previousPos > -1) {
      overWriteCharAtPosition(this.input, '_', previousPos);
      this.input.setSelectionRange(previousPos, previousPos);
    }
  }

  calculateNextCursorPos(cursorPos) {
    const valueBeforeCursor = this.input.value.slice(cursorPos + 1);
    const nextPos = findIndex(valueBeforeCursor, (char) => !includes(SPECIAL_CHARACTERS, char));
    return nextPos;
  }

  calculatePreviousCursorPos(cursorPos) {
    const valueBeforeCursor = this.input.value.slice(0, cursorPos);
    const previousPos = findLastIndex(valueBeforeCursor, (char) => !includes(SPECIAL_CHARACTERS, char));
    return previousPos;
  }

  handleRightArrow(cursorPos) {
    const nextPos = this.calculateNextCursorPos(cursorPos);
    if(nextPos > -1) {
      const newNextPos = cursorPos + nextPos + 1;
      this.input.setSelectionRange(newNextPos, newNextPos);
    }
  }

  handleLeftArrow(cursorPos) {
    const previousPos = this.calculatePreviousCursorPos(cursorPos);
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
