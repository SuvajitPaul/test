import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wildcard',
  templateUrl: './wildcard.component.html',
  styleUrls: ['./wildcard.component.css']
})
export class WildcardComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
    console.log('Wildcard');
    this.route.navigateByUrl('/user/home');
  }
  

}
