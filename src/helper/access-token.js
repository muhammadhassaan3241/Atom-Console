// redis setup
import axios from 'axios';
import redis from 'redis';
import { promisify } from 'util';
import { ExceptionHandler } from 'winston';

export const getAccessToken = async (resellerId) => {
    const client = redis.createClient({
        host: '127.0.0.1',
        port: 6379,
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    const value = await client.get('key');
    const key = `access_token_${resellerId}`;
    const accessToken = await client.get(key);
    // console.log(accessToken);
    if (!accessToken) {
        // Access token does not exist in Redis, generate a new one and store it
        const newAccessToken = await generateAccessToken();
        console.log(newAccessToken);
        await client.set(key, newAccessToken); // Store the new access token for 1 hour
        return newAccessToken;
    }

    // Access token exists in Redis, check if it has expired or will expire soon
    const ttl = await client.get(`access_token_ttll_${resellerId}`);
    let diffInS;
    if (ttl) {
        console.log(ttl);
        const time1 = ttl;
        const time2 = Math.floor(Date.now() / 1000);
        diffInS = time2 - time1;
        console.log(diffInS);
    }
    if (!ttl || diffInS > 3000) {
        // Access token has expired or will expire in less than 10 minutes, refresh it
        const newAccessToken = await generateAccessToken();
        const now = Math.floor(Date.now() / 1000);
        await client.set(key, newAccessToken); // Store the new access token for 1 hour
        await client.set(`access_token_ttll_${resellerId}`, now); // Set the TTL to 1 hour
        console.log(newAccessToken);
        return newAccessToken;
    }

    // Access token exists in Redis and is still valid, return it
    return accessToken;
};