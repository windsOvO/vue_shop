<template>
    <el-aside :width="isCollapse ? '64px' : '200px'">
<!--        button area-->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
<!--        menu area-->
        <el-menu background-color="#333744"
                 text-color="#fff"
                 active-text-color="#409EFF"
                 unique-opened
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 router
                 :default-active="activePath">
            <!--                 elementui自带router-->
            <!--            一级菜单的内容-->
            <!--        number + string = string-->
            <el-submenu v-for="item in menuList"
                        :key="item.id"
                        :index="item.id + ''">
                <template slot="title">
                    <i :class="iconsObj[item.id]"></i>
                    <span>{{ item.authName }}</span>
                </template>
                <!--            二级菜单的内容-->
                <el-menu-item v-for="subItem in item.children"
                              :key="subItem.id"
                              :index="'/' + subItem.path">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>{{ subItem.authName }}</span>
                    </template>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: "SideMenu",
        data () {
          return {
              menuList: [],
              // 键值对添加正确icon
              iconsObj: {
                  '125': 'iconfont icon-user',
                  '103': 'iconfont icon-tijikongjian',
                  '101': 'iconfont icon-shangpin',
                  '102': 'iconfont icon-danju',
                  '145': 'iconfont icon-baobiao'
              },
              isCollapse: false,
          }
        },
        computed: {
            activePath () {
                return this.$route.path
            }
        },
        methods: {
            async getMenuList() {
                const { data: res} = await this.$http.get('menus')
                // console.log(res)
                if (res.meta.status !== 200)
                    return this.$message.error(res.meta.msg)
                this.menuList = res.data
            },
            toggleCollapse () {
                this.isCollapse = !this.isCollapse
            }
        },
        created() {
            this.getMenuList()
        }
    }
</script>

<style lang="less" scoped>
.el-menu {
    border-right: none;
}

.iconfont {
    margin-right: 10px;
}

.toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
