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
  if (!accessToken) {
    // Access token does not exist in Redis, generate a new one and store it
    const newAccessToken = await generateAccessToken();
    console.log(newAccessToken);
    await client.set(key, newAccessToken); // Store the new access token for 1 hour
    return newAccessToken;
  }

  // Access token exists in Redis, check if it has expired or will expire soon
  const ttl = await client.get(`access_token_ttl_${resellerId}`);
  if (!ttl || ttl < 600) {
    // Access token has expired or will expire in less than 10 minutes, refresh it
    const newAccessToken = await generateAccessToken();
    await client.set(key, newAccessToken); // Store the new access token for 1 hour
    await client.set(`access_token_ttl_${resellerId}`, 3600); // Set the TTL to 1 hour
    return newAccessToken;
  }

  // Access token exists in Redis and is still valid, return it
  return accessToken;
};

async function generateAccessToken() {
  const endpoint = 'https://atomapi.com/auth/v1/accessToken';
  const secretKey = '365ad6d0293f024503f744a86b3dc1aa0f07fa94';
  const grantType = 'secret';

  const response = await axios.post(endpoint, {
    secretKey: secretKey,
    grantType: grantType,
  });

  const accessToken = response.data.body.accessToken;
  return accessToken;
}
