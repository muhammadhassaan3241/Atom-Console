// packages
import redis from "redis";
import { ClientClosedError } from "@redis/client";
import axios from "axios";

// default port for redis
export const redisClient = redis.createClient();

// caching API
export const cachingAPI = async (request, response, next) => {
    try {
        console.log("api response retrieved successfully");
        const apiResponse = await axios.get(process.env.API_BASE_URL);
        request.apiResponse = apiResponse.data;
        next()
    } catch (error) {
        if (error instanceof ClientClosedError) {
            console.log("redis client is closed");
        } else {
            console.error(error);
        }
    }

}