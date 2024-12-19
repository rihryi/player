const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS 설정
app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type']
}))

// Database 연결
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'prediction',
    port: 3307
})


// 팀 별로 선수 조회 API
app.get('/api/position/:teamName', async(req, res) => {

    try {
        const teamName = req.params.teamName;

        db.query('SELECT * FROM players WHERE team = ?', [teamName], async(err, results) => {
            if (err) {
                console.error('Database error: ', err);
                return res.status(500).json({
                    success: false,
                    message: '서버 오류가 발생하였습니다.'
                })
            }

            if (results.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: '선수를 찾을 수 없습니다.'
                });
            }

            res.status(200).json({
                success: true,
                players: results,
            });
        });
    } catch (error) {
        console.error('position player error: ', error);
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생하였습니다.'
        })
    }
})


// 닉네임으로 선수 정보 가져오기 API 
app.get('/api/player/by/:nickname', async(req, res) => {

    const nickname = req.params.nickname;

    db.query('SELECT nickname, name, team, position, img_url FROM players WHERE nickname = ?', [nickname], (err, results) => {
        if (err) {
            console.error('Database error: ', error);
            return res.status(500).json({
                success: false,
                message: '서버 오류가 발생하였습니다.'
            })
        }

        if (results.length === 0) {
            return res.status(400).json({
                success: false,
                message: '유저를 찾을 수 없습니다.'
            })
        }

        res.status(200).json({
            success: true,
            player: results[0],
        })
    })
})


// URL 접근을 시도하는 헬퍼 함수
async function tryPlayerUrl(browser, baseUrl, alternativeUrl) {
    const page = await browser.newPage();
    
    try {
        // 첫 번째 URL 시도
        await page.goto(baseUrl, {
            waitUntil: 'networkidle0',
            timeout: 15000
        });

        // 페이지에 데이터가 있는지 확인
        const hasData = await page.evaluate(() => {
            return !!document.querySelector('.sc-etKGGb, .sc-etVdmn, .sc-eLtQCx, .sc-bHnlcS');
        });

        if (!hasData) {
            // 데이터가 없으면 두 번째 URL 시도
            await page.goto(alternativeUrl, {
                waitUntil: 'networkidle0',
                timeout: 15000
            });
        }

        return page;
    } catch (error) {
        // 첫 번째 URL이 실패하면 두 번째 URL 시도
        try {
            await page.goto(alternativeUrl, {
                waitUntil: 'networkidle0',
                timeout: 15000
            });
            return page;
        } catch (secondError) {
            await page.close();
            throw new Error('Failed to access both URLs');
        }
    }
}

app.get('/api/player/info/:nickname/:name_eng', async(req, res) => {
    const nickname = req.params.nickname;
    const name_eng = req.params.name_eng;

    try {
        // nickname으로 선수 정보 가져오기 (DB 조회)
        const playerInfoPromise = new Promise((resolve, reject) => {
            db.query(
                'SELECT nickname, name, team, position, img_url FROM players WHERE nickname = ?',
                [nickname],
                (err, results) => {
                    if (err) {
                        return reject('Database error');
                    }
                    
                    if (results.length === 0) {
                        return reject('Player not found');
                    }

                    resolve(results[0]);
                }
            );
        });

        // team img 크롤링
        const teamImgPromise = (async() => {
            const browser = await puppeteer.launch({ headless: 'new' });
            try {
                const baseUrl = `https://oracleselixir.com/player/${nickname}/statsBySplit`;
                const alternativeUrl = `https://oracleselixir.com/player/${nickname}%20(${encodeURIComponent(name_eng)})/statsBySplit`;
                
                const page = await tryPlayerUrl(browser, baseUrl, alternativeUrl);

                const teamData = await page.evaluate(() => {
                    const imgElement = document.querySelector('.sc-etKGGb img');
                    if (imgElement) {
                        return {
                            team_img: imgElement.src || '',
                            team_name: imgElement.alt || ''
                        };
                    }
                    return null;
                });

                await page.close();
                return teamData;
            } finally {
                await browser.close();
            }
        })();

        // 선수 통계 크롤링
        const playerStatsPromise = (async() => {
            const browser = await puppeteer.launch({ headless: 'new' });
            try {
                const baseUrl = `https://oracleselixir.com/player/${nickname}/statsBySplit`;
                const alternativeUrl = `https://oracleselixir.com/player/${nickname}%20(${encodeURIComponent(name_eng)})/statsBySplit`;
                
                const page = await tryPlayerUrl(browser, baseUrl, alternativeUrl);

                const statsData = await page.evaluate(() => {
                    const rows = Array.from(document.querySelectorAll('.sc-etVdmn')).slice(0, 5);
                    return rows.map(row => {
                        const cells = row.querySelectorAll('.sc-fzQBhs');
                        return {
                            tournament: cells[0]?.textContent || '',
                            team: cells[1]?.textContent || '',
                            position: cells[2]?.textContent || '',
                            gamesPlayed: cells[3]?.textContent || '',
                            winRate: cells[4]?.textContent || '',
                            kda: cells[5]?.textContent || '',
                            killParticipation: cells[6]?.textContent || '',
                            csPerMin: cells[11]?.textContent || '',
                        };
                    });
                });

                await page.close();
                return statsData;
            } finally {
                await browser.close();
            }
        })();

        // 모스트3 챔피언 크롤링
        const playerMost3Promise = (async() => {
            const browser = await puppeteer.launch({ headless: 'new' });
            try {
                const baseUrl = `https://oracleselixir.com/player/${nickname}/championPool`;
                const alternativeUrl = `https://oracleselixir.com/player/${nickname}%20(${encodeURIComponent(name_eng)})/championPool`;
                
                const page = await tryPlayerUrl(browser, baseUrl, alternativeUrl);

                const mostData = await page.evaluate(() => {
                    const rows = Array.from(document.querySelectorAll('.sc-eLtQCx')).slice(0, 3);
                    return rows.map(row => {
                        const cells = row.querySelectorAll('.sc-jhlPcU');
                        const imgElement = cells[0]?.querySelector('img');
                        return {
                            img_url: imgElement ? imgElement.src : '',
                            champion_name: imgElement ? imgElement.alt : cells[0]?.textContent.trim(),
                            position: cells[1]?.textContent.trim() || '',
                            gamesPlayed: cells[2]?.textContent.trim() || '',
                            winRate: cells[3]?.textContent.trim() || '',
                            kda: cells[5]?.textContent.trim() || '',
                            killParticipation: cells[6]?.textContent.trim() || '',
                        };
                    });
                });

                await page.close();
                return mostData;
            } finally {
                await browser.close();
            }
        })();

        // 최근 플레이 챔피언 크롤링
        const recentPlaysPromise = (async() => {
            const browser = await puppeteer.launch({ headless: 'new' });
            try {
                const baseUrl = `https://oracleselixir.com/player/${nickname}`;
                const alternativeUrl = `https://oracleselixir.com/player/${nickname}%20(${encodeURIComponent(name_eng)})`;
                
                const page = await tryPlayerUrl(browser, baseUrl, alternativeUrl);

                const recentData = await page.evaluate(() => {
                    const games = Array.from(document.querySelectorAll('.sc-bHnlcS')).slice(0, 5);

                    return games.map(game => {
                        return {
                            result: {
                                outcome: game.querySelector('.sc-lgjHQU')?.textContent || '',
                                versusImage: game.querySelector('.sc-djTQaJ img')?.src || '',
                                versusTeam: game.querySelector('.sc-djTQaJ img')?.alt || '',
                            },
                            championInfo: {
                                champion: game.querySelector('.sc-iaJaUu')?.alt || '',
                                championImage: game.querySelector('.sc-iaJaUu')?.src || '',
                                kda: Array.from(game.querySelectorAll('.sc-gVJvzJ:first-child .sc-dOoqMo'))
                                .map(stat => stat.textContent.trim())
                                .join('/'),
                            },
                            teamInfo: {
                                myTeam: {
                                    name: game.querySelector('.sc-gFnajm.fjdMje')?.textContent || '',
                                    composition: Array.from(game.querySelectorAll('.sc-djVXDX img')).map(img => ({
                                        champion: img.alt,
                                        image: img.src
                                    }))
                                },
                                enemyTeam: {
                                    name: game.querySelector('.sc-gFnajm.eXsKTX')?.textContent || '',
                                    composition: Array.from(game.querySelectorAll('.sc-btwKTd img')).map(img => ({
                                        champion: img.alt,
                                        image: img.src
                                    }))
                                }
                            },
                            matchInfo: {
                                tournament: game.querySelector('.sc-bcSKrn')?.textContent || '',
                                date: (() => {
                                    const timestamp = game.querySelector('time')?.getAttribute('datetime');
                                    if (timestamp) {
                                        const date = new Date(Number(timestamp));
                                        return date.toLocaleDateString();
                                    }
                                    return '';
                                })(),
                                patch: game.querySelector('.sc-fIGJwM')?.textContent || ''
                            },
                        };
                    });
                });

                await page.close();
                return recentData;
            } finally {
                await browser.close();
            }
        })();

        // 모든 Promise 동시 실행
        const [teamImg, playerInfo, playerStats, playerMost3, recentPlay5] = 
            await Promise.all([teamImgPromise, playerInfoPromise, playerStatsPromise, playerMost3Promise, recentPlaysPromise]);

        // 응답 전송
        res.status(200).json({
            success: true,
            teamImg: teamImg,
            player: playerInfo,
            stats: playerStats,
            most: playerMost3,
            recent: recentPlay5
        });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch player data',
        });
    }
});

// 서버 시작
app.listen(3000, () => console.log('서버 실행 중: http:localhost:3000'));