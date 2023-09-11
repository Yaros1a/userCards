import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css'],
})
export class FirstComponent implements OnInit {
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
