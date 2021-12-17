<template>
	<el-container>
		<el-header height="140px">
			<el-col :span="24">
				<img src="./assets/logotext.png" height="60px" id="logo" />
			</el-col>
			<el-col :span="24">
				<el-menu
					:default-active="$route.path"
					class="el-menu-demo"
					mode="horizontal"
					@select="handleSelect"
					background-color="#F2F2F2"
					router
				>
					<el-menu-item index="/" id="marginL">图表分析</el-menu-item>
					<el-menu-item
						index="/about"
						:disabled="!this.$store.state.isLoginAsAdmin"
						>详情</el-menu-item
					>
					<el-button
						id="btn-login"
						type="text"
						@click="dialogFormVisible = true"
						v-if="
							!this.$store.state.isLoginAsAdmin &&
								!this.$store.state.isLoginAsUploader
						"
					>
						登录
					</el-button>
					<el-popover
						id="avatar"
						v-else
						placement="bottom"
						width="160"
						trigger="hover"
					>
						<p>用户名：{{ form.username }}</p>
						<div style="text-align: right; margin: 0">
							<el-button type="danger" size="mini" @click="logout">
								注销
							</el-button>
						</div>
						<el-avatar slot="reference">
							{{ form.username }}
						</el-avatar>
					</el-popover>
				</el-menu>
			</el-col>
		</el-header>

		<el-main id="main">
			<transition name="el-fade-in-linear" mode="out-in" appear>
				<router-view />
			</transition>
			<el-dialog title="登录" :visible.sync="dialogFormVisible" width="360px">
				<el-form :model="form">
					<el-form-item label="账号：">
						<el-input
							v-model="form.username"
							autocomplete="off"
							@keyup.enter.native="login"
						></el-input>
					</el-form-item>
					<el-form-item label="密码：">
						<el-input
							v-model="form.password"
							autocomplete="off"
							show-password
							@keyup.enter.native="login"
						></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">
						取 消
					</el-button>
					<el-button type="primary" @click="login">
						确 定
					</el-button>
				</div>
			</el-dialog>
		</el-main>

		<el-footer class="footer" height="200px">
			<div id="footer-div"></div>
		</el-footer>
	</el-container>
</template>
<script>
export default {
	data() {
		return {
			activeIndex: "/",

			avatarVisible: false,

			dialogFormVisible: false,

			form: {
				username: "",
				password: "",
			},
		};
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		login() {
			if (
				this.$data.form.username == "admin" &&
				this.$data.form.password == "admin"
			) {
				this.$store.commit("loginAsAdmin");
				this.$data.dialogFormVisible = false;
				this.$message({
					type: "success",
					message: "登录成功!",
				});
				this.$data.form.password = "";
			} else if (
				this.$data.form.username == "uploader" &&
				this.$data.form.password == "uploader"
			) {
				this.$store.commit("loginAsUploader");
				this.$data.dialogFormVisible = false;
				this.$message({
					type: "success",
					message: "登录成功!",
				});
				this.$data.form.password = "";
			} else {
				this.$message({
					showClose: true,
					message: "用户名或密码错误！",
					type: "error",
				});

				this.$data.form.password = "";
			}
		},
		logout() {
			this.$confirm("是否要注销账号?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					this.$store.commit("logout");
					this.$message({
						type: "success",
						message: "已退出账号!",
					});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "取消退出",
					});
				});
		},
	},
};
</script>
<style>
#main {
	width: 88%;
	margin: 0 auto;
}
#app {
	font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
		"Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
#btn-login {
	float: right;
	height: 60px;
	margin-right: 12%;
}
#avatar {
	float: right;
	margin-right: 12%;
	margin-top: 10px;
}
#marginL {
	margin-left: 6%;
}
#logo {
	margin-left: 6%;
}
.footer {
	background-color: #ffffff;
	margin-top: 30px;
	position: relative;
}
#footer-div {
	width: 70%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.footer strong {
	color: #505050;
}
.footer p {
	color: #707070;
}
/* #footer-div div {
	width: 200px;
} */
#div2 {
	color: #707070;
	position: relative;
	top: 90px;
}
</style>
