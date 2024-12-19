<template>
    <div class="meta_wrap">
        <div class="meta_top">
            <h1>Meta page</h1>
            <p>여기는 메타 페이지입니다.</p>
        </div>

        <div class="router_nav">
            <ul>
                <li v-for="pos in positions" :key="pos">
                    <router-link
                        :to="{ name: 'MetaLayout', params: { position: pos }}"
                        :class="{ active: currentPosition === pos}"
                    >
                    {{ pos }}
                </router-link>
                </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Meta',
    data() {
        return {
            positions: ['top', 'jungle', 'mid', 'adc', 'support']
        }
    },
    computed: {
        currentPosition() {
            return this.$route.params.position;
        }
    },
};
</script>

<style scoped>
.meta_wrap .router_nav ul {
    width: 40vw;
    display: flex;
    justify-content: space-between;
}
</style>