<template>
    <el-container class="home-container">
<!--        head area-->
        <el-header>
            <div>
                <img src="../assets/logo.png" alt="">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
<!--        main area-->
        <el-container>
<!--            left area-->
            <side-menu></side-menu>
<!--            right area-->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import SideMenu from "@/components/SideMenu";
    export default {
        name: "Home",
        components: {
          SideMenu
        },
        methods: {
            logout() {
                window.sessionStorage.clear()
                this.$router.push('/login')
            }
        }
    }
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
}

.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
        display: flex;
        align-items: center;
        span {
            margin-left: 15px;
        }
    }
    img {
        width: 20%;
        height: 20%;
    }
}

.el-aside {
    background-color: #333744;
}

.el-main {
    background-color: #eaedf1;
}
</style>
