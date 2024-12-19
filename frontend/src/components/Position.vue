<template>
    <div>
        <h1>{{ $route.params.teamName }} POSITION</h1>
        <div v-if="loading">
            <div class="loading">
                <i class="fa-solid fa-spinner"></i>
                <p>Loading...</p>
            </div>
        </div>
        <div v-else>
            <div class="position_list">
                <table>
                    <thead>
                        <tr>
                            <td v-for="player in players" :key="player.id">
                                {{ player.position }}
                            </td>
                        </tr>
                        <tr>
                            <td v-for="player in players" :key="player.id">
                                <router-link :to="{ name: 'Player', params: {nickname: player.nickname, name_eng: player.name_eng}}">
                                    <div class="player_img">
                                        <img :src="player.img_url" :alt="player.nickname">
                                    </div>
                                    <div class="player_txt">
                                        {{ player.nickname }}
                                    </div>
                                </router-link>
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Position',
    data() {
        return {
            players: [],
            length: 0,
            loading: true,
        };
    },
    async created() {
        try {
            const teamName = this.$route.params.teamName;
            const response = await axios.get(`/api/position/${teamName}`);
            this.players = response.data.players;
            this.length = this.players.length;
            this.loading = false;

            if (this.players.length === 0) {
                this.error = '해당 팀의 선수 데이터가 없습니다. 관리자에게 문의하세요.';
                this.loading = false;
            }
        } catch (error) {
            this.error = '선수 데이터를 불러오는데 실패하였습니다.';
            console.error(error);
            this.loading = false;
        } 
    },
};
</script>

<style scoped>
.position_list, .loading {
    height: 50vh;
}

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
</style>