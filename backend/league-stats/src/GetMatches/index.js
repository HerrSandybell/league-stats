const API_KEY = process.env.RIOT_API_KEY;
const API_HOST = 'api.riotgames.com';
const https = require('https');

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json"
};

exports.handler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    // console.info('received:', event);

    try {
        // get summoner puuid
        const summonerName = event.pathParameters.summoner;
        const getSummonerRes = await getSummonerByName(summonerName);
        const puuid = JSON.parse(getSummonerRes.body).puuid;

        // get last 5 matchIDs
        const matchIdsRes = await getMatchIds(puuid);
        const matchIds = JSON.parse(matchIdsRes.body);

        // get match promises
        const matchPromises = matchIds.map(matchId => getMatchbyId(matchId));

        // resolve promises
        const matchesRes = await Promise.all(matchPromises);

        // map matches into match VM
        const matches = matchesRes.map(res => {
            const body = JSON.parse(res.body);
            let info = body.info;
            let participant = info.participants.find(participant => puuid === participant.puuid);
            let csperminute = parseFloat(participant.totalMinionsKilled / (info.gameDuration / 60)).toFixed(2);
            const kda = participant.assists ? parseFloat((participant.kills + participant.assists) / participant.assists).toFixed(2) : 'Perfect';

            return {
                gameMode: info.gameMode,
                gameEndTimestamp: info.gameEndTimestamp,
                result: participant.win,
                duration: info.gameDuration,
                champion: {
                    id: participant.championId,
                    level: participant.champLevel,
                    name: participant.championName
                },
                summonerspells: [participant.summoner1Id, participant.summoner2Id],
                kills: participant.kills,
                deaths: participant.deaths,
                assists: participant.assists,
                kda: kda,
                items: [participant.item0, participant.item1, participant.item2, participant.item3, participant.item4, participant.item5, participant.item6],
                creepscore: participant.totalMinionsKilled,
                csperminute: csperminute
            };
        });

        console.log(matches);
        return response(200, matches);
    } catch (e) {
        // All log statements are written to CloudWatch
        console.error(e);
        return response(400, "Something went wrong in the backend.");
    }
};

async function getSummonerByName (summonerName) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: `na1.${API_HOST}`,
            port: 443,
            path: `/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`,
            method: "GET"
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                let response = {
                    "statusCode": res.statusCode,
                    "headers": corsHeaders,
                    "body": body
                };
                resolve(response);
            });
        });
        req.on('error', e => reject(e));
        req.end();
    });
}

async function getMatchIds (puuid) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: `americas.${API_HOST}`,
            port: 443,
            path: `/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${API_KEY}`,
            method: "GET"
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                let response = {
                    "statusCode": res.statusCode,
                    "headers": corsHeaders,
                    "body": body
                };
                resolve(response);
            });
        });
        req.on('error', e => reject(e));
        req.end();
    });
}

async function getMatchbyId (matchId) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: `americas.${API_HOST}`,
            port: 443,
            path: `/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`,
            method: "GET"
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                let response = {
                    "statusCode": res.statusCode,
                    "headers": corsHeaders,
                    "body": body
                };
                resolve(response);
            });
        });
        req.on('error', e => reject(e));
        req.end();
    });
}

function response (statusCode, body) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body),
        headers: corsHeaders
    };
}
