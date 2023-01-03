<template>
    <!-- 注册页面的整体盒子 -->
    <div class="reg-container">
        <!-- 注册的盒子 -->
        <div class="reg-box">
            <!-- 标题的盒子 -->
            <div class="title-box"></div>
            <!-- 注册的表单区域 -->
            <el-form :model="form" ref="ruleForm" :rules="ruleForm" class="ele-form">
                <el-form-item prop="username">
                    <el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" prefix-icon="el-icon-lock"
                        placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="repassword">
                    <el-input v-model="form.repassword" type="password" prefix-icon="el-icon-lock"
                        placeholder="请确认密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%;" @click="register">注册</el-button>
                    <el-link @click="$router.push('/login')">去登录</el-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<script>
import AUTH from '@/api/user.js'
export default {
    name: 'Reg',
    data() {
        //自定义校验函数 校验两次输入的密码必须一致!
        //rule  指当前的校验规则
        //value  指当前输入框的值
        //callback是回调函数  指如果错误,就传入一个错误的值,如果没有错误,就放行
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            form: {
                username: '',
                password: '',
                repassword: ''
            },
            ruleForm: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的字母数字', trigger: 'blur' }
                ],
                password: [
                    //必填校验
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    //正则校验
                    { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' }
                ],
                repassword: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    //校验两次输入的密码必须一致!  用validator调用自定义校验函数
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 注册新用户
        register() {
            // 进行表单预验证
            this.$refs.ruleForm.validate(async (valid) => {
                if (!valid) return  // valid是一个布尔值,如果有一个校验不通过就为false,就返回,不往下执行,校验全部通过,才为true
                try {
                    const res = await AUTH.UserRegister(this.form)
                    console.log('用户注册请求', res);
                    if (res.data.code !== 0) return this.$message.error(res.data.message)
                    this.$router.push('/login')
                } catch (err) {
                    console.log('用户注册请求', err)
                }
            })
        }
    }
}

</script>
  
<style lang="less" scoped>
.reg-container {
    background: url('~@/assets/images/login_bg.jpg') center;
    background-size: cover;
    height: 100%;

    .reg-box {
        width: 400px;
        height: 335px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .title-box {
            height: 60px;
            background: url('../../assets/images/login_title.png') center no-repeat;
        }

        .ele-form {
            padding: 0 25px;
        }
    }
}
</style>
  
  