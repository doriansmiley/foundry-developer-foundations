import { TYPES, WeatherService, UserDao } from "@hello/types";
import { container } from "@hello/inversify.config";

export async function writeGreeting(city: string): Promise<string> {
    // example of consuming an vanilla service
    const getWeather = container.get<WeatherService>(TYPES.WeatherService);
    const weather = await getWeather(city);

    // example dao usage
    const user = await container.get<UserDao>(TYPES.UserDao)();

    return `weather: ${weather}\nuser: ${user}`;
}