<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>基本资料</span>
        </div>
        <!-- 表单 -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="登录名称" prop="username">
                <el-input type="text" disabled v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickname">
                <el-input type="text" v-model="ruleForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" prop="email">
                <el-input v-model.number="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
  
<script>
import { mapGetters } from 'vuex';
import AUTH from '@/api/user.js'

export default {
    name: 'UserInfo',
    data() {

        return {
            ruleForm: { ...this.$store.state.user.info },
            rules: {
                username: [
                    { required: true, message: '请输入您的登录名称', trigger: 'blur' },
                    { pattern: /^\S{1,10}$/, message: '登录名称必须是1-10位的非空字符串', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入您的昵称', trigger: 'blur' },
                    { pattern: /^\S{1,10}$/, message: '昵称必须是1-10位的非空字符串', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            }
        };

    },
    computed: {
        ...mapGetters('user', ['getUserinfos'])
    },
    methods: {
        submitForm() {
            this.$refs.ruleForm.validate(async (valid) => {
                if (!valid) return
                try {
                    const { data } = await AUTH.UpdateUserInfo(this.ruleForm)
                    console.log('更新用户信息成功', data)
                    if (data.code !== 0) return this.$message.error(data.message)
                    this.$message.success(data.message)
                    // 把更新后的用户信息保存到vuex中
                    this.$store.dispatch('user/getUserInfo')
                } catch (err) {
                    console.log('更新用户信息失败', err)
                }


            });
        },
        resetForm() {
            this.ruleForm = { ...this.$store.state.user.info }
        },
    }
}
</script>
  
<style lang="less" scoped>
.el-form {
    width: 500px;
}
</style>
  