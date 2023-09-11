import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css'],
})
export class SecondComponent implements OnInit {
  items: any[] = [];
  isLoading: boolean = true;
  ngOnInit(): void {
    Object.keys(localStorage).forEach((data) => {
      let item: any = localStorage.getItem(data);
      this.items.push(JSON.parse(item));
    });
    this.isLoading = false;
  }

  deleteAll(): any {
    localStorage.clear();
  }
}


