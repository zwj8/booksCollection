<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>更换头像</span>
        </div>
        <!-- 选择头像部分 -->
        <div>
            <div>
                <img :src=imgUrl alt="" v-if="imgUrl">
                <img src="@/assets/images/avatar.jpg" v-else alt="">
            </div>
            <div class="button">
                <input type="file" style="display: none;" ref="inputfile" @change="choseImg">
                <el-button type="primary" icon="el-icon-plus" @click="$refs.inputfile.click()">选择图片</el-button>
                <el-button type="success" icon="el-icon-upload" :disabled="!imgUrl" @click="update">上传头像</el-button>
            </div>
        </div>
    </el-card>
</template>
<script>
import AUTH from "@/api/user.js";
export default {
    data() {
        return {
            //储存base64字符串头像
            imgUrl: '',
        };
    },
    methods: {
        choseImg(e) {
            console.log(e.target.files);
            if (e.target.files.length) {
                //有就上传的有图片
                const files = e.target.files[0]
                // console.log(files);
                //把图片转化为base64字符串渲染到页面
                //创建一个FileReader构造函数
                const filereader = new FileReader();
                // 将文件以Data URL形式读入页面
                filereader.readAsDataURL(files);
                //修改了函数外的this指向
                const that = this;
                //在文件读取结束后调用
                filereader.onload = function () {
                    // console.log(this.result); //读取结果
                    //把转化好的base64字符串赋值给src的路径
                    that.imgUrl = this.result
                };
                //否则length为0就没有上传图片
            } else {
                this.imgUrl = ''
            }
        },
        async update() {
            const params = {
                avatar: this.imgUrl
            }
            try {
                const { data: res } = await AUTH.UpdateAvator(params)
                console.log('头像更新成功', res)
                if (res.code !== 0) this.$message.error(res.message)
                this.$message.success(res.message)
                // 从新获取用户信息
                this.$store.dispatch('user/getUserInfo')
                this.imgUrl = ''
            } catch (err) {
                console.log('头像更新失败', err)
            }
        },
    },

}

</script>

<style lang='less'  scoped>
.button {
    margin-top: 20px;
    margin-left: 50px;
}
</style>


<style>

</style>

