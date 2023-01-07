<template>
    <el-container class="main-container">
        <!-- 头部区域 -->
        <el-header>
            <!-- 左侧的 logo -->
            <img src="../../assets/images/logo.png" alt="" />
            <!-- 右侧的菜单 -->
            <el-menu class="el-menu-top" mode="horizontal" background-color="#23262E" text-color="#fff"
                active-text-color="#409EFF">
                <el-submenu index="1">
                    <template slot="title">
                        <!-- 头像 -->
                        <img :src="getUserinfos.user_pic" v-if="getUserinfos.user_pic" alt="" class="avatar" />
                        <img src="../../assets/images/user.jpg" v-else alt="" class="avatar" />
                        <span>个人中心</span>
                    </template>
                    <el-menu-item index="1-1"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
                    <el-menu-item index="1-2"><i class="el-icon-camera"></i>更换头像</el-menu-item>
                    <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
                </el-submenu>
                <el-menu-item index="2" @click="logout"> <i class="el-icon-switch-button"></i>退出</el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <!-- 侧边栏区域 -->
            <!-- 左侧边栏区域 -->
            <el-aside width="200px">
                <div class="user-box">
                    <img :src="getUserinfos.user_pic" v-if="getUserinfos.user_pic" alt="" />
                    <img src="../../assets/images/user.jpg" v-else alt="" />
                    <span>欢迎 {{ getUserinfos.nickname || getUserinfos.username }}</span>
                </div>
                <!-- 左侧菜单栏区域 -->
                <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#23262E" text-color="#fff"
                    active-text-color="#409EFF" unique-opened router>
                    <div v-for="item in menu" :key="item.indexPath">
                        <!-- 不包含子菜单的“一级菜单” -->
                        <el-menu-item :index="item.indexPath" v-if="!item.children"><i :class="item.icon"></i>{{
        item.title
}}</el-menu-item>
                        <!-- 包含子菜单的“一级菜单” -->
                        <el-submenu :index="item.indexPath" v-else>
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span>{{ item.title }}</span>
                            </template>
                            <el-menu-item v-for="child in item.children" :key="child.indexPath"
                                :index="child.indexPath"><i :class="child.icon"></i>{{ child.title }}</el-menu-item>

                        </el-submenu>
                    </div>
                </el-menu>
            </el-aside>
            <el-container>
                <!-- 页面主体区域 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
                <!-- 底部 footer 区域 -->
                <el-footer>© www.itheima.com - 黑马程序员</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>
  
<script>
import AUTH from '@/api/user.js'
import { mapGetters } from 'vuex'
export default {
    name: 'Main',
    data() {
        return {
            menu: [] //左侧菜单信息
        }
    },
    created() {
        this.$store.dispatch('user/getUserInfo')
        this.getUserMenu()
    },
    computed: {
        ...mapGetters('user', ['getUserinfos'])
    },
    methods: {
        logout() {
            this.$confirm('您确定退出?, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
                this.$store.commit('user/deleteToken', '') //清空token,跳到登录页
                this.$router.push('/login')

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出'
                });
            });
        },
        //获取左侧菜单
        async getUserMenu() {
            try {
                const { data: res } = await AUTH.UserMenu()
                console.log('获取左侧菜单成功', res)
                if (res.code !== 0) return this.$message.error(res.message);
                // 保存数据
                this.menu = res.data
            } catch (err) {
                console.log('获取左侧菜单失败', err)
            }
        },
    }
}
</script>
  
<style lang="less" scoped>
.main-container {
    height: 100%;

    .el-header,
    .el-aside {
        background-color: #23262e;
        // 侧边栏菜单的样式

        .el-submenu,
        .el-menu-item {
            width: 200px;
            user-select: none;
        }

    }

    // 左侧边栏用户信息区域
    .user-box {
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        user-select: none;

        img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #fff;
            margin-right: 15px;
            object-fit: cover;
        }

        span {
            color: white;
            font-size: 12px;
        }
    }

    .el-header {
        padding: 0;
        display: flex;
        justify-content: space-between;
    }

    .el-main {
        overflow-y: scroll;
        height: 0;
        background-color: #F2F2F2;
    }

    .el-footer {
        background-color: #eee;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.avatar {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background-color: #fff;
    margin-right: 10px;
    object-fit: cover;
}
</style>
  