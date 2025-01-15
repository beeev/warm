// src/pages/api/top-albums.js

import fetch from 'node-fetch';

export async function get() {
    const apiKey = import.meta.env.LASTFM_API_KEY;
    const username = import.meta.env.LASTFM_USERNAME;
    const period = 'month'; // Fetch data from the last 30 days
    const limit = 5; // Number of top albums to fetch

    const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${encodeURIComponent(
        username
    )}&api_key=${apiKey}&format=json&period=${period}&limit=${limit}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();

        return {
            status: 200,
            body: data
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            body: { error: 'Failed to fetch top albums.' }
        };
    }
}
