import { createRouter, createWebHistory } from 'vue-router';
import Team from '@/components/Team.vue'; 
import Home from '@/components/Home.vue'; 
import Position from '@/components/Position.vue';
import Admin from '@/components/Admin.vue';
import Player from '@/components/Player.vue';
import Front from '@/components/Front.vue';
import MetaLayout from '@/components/MetaLayout.vue';

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
        path: '/player/detail/:nickname/:name_eng',
        name: 'Player',
        component: Player
    },
    {
        path: '/front',
        name: 'Front',
        component: Front
    },
    {
        path: '/meta/:position',
        name: 'MetaLayout',
        component: MetaLayout,
        beforeEnter: (to, from, next) => {
            const validPositions = ['top', 'jungle', 'mid', 'adc', 'support'];
            if (validPositions.includes(to.params.position)) {
                next();
            } else {
                next('/meta/top');
            }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
