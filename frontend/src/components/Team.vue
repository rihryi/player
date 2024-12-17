<template>
<div>
    <div class="team_list">
        <ul>
            <li v-for="team in teams" :key="team" @click="goToPosition(team)">
                {{ team }}
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    name: 'Team',
    data() {
        return {
            teams: ['GEN.G', 'T1', 'KT', 'Dplus-KIA', '한화생명', 'FearX', '광동프릭스', 'BRION', 'DRX', 'NSRedforce']
        };
    },
    methods: {
        goToPosition(teamName) {
            this.$router.push(`/position/${teamName}`)
        }
    }
}
</script>