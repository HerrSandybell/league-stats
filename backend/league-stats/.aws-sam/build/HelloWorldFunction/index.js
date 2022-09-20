const API_KEY = process.env.RIOT_API_KEY;
const API_HOST = 'api.riotgames.com';
const https = require('https');

exports.handler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    console.log(event);

    // get summoner puuid

    // get last 5 matchIDs

    // get match promises

    // resolve promises

    // map matches into match VM

    return response(200, "Hello from Lambda!");
};

function response (statusCode, body) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json"
        }
    };
}
