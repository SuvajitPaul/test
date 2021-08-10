import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  title = 'Portfolio';
  isShown = false;
  navbar()
  {
    this.isShown = !this.isShown;
  }
}
