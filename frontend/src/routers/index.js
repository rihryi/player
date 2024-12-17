import { createRouter, createWebHistory } from 'vue-router';
import Team from '@/components/Team.vue'; 
import Home from '@/components/Home.vue'; 
import Position from '@/components/Position.vue';
import Admin from '@/components/Admin.vue';
import Player from '@/components/Player.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/teams',
        name: 'Team',
        component: Team
    },
    {
        path: '/position/:teamName',
        name: 'Position',
        component: Position
    },
    {
        path: '/player/detail/:nickname',
        name: 'Player',
        component: Player
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
