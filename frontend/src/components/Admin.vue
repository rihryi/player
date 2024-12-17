<template>
    <div>
        <h1>Admin 페이지</h1>
        <div class="team-buttons">
            <button
                v-for="teamName in teams" :key="teamName" @click="crawlTeamData(teamName)" :disabled="loading === teamName"
            >
                {{ teamName }} 데이터 업데이트
                <span v-if="loading === teamName">Loading...</span>
            </button>
        </div>
        <div v-if="message" :class="{'success' : !isError, 'error': isError}">
            {{ message }}
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Admin',
    data() {
        return {
            teams: ['젠지', 'T1', 'KT', 'Dplus-KIA', '한화생명', 'FearX', '광동프릭스', 'BRION', 'DRX', 'NSRedforce'],
            loading: null,
            message: '',
            isError: false
        }
    },
    methods: {
        async crawlTeamData(teamName) {
            this.loading = teamName;
            this.message = '';
            try {
                const response = await axios.post(`http://localhost:3000/api/admin/crawl/${teamName}`);
                this.message = `${teamName} 데이터가 성공적으로 업데이트되었습니다.`;
                this.isError = false;
            } catch (error) {
                this.message = `${teamName} 데이터 업데이트 실패: ${error.message}`;
                this.isError = true;
            } finally {
                this.loading = null;
            }
        }
    }
};
</script>