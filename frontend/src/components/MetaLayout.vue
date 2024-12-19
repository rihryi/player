<template>
    <div>
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
        <h1>{{ position }} 티어 TOP 3</h1>
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                </div>
                <div class="swiper-slide">
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </div>
                <div class="swiper-slide">
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </div>
                <div class="swiper-slide">
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                </div>
            </div>
            <div class="swiper-pagination"></div>   
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'MetaLayout',
    data() {
        return {
            positions: ['top', 'jungle', 'mid', 'adc', 'support'],
            position: this.$route.params.position,
            error: null,
        }
    },
    mounted() {
        this.initSwiper();
    },
    watch: {
        '$route.params.position'(newPosition) {
            this.position = newPosition;
            this.initSwiper();
        },
    },
    created() {
        this.initSwiper();
    },  
    methods: {
        initSwiper() {
            new Swiper(".mySwiper", {
                effect: "cube",
                grabCursor: true,
                cubeEffect: {
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                },
                pagination: {
                    el: ".swiper-pagination",
                },
            });
        },
    }
};
</script>

<style scoped>
.swiper {
    width: 300px;
    height: 300px;
}

.swiper-slide {
    background-position: center;
    background-size: cover;
}

.swiper-slide img {
    display: block;
    width: 100%;
}

.router_nav ul {
    width: 40vw;
    display: flex;
    justify-content: space-between;
}
</style>