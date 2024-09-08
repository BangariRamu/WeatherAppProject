export interface City {
    fields: {
      name: string;
      country: string;
      timezone: string;
      population: number;
    };
  }
  
  export interface Weather {
    name: string;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
    weather: [
      {
        description: string;
      }
    ];
  }
  