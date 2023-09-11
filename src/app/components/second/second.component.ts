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
      'https://api.open-meteo.com/v1/forecast?latitude=' +
      this.lat +
      '&longitude=' +
      this.lon +
      '&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FLondon&forecast_days=1';
    console.log(this.weatherUrl);
  }

  dayOrNight: string = 'day';
  time: string = '';
  async getWeather(): Promise<void> {

    this.iconId = this.weatherData.current_weather.weathercode;
    this.time = this.weatherData.current_weather.time.slice(11,13);
    if(Number(this.time) < 6 && Number(this.time) > 20) {
      this.dayOrNight = 'night' 
    }
    this.iconURL = this.weatherCodes[this.iconId][this.dayOrNight].image; 
    console.log(this.iconId)
    this.tempCurrent = this.weatherData.current_weather.temperature;
    this.tempHighest = this.weatherData.daily.temperature_2m_max[0];
    this.tempLowest = this.weatherData.daily.temperature_2m_min[0];
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


  weatherCodes: any = {
    "0":{
      "day":{
        "description":"Sunny",
        "image":"http://openweathermap.org/img/wn/01d@2x.png"
      },
      "night":{
        "description":"Clear",
        "image":"http://openweathermap.org/img/wn/01n@2x.png"
      }
    },
    "1":{
      "day":{
        "description":"Mainly Sunny",
        "image":"http://openweathermap.org/img/wn/01d@2x.png"
      },
      "night":{
        "description":"Mainly Clear",
        "image":"http://openweathermap.org/img/wn/01n@2x.png"
      }
    },
    "2":{
      "day":{
        "description":"Partly Cloudy",
        "image":"http://openweathermap.org/img/wn/02d@2x.png"
      },
      "night":{
        "description":"Partly Cloudy",
        "image":"http://openweathermap.org/img/wn/02n@2x.png"
      }
    },
    "3":{
      "day":{
        "description":"Cloudy",
        "image":"http://openweathermap.org/img/wn/03d@2x.png"
      },
      "night":{
        "description":"Cloudy",
        "image":"http://openweathermap.org/img/wn/03n@2x.png"
      }
    },
    "45":{
      "day":{
        "description":"Foggy",
        "image":"http://openweathermap.org/img/wn/50d@2x.png"
      },
      "night":{
        "description":"Foggy",
        "image":"http://openweathermap.org/img/wn/50n@2x.png"
      }
    },
    "48":{
      "day":{
        "description":"Rime Fog",
        "image":"http://openweathermap.org/img/wn/50d@2x.png"
      },
      "night":{
        "description":"Rime Fog",
        "image":"http://openweathermap.org/img/wn/50n@2x.png"
      }
    },
    "51":{
      "day":{
        "description":"Light Drizzle",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
      },
      "night":{
        "description":"Light Drizzle",
        "image":"http://openweathermap.org/img/wn/09n@2x.png"
      }
    },
    "53":{
      "day":{
        "description":"Drizzle",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
      },
      "night":{
        "description":"Drizzle",
        "image":"http://openweathermap.org/img/wn/09n@2x.png"
      }
    },
    "55":{
      "day":{
        "description":"Heavy Drizzle",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
      },
      "night":{
        "description":"Heavy Drizzle",
        "image":"http://openweathermap.org/img/wn/09n@2x.png"
      }
    },
    "56":{
      "day":{
        "description":"Light Freezing Drizzle",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
      },
      "night":{
        "description":"Light Freezing Drizzle",
        "image":"http://openweathermap.org/img/wn/09n@2x.png"
      }
    },
    "57":{
      "day":{
        "description":"Freezing Drizzle",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
      },
      "night":{
        "description":"Freezing Drizzle",
        "image":"http://openweathermap.org/img/wn/09n@2x.png"
      }
    },
    "61":{
      "day":{
        "description":"Light Rain",
        "image":"http://openweathermap.org/img/wn/10d@2x.png"
      },
      "night":{
        "description":"Light Rain",
        "image":"http://openweathermap.org/img/wn/10n@2x.png"
      }
    },
    "63":{
      "day":{
        "description":"Rain",
        "image":"http://openweathermap.org/img/wn/10d@2x.png"
      },
      "night":{
        "description":"Rain",
        "image":"http://openweathermap.org/img/wn/10n@2x.png"
      }
    },
    "65":{
      "day":{
        "description":"Heavy Rain",
        "image":"http://openweathermap.org/img/wn/10d@2x.png"
      },
      "night":{
        "description":"Heavy Rain",
        "image":"http://openweathermap.org/img/wn/10n@2x.png"
      }
    },
    "66":{
      "day":{
        "description":"Freezing Rain",
        "image":"http://openweathermap.org/img/wn/10d@2x.png"
      },
      "night":{
        "description":"Freezing Rain",
        "image":"http://openweathermap.org/img/wn/10n@2x.png"
      }
    },
    "67":{
      "day":{
        "description":"Freezing Rain",
        "image":"http://openweathermap.org/img/wn/10d@2x.png"
      },
      "night":{
        "description":"Freezing Rain",
        "image":"http://openweathermap.org/img/wn/10n@2x.png"
      }
    },
    "71":{
      "day":{
        "description":"Light Snow",
        "image":"http://openweathermap.org/img/wn/13d@2x.png"
      },
      "night":{
        "description":"Light Snow",
        "image":"http://openweathermap.org/img/wn/13n@2x.png"
      }
    },
    "73":{
      "day":{
        "description":"Snow",
        "image":"http://openweathermap.org/img/wn/13d@2x.png"
      },
      "night":{
        "description":"Snow",
        "image":"http://openweathermap.org/img/wn/13n@2x.png"
      }
    },
    "75":{
      "day":{
        "description":"Heavy Snow",
        "image":"http://openweathermap.org/img/wn/13d@2x.png"
      },
      "night":{
        "description":"Heavy Snow",
        "image":"http://openweathermap.org/img/wn/13n@2x.png"
      }
    },
    "77":{
      "day":{
        "description":"Snow Grains",
        "image":"http://openweathermap.org/img/wn/13d@2x.png"
      },
      "night":{
        "description":"Snow Grains",
        "image":"http://openweathermap.org/img/wn/13n@2x.png"
      }
    },
    "80":{
      "day":{
        "description":"Light Showers",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
      },
      "night":{
        "description":"Light Showers",
        "image":"http://openweathermap.org/img/wn/09n@2x.png"
      }
    },
    "81":{
      "day":{
        "description":"Showers",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
      },
      "night":{
        "description":"Showers",
        "image":"http://openweathermap.org/img/wn/09n@2x.png"
      }
    },
    "82":{
      "day":{
        "description":"Heavy Showers",
        "image":"http://openweathermap.org/img/wn/09d@2x.png"
      },
      "night":{
        "description":"Heavy Showers",
        "image":"http://openweathermap.org/img/wn/09n@2x.png"
      }
    },
    "85":{
      "day":{
        "description":"Snow Showers",
        "image":"http://openweathermap.org/img/wn/13d@2x.png"
      },
      "night":{
        "description":"Snow Showers",
        "image":"http://openweathermap.org/img/wn/13n@2x.png"
      }
    },
    "86":{
      "day":{
        "description":"Snow Showers",
        "image":"http://openweathermap.org/img/wn/13d@2x.png"
      },
      "night":{
        "description":"Snow Showers",
        "image":"http://openweathermap.org/img/wn/13n@2x.png"
      }
    },
    "95":{
      "day":{
        "description":"Thunderstorm",
        "image":"http://openweathermap.org/img/wn/11d@2x.png"
      },
      "night":{
        "description":"Thunderstorm",
        "image":"http://openweathermap.org/img/wn/11n@2x.png"
      }
    },
    "96":{
      "day":{
        "description":"Thunderstorm With Hail",
        "image":"http://openweathermap.org/img/wn/11d@2x.png"
      },
      "night":{
        "description":"Thunderstorm With Hail",
        "image":"http://openweathermap.org/img/wn/11n@2x.png"
      }
    },
    "99":{
      "day":{
        "description":"Thunderstorm With Hail",
        "image":"http://openweathermap.org/img/wn/11d@2x.png"
      },
      "night":{
        "description":"Thunderstorm With Hail",
        "image":"http://openweathermap.org/img/wn/11n@2x.png"
      }
    }
  }
}
