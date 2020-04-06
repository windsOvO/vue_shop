<template>
    <div class="login_container">
        <div class="login_box">
            <!-- avatar area -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
<!--            login form area -->
            <el-form :model="loginForm"
                     :rules="loginFormRules"
                     label-width="0px"
                     class="login_form"
                     ref="loginFormRef">
<!--                user-->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username"
                              prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
<!--                password-->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password"
                              prefix-icon="iconfont icon-3702mima"
                              type="password"></el-input>
                </el-form-item>
<!--                buttons area-->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登陆</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                // login data bind object
                loginForm: {
                    username: 'admin',
                    password: '123456'
                },
                // form validation verify object
                loginFormRules: {
                    username: [
                        { required: true, message: '请输入登录名称', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入登录密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            resetLoginForm () {
                this.$refs.loginFormRef.resetFields()
            },
            login() {
                this.$refs.loginFormRef.validate(async valid => {
                    if (!valid) return
                    // xx:xxx - 参数解构 parameter analyse
                    const { data:res } = await this.$http.post('login', this.loginForm)
                    if (res.meta.status !== 200)
                        return this.$message.error('登录失败')
                    this.$message.success('登录成功')
                    // 通过sessionStorage存储token到客户端
                    window.sessionStorage.setItem("token", res.data.token)
                    // 异步函数在async里要await
                    await this.$router.push('/home')
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns {
    display: flex;
    justify-content: flex-end;
}
</style>
