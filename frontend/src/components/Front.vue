<template>
    <div>
        <div>
            <div class="front_wrap">
                <div class="player_info">
                    <div class="player_left">
                        <div class="player_img"></div> <!-- 이미지 태그 -->
                        <div class="player_txt">
                            <h1>chovy</h1>
                            <div class="name">
                                <p class="left-p"><b>name</b>정지훈</p>
                                <p>jung ji hoon</p>
                            </div>
                            <div class="team">
                                <p class="left-p"><b>team</b>gen.g</p>
                                <p><b>position</b>mid</p>
                            </div>
                        </div>
                    </div>
                    <div class="team_img"></div> <!-- 이미지 태그 -->
                </div>
                <div class="player_stat">
                    <h3 class="title_h3">대회 별 경기 전적</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>경기</th>
                                <th>팀</th>
                                <th>포지션</th>
                                <th>총 게임</th>
                                <th>승률</th>
                                <th>K/DA</th>
                                <th>킬관여</th>
                                <th>분당 CS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>KeSPA Cup 2024</td>
                                <td>Gen.G</td>
                                <td>Middle</td>
                                <td>12</td>
                                <td>100%</td>
                                <td>19.0</td>
                                <td>95.0%</td>
                                <td>7.9</td>
                            </tr>
                            <tr>
                                <td>KeSPA Cup 2024</td>
                                <td>Gen.G</td>
                                <td>Middle</td>
                                <td>12</td>
                                <td>100%</td>
                                <td>19.0</td>
                                <td>95.0%</td>
                                <td>7.9</td>
                            </tr>
                            <tr>
                                <td>KeSPA Cup 2024</td>
                                <td>Gen.G</td>
                                <td>Middle</td>
                                <td>12</td>
                                <td>100%</td>
                                <td>19.0</td>
                                <td>95.0%</td>
                                <td>7.9</td>
                            </tr>
                            <tr>
                                <td>KeSPA Cup 2024</td>
                                <td>Gen.G</td>
                                <td>Middle</td>
                                <td>12</td>
                                <td>100%</td>
                                <td>19.0</td>
                                <td>95.0%</td>
                                <td>7.9</td>
                            </tr>
                            <tr>
                                <td>KeSPA Cup 2024</td>
                                <td>Gen.G</td>
                                <td>Middle</td>
                                <td>12</td>
                                <td>100%</td>
                                <td>19.0</td>
                                <td>95.0%</td>
                                <td>7.9</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- most champion 3가지-->
                <div class="most_champions">
                    <h3 class="title_h3">모스트 챔피언</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>챔피언</th>
                                <th>포지션</th>
                                <th>총 게임</th>
                                <th>승률</th>
                                <th>K/DA</th>
                                <th>킬관여</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="most_img">
                                    <div class="most_champion_img"></div>
                                    <p>Azir</p>
                                </td>
                                <td>middle</td>
                                <td>88</td>
                                <td>69%</td>
                                <td>4.4</td>
                                <td>64.2%</td>
                            </tr>
                            <tr>
                                <td class="most_img"> 
                                    <div class="most_champion_img"></div>
                                    <p>Azir</p>
                                </td>
                                <td>middle</td>
                                <td>88</td>
                                <td>69%</td>
                                <td>4.4</td>
                                <td>64.2%</td>
                            </tr>
                            <tr>
                                <td class="most_img">
                                    <div class="most_champion_img"></div>
                                    <p>Azir</p>
                                </td>
                                <td>middle</td>
                                <td>88</td>
                                <td>69%</td>
                                <td>4.4</td>
                                <td>64.2%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- 최근에 play한 champion 5가지 -->
                 <div class="rececnt_games">
                    <h3 class="title_h3">최근 경기 전적</h3>
                    <div class="game">
                        <div class="game-header">
                            <p>Loss</p>
                            <span>vs.</span>
                            <div class="vs_img"></div>
                        </div>

                        <div class="tourament_date">
                            <p>Worlds 2024 Main Event</p>
                            <p>2024. 10. 28.</p>
                        </div>

                        <div class="champion-info">
                            <!-- 플레이한 챔피언 이미지-->
                            <div class="champion_img"></div>
                            <p>3/1/5</p>
                        </div>

                        <div class="teams">
                            <div class="team">
                                <p>Gen.G</p>
                                <div class="composition">
                                    <div class="champion_img"></div>
                                    <div class="champion_img"></div>
                                    <div class="champion_img"></div>
                                    <div class="champion_img"></div>
                                    <div class="champion_img"></div>
                                </div>
                            </div>
                            <div class="team">
                                <p>T1</p>
                                <div class="composition">
                                    <div class="champion_img"></div>
                                    <div class="champion_img"></div>
                                    <div class="champion_img"></div>
                                    <div class="champion_img"></div>
                                    <div class="champion_img"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                 </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Player',
}
</script>

<style scoped>
.player_img {
    height: 12vw;
    width: 10vw;
    background-color: lemonchiffon;
}

.player_left {
    display: flex;
    align-items: center;
}

.player_txt {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    height: 90%;
    font-size: 1.3rem;
    margin-left: 5vw;
}

.player_txt h1 {
    margin-bottom: 1vw;
}

.player_txt b {
    margin-right: 1vw;
}

.player_txt .left-p {
    margin-right: 3vw;
}

.player_txt .name {
    margin: 0.5vw 0;
}

.player_txt .name, .player_txt .team {
    display: flex;
    justify-content: space-between;
}

.vs_img {
    width: 4vw;
    height: 4vw;
    background-color: lavender;
}

.team_img {
    background-color: slateblue;
    width: 15vw;
    height: 15vw;
}

.most_champion_img {
    height: 5vw;
    width: 5vw;
    background-color: skyblue;
}

.player_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.player_stat {
    width: 100%;
}

.player_stat table {
    width: 100%;
}

.player_stat table td:first-child {
    text-align: left;
    font-weight: bold;
    width: 17%;
}

.player_stat table {
    border: 1px solid #555;
    border-collapse : collapse;
    font-size: 0.9rem;
}

.player_stat table th {
    background-color: #272829;
    height: 1.5vw;
    color: #fff;
}

.player_stat table td {
    border: 1px solid #C7C8CC;
    border-top: 1px solid #555;
    border-collapse : collapse;
    text-align: center;
    height: 2vw;
}

.player_stat table th, .player_stat table td {
    padding: 0.2vw 0.5vw;
}

.champion_img {
    height: 5vw;
    width: 5vw;
    background-color: pink;
}

.most_champions {
    width: 100%;
}

.most_champions table {
    width: 100%;
    text-align: center;
    font-size: 0.9rem;
}

.most_champions table, .most_champions table th, .most_champions table tr, .most_champions table td {
    border-collapse: collapse;
}

.most_champions table th {
    background-color: #272829;
    height: 1.5vw;
    color: #fff;
    padding: 0.5vw 0;
}

.most_champions table .most_img {
    display: flex;
    align-items: center;
}

.most_champions table tr, .most_champions table td {
    padding: 0.5vw;
}

.most_champions table tr {
    border: 1px solid #C7C8CC;
}

.most_champions table th:first-child, .most_champions table td:first-child {
    width: 18vw;
}

.most_champions table td:first-child p {
    font-size: 1.5rem;
    margin-left: 1vw;
}

.game {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.game .game-header {
    display: flex;
    align-items: center;
    font-size: 1.3rem;
}

.game .game-header span {
    font-style: italic;
    text-decoration: underline;
    font-weight: bold;
    margin: 0 3vw;
}

.game .tourament_date {
    font-size: 1.2rem;
    text-align: center;
}

.game .tourament_date p:first-child {
    font-weight: bold;
}

.game .tourament_date p:last-child {
    font-size: 0.95rem;
    margin-top: 0.5vw;
    color: #444;
}

.game .champion-info {
    display: flex;
    align-items: center;
}

.game .champion-info p:last-child {
    margin-left: 3vw;
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 0.2vw;
}

.game .team {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.game .composition {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(1, 1fr);
    gap: 0.5vw;
    margin-left: 2vw;
}

.game .composition .champion_img {
    margin: 0.5vw 0;
}

.title_h3 {
    margin: 2vw 0 1vw;
}


</style>