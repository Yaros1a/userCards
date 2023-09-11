import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css'],
})
export class SecondComponent implements OnInit {
  isLoading: boolean = true;

  data: any;
  weatherData: any;
  name: string = '';
  gender: string = '';
  profImg: string = '';
  lat: string = '';
  lon: string = '';
  email: string = '';
  weatherUrl: string = '';
  private url: string = 'https://randomuser.me/api/';
  iconId: string = '';
  iconURL: string = '';
  tempCurrent: string = '';
  tempLowest: string = '';
  tempHighest: string = '';

  async ngOnInit(): Promise<void> {
    await fetch(this.url)
      .then((response) => response.json())
      .then(
        (userData) => (
          (this.data = userData.results['0']), console.log(this.data)
        )
      )
      .then((value: void) => this.create());

    await fetch(this.weatherUrl)
      .then((info) => info.json())
      .then(
        (data) => ((this.weatherData = data), console.log(this.weatherData))
      )
      .then((value: void) => this.getWeather());
    this.isLoading = false;
  }
  create(): void {
    this.name = this.data.name.first;
    this.gender = this.data.gender;
    this.profImg = this.data.picture.medium;
    this.lat = this.data.location.coordinates.latitude;
    this.lon = this.data.location.coordinates.longitude;
    this.email = this.data.email;
    this.weatherUrl =
      'https://api.openweathermap.org/data/2.5/weather?lat=' +
      this.lat +
      '&' +
      'lon=' +
      this.lon +
      '&units=metric&appid=b29229890faa94b06640bd36a3828d35';
    console.log(this.weatherUrl);
  }

  getWeather(): void {
    this.iconId = this.weatherData.weather[0].icon;
    this.iconURL =
      'https://openweathermap.org/img/wn/' + this.iconId + '@2x.png';
    this.tempCurrent = this.weatherData.main.temp;
    this.tempHighest = this.weatherData.main.temp_max;
    this.tempLowest = this.weatherData.main.temp_min;
  }

  saveData() {
    let userInfo = {
      name: this.name,
      gender: this.gender,
      profImg: this.profImg,
      lat: this.lat,
      lon: this.lon,
      email: this.email,
      weatherUrl: this.weatherUrl,
      iconUrl: this.iconURL,
      tempCurrent: this.tempCurrent,
      tempHighest: this.tempHighest,
      tempLowest: this.tempLowest,
    };
    localStorage.setItem(this.name, JSON.stringify(userInfo));
  }
}
