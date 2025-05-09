import { TYPES, WeatherService, WorldDao, GreetingResult, UserDao } from "@hello/types";
import { container } from "@hello/inversify.config";

export async function writeGreeting(city: string): Promise<GreetingResult> {
    // example of consuming an vanilla service
    const getWeather = container.get<WeatherService>(TYPES.WeatherService);
    const weather = await getWeather(city);

    // example dao usage
    const user = await container.get<UserDao>(TYPES.UserDao)();

    const message = `Hello world, the weather in ${city} is ${weather}`;

    // example dao usage
    const result = await container.get<WorldDao>(TYPES.WorldDao)({
        message,
        userId: user.id,
    });

    return result;
}