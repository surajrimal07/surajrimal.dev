export interface WeatherResponse {
  current: {
    temp_c: number;
    condition: WeatherCondition;
  };
}

export interface WeatherCondition {
  text: string;
  icon: string;
}

export interface WeatherApiResponse {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}
