interface IWeather {
    id: number,
    icon: string,
    description: string,
    windSpeed: number,
    humidity: number,
    datetime: string,
    temp: number,
    city: string,
}

interface IForecast {
    id: number,
    icon: string,
    description: string,
    temp: number,
    humidity: number,
    datetime: string,
}

interface ICoord {
    lat: number,
    lon: number
}

interface IWeatherDefaultState {
    positionCoord: ICoord,
    weather: Object,
    forecasts: Object,
    error: boolean,
    getCurrentWeather: () => void,
    searchWeather: (location: string) => void,
}


export type {
    IWeather,
    IForecast,
    ICoord,
    IWeatherDefaultState
}