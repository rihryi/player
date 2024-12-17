<template>
    <div>
        <h1>{{ nickname }}</h1>
    
        <div v-if="loading">Loading ... </div>
        <div v-if="error">{{ error }}</div>
        <div v-else>
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Team</th>
                        <th>Position</th>
                        <th>Games Played</th>
                        <th>Wins</th>
                        <th>KDA</th>
                        <th>Kill Participation</th>
                        <th>Gold Diff @10</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(stat, index) in stats" :key="index">
                        <td>{{ stat.year }}</td>
                        <td>{{ stat.team }}</td>
                        <td>{{ stat.position }}</td>
                        <td>{{ stat.gamesPlayed }}</td>
                        <td>{{ stat.win }}</td>
                        <td>{{ stat.kda }}</td>
                        <td>{{ stat.killParticipation }}</td>
                        <td>{{ stat.goldDiff10 }}</td>
                    </tr>
                </tbody>
            </table>
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
            stats: [],
            loading: true,
            error: null,
        }
    },
    created() {
        this.nickname = this.$route.params.nickname;
        this.fetchPlayerStats();
    },
    methods: {
        async fetchPlayerStats() {
            try {
                const response = await axios.get(`http://localhost:3000/api/player/detail/${this.nickname}`);
                this.stats = response.data.data;
                this.loading = false;
            } catch (error) {
                this.error = 'Failed to fetch player stats';
                this.loading = false;
                console.error('Error: ', error);
            }
        }
    }
};
</script>