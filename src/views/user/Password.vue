<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>重置密码</span>
        </div>
        <!-- 表单 -->
        <el-form :model="pwdForm" :rules="pwdFormRules" ref="pwdFormRef" label-width="100px">
            <el-form-item label="原密码" prop="old_pwd">
                <el-input v-model="pwdForm.old_pwd" type="password" minlength="6" maxlength="15"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_pwd">
                <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="re_pwd">
                <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="resetPass">修改密码</el-button>
                <el-button @click="resetfrom">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
  
<script>
import AUTH from '@/api/user.js'
export default {
    name: 'UserPwd',
    data() {
        //自定义校验新旧密码不能相同
        const samePwd = (rules, value, callback) => {
            //新输入的密码与旧密码不能相同
            if (value === this.pwdForm.old_pwd) {
                callback(new Error('新旧密码不能相同!'))
            } else {
                callback()
            }
        }
        //自定义校验新旧密码不能相同
        const resPwd = (rules, value, callback) => {
            //请与新密码必须保持一致
            if (value !== this.pwdForm.new_pwd) {
                callback(new Error('请与新密码保持一致!'))
            } else {
                callback()
            }
        }
        return {
            // 表单的数据对象
            pwdForm: {
                old_pwd: '',
                new_pwd: '',
                re_pwd: ''
            },
            // 表单的验证规则对象
            // 表单的验证规则对象
            pwdFormRules: {
                old_pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' }
                ],
                new_pwd: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
                    { validator: samePwd, trigger: 'blur' }
                ],
                re_pwd: [
                    { required: true, message: '请再次确认新密码', trigger: 'blur' },
                    { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
                    { validator: resPwd, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        resetfrom() {
            this.$refs.pwdFormRef.resetFields()
        },
        async resetPass() {
            try {
                const { data: res } = await AUTH.UpdatePassword(this.pwdForm)
                console.log('更新密码成功', res)
                if (res.code !== 0) return this.$message.error(res.message)
                this.$message.success(res.message)
                //清空表单
                this.resetfrom()
            } catch (err) {
                console.log('更新密码失败', err)
            }
        },
    }
}
</script>
  
<style lang="less" scoped>
.el-form {
    width: 500px;
}
</style>
  