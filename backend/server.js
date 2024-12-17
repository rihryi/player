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


// 선수 detail 페이지 API ...
app.get('/api/player/detail/:nickname', async(req, res) => {
    const nickname = req.params.nickname;

    try {
        const broswer = await puppeteer.launch({
            headless: 'new'
        });
        const page = await broswer.newPage();

        await page.goto(`https://oracleselixir.com/player/${nickname}/statsBySplit`, {
            waitUtil: 'networkidle0'
        });

        await page.waitForSelector('#root > div > div.sc-hRcwtX.kIdcTT.mainBody > div.sc-dUOoGL.fQvyoe.mainContent > div.sc-cQCQeq.hJfA-dc > div.sc-fremEr.jzrHZC > div > div');

        const stats = await page.evaluate(() => {
            const statContainers = Array.from(document.querySelectorAll('#root > div > div.sc-hRcwtX.kIdcTT.mainBody > div.sc-dUOoGL.fQvyoe.mainContent > div.sc-cQCQeq.hJfA-dc > div.sc-fremEr.jzrHZC > div > div'));

            return statContainers.slice(0, 5).map(container => {
                const yearElement = container.querySelector('.bnawWf');
                const year = yearElement.textContent;
                const teamElement = container.querySelector('.cGhpUx');
                const team = teamElement.textContent;

                const statElement = container.querySelectorAll('.ksewfV');
                const statsArray = Array.from(statElement).map(el => el.textContent);

                return {
                    year,
                    team,
                    position: statsArray[1],
                    gamesPlayed: statsArray[2],
                    wins: statsArray[3],
                    kda: statsArray[4],
                    killParticipation: statsArray[5],
                    goldDiff10: statsArray[8]
                };
            });
        });

        await broswer.close();

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error fetching player stats: ', error);
        res.status(500).json({
            success: false,
            error: 'failed to fetch player stats'
        });
    }
})

// 서버 시작
app.listen(3000, () => console.log('서버 실행 중: http:localhost:3000'));