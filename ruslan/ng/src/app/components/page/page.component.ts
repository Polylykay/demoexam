import { Component } from '@angular/core';

@Component({
    template:''
})
export abstract class PageComponent<T> {
  item!: T;
}