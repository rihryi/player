<template>
    <div>
        <div v-if="loading">
            <div class="loading">
                <i class="fa-solid fa-spinner"></i>
                <p>Loading...</p>
            </div>
        </div>
        <div v-if="error">{{ error }}</div>
        <div v-else>
            <div class="front_wrap" v-if="player">
                <div class="player_info">
                    <div class="player_left">
                        <div class="player_img">
                            <img :src="player.img_url" :alt="player.nickname">
                        </div>
                        <div class="player_txt">
                            <h1>{{ player.nickname }}</h1>
                            <div class="name">
                                <p class="left-p"><b>name</b>{{ player.name }}</p>
                                <p>{{ name_eng }}</p>
                            </div>
                            <div class="team">
                                <p class="left-p"><b>team</b>{{ player.team }}</p>
                                <p><b>position</b>{{ player.position }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="team" v-if="teamImg">
                        <div class="team_img">
                            <img :src="teamImg.team_img" alt="teamImg.team_name">
                        </div>
                    </div>
                </div>
                
                <div class="player_stat" v-if="stats.length > 0">
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
                            <tr v-for="(stat, index) in stats" :key="index">
                                <td>{{ stat.tournament }}</td>
                                <td>{{ stat.team }}</td>
                                <td>{{ stat.position }}</td>
                                <td>{{ stat.gamesPlayed }}</td>
                                <td>{{ stat.winRate }}</td>
                                <td>{{ stat.kda }}</td>
                                <td>{{ stat.killParticipation }}</td>
                                <td>{{ stat.csPerMin }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="most_champions" v-if="mosts.length > 0">
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
                            <tr v-for="(most, index) in mosts" :key="index">
                                <td class="most_img">
                                    <img :src="most.img_url" alt="most.champion_name" class="most_champion_img">
                                    <p>{{ most.champion_name }}</p>
                                </td>
                                <td>{{ most.position }}</td>
                                <td>{{ most.gamesPlayed }}</td>
                                <td>{{ most.winRate }}</td>
                                <td>{{ most.kda }}</td>
                                <td>{{ most.killParticipation }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- 최근에 play한 champion 5가지 -->
                 <div class="rececnt_games" v-if="recents.length > 0">
                    <h3 class="title_h3">최근 경기 전적</h3>
                    <div class="game" v-for="(game, index) in recents" :key="index">
                        <div class="game-header">
                            <p :class="{ win: game.result.outcome == 'Win', lose: game.result.outcome == 'Loss' }">
                                {{ game.result.outcome }}
                            </p>
                            <span>vs.</span>
                            <div class="vs_img">
                                <img :src="game.result.versusImage" alt="game.result.versusTeam">
                            </div>
                        </div>

                        <div class="tourament_date">
                            <p>{{ game.matchInfo.tournament }}</p>
                            <p>{{ game.matchInfo.date }}</p>
                        </div>

                        <div class="champion-info">
                            <div class="champion_img">
                                <img :src="game.championInfo.championImage" alt="game.championInfo.champion">
                            </div>
                            <p>{{ game.championInfo.kda }}</p>
                        </div>
                        
                        <div class="teams">
                            <div class="team">
                                <p style="color: blue; font-weight: bold;">{{ game.teamInfo.myTeam.name }}</p>
                                <div class="composition">
                                    <div v-for="(champ, champIndex) in game.teamInfo.myTeam.composition"
                                        :key="champIndex" 
                                        class="champion_img">
                                        <img :src="champ.image" :alt="champ.champion">
                                    </div>
                                </div>
                            </div>
                            <div class="team">
                                <p style="color: red; font-weight: bold;">{{ game.teamInfo.enemyTeam.name }}</p>
                                <div class="composition">
                                    <div v-for="(champ, champIndex) in game.teamInfo.enemyTeam.composition"
                                        :key="champIndex" 
                                        class="champion_img">
                                        <img :src="champ.image" :alt="champ.champion">
                                    </div>
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
import axios from 'axios';

export default {
    name: 'Player',
    data() {
        return {
            nickname: '',
            name_eng: '',
            teamImg: null,
            stats: [],
            player: null,
            mosts: [],
            recents: [],
            loading: true,
            error: null
        };
    },
    created() {
        this.nickname = this.$route.params.nickname;
        this.name_eng = this.$route.params.name_eng;
        this.fetchPlayerData();
    },
    methods: {
        async fetchPlayerData() {
            try {
                const response = await axios.get(`/api/player/info/${this.nickname}/${this.name_eng}`);
                this.teamImg = response.data.teamImg;
                this.player = response.data.player;
                this.stats = response.data.stats;
                this.mosts = response.data.most;
                this.recents = response.data.recent;
                this.loading = false;
            } catch (error) {
                this.error = 'Failed to fetch player data';
                this.loading = false;
                console.error('Error: ', error);
            }
        },
    },
}
</script>

<style scoped>
.loading {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    font-size: 2rem;
}

.loading i {
    font-size: 4rem;
    margin-bottom: 2vw;
    color: #3D3BF3;
    animation: rotate_image 6s linear infinite;transform-origin: 50% 50%;
}

@keyframes rotate_image{
    100% {
        transform: rotate(360deg);
    }
}

.player_img {
    width: 10vw;
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
}

.team_img {
    width: 15vw;
    height: 15vw;
    background-color: #C7C8CC;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.team_img img {
    width: 80%;
}

.most_champion_img {
    height: 3vw;
    width: 3vw;
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

.player_stat table td:first-child {
    text-align: left;
    font-weight: bold;
    width: 17%;
}

.player_stat table {
    border: 1px solid #555;
    border-collapse : collapse;
    font-size: 0.9rem;
    width: 100%;
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
    padding: 1vw 0;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
}

.game:first-child {
    padding: 0;
    padding-bottom: 1vw;
}

.game:last-child {
    border: none;
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

.win {
    font-weight: bold;
    color: #3D3BF3;
}

.lose {
    font-weight: bold;
    color: #FB4141;
}

</style>