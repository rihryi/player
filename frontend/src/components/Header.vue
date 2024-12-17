<template>
    <div>
        <div class="header_menu">
            <ul>
                <li><a href="/">home</a></li>
                <li><a href="/teams">team</a></li>
                <li><a href="#">rank</a></li>
                <li><a href="#">meta</a></li>
                <li><a href="#">board</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
.header_menu {
    display: flex;
    justify-content: flex-end;
}

.header_menu ul {
    display: flex;
    justify-content: space-between;
    width: 30vw;
}
</style>