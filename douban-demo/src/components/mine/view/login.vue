<template>
    <div class="login">
        <div class="title" v-if="pageLogin">账号登录</div>
        <div class="title" v-if="!pageLogin">账号注册</div>
        <div class="form">
            <div class="username">
                <span>账号</span>
                <input
                    type="text"
                    v-model="form.username"
                    placeholder="请输入账号"
                    @input="ifUsername(form.username)"
                >
                <div :class="checkbox.username ?'checked':'unchecked'" :checked="checkbox.username"></div>
            </div>
            <span class="hint">格式: 以字母开头最少6位</span>
            <div class="password">
                <span>密码</span>
                <input
                    type="password"
                    v-model="form.password"
                    placeholder="请输入密码"
                    @input="ifPassword(form.password)"
                >
                <div :class="checkbox.password ?'checked':'unchecked'" :checked="checkbox.password"></div>
            </div>
            <span class="hint">格式: 最少6位</span>
            <div class="password" v-if="!pageLogin">
                <span>确认密码</span>
                <input
                    type="password"
                    placeholder="请再次输入密码"
                    v-model="form.password2"
                    @input="ifPassword2(form.password2)"
                >
                <div
                    :class="checkbox.password2 ?'checked':'unchecked'"
                    :checked="checkbox.password2"
                ></div>
            </div>
        </div>
        <div class="register" v-if="pageLogin">
            <span @click="toRegister">立即注册</span>
        </div>
        <div class="register" v-if="!pageLogin">
            <span @click="toRegister">登录</span>
        </div>
        <button
            @click="login"
            v-if="pageLogin"
            :class="(checkbox.username && checkbox.password) ?'':'disabled'"
            :disabled="checkbox.checked ?true: false"
        >登录</button>
        <button
            @click="register"
            v-if="!pageLogin"
            :class="(checkbox.username && checkbox.password2) ?'':'disabled'"
            :disabled="checkbox.checked ?true: false"
        >立即注册</button>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Indicator } from 'mint-ui';
import { Popup } from 'mint-ui';

export default {
  data() {
    return {
      pageLogin: true,
      form: {
        username: "",
        password: "",
        password2: ""
      },
      checkbox: {
        username: false,
        password: false,
        password2: false
      }
    };
  },
  methods: {
    ifUsername(val) {
      // 用户名正则：6到12位（字母，数字，下划线，减号）：
      var user = /^[a-zA-Z]\w{6,12}$/;
      if (user.test(val)) {
        this.checkbox.username = true;
      } else {
        this.checkbox.username = false;
      }
    },
    ifPassword(val) {
      // 密码强度正则：最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符：
      var pwd = /(\w){6,12}/;
      if (pwd.test(val)) {
        this.checkbox.password = true;
      } else {
        this.checkbox.password = false;
      }
    },
    ifPassword2(val) {
      if (this.form.password2 === this.form.password) {
        this.checkbox.password2 = true;
      } else {
        this.checkbox.password2 = false;
      }
    },
    // 登录
    login() {
      if (this.form.username !== "" && this.form.password !== "") {
        Indicator.open();
        this.$axios.post("/login", {
          'username': this.form.username,
          'password': this.form.password
        })
          .then(res => {
            Indicator.close();

            let data = res.data;
            if (data.ok) {
              MessageBox("提示", data.msg);
              this.$router.push('/mineindex')
              window.localStorage.islogin = data.token
            } else {
              MessageBox("提示", data.msg);
            }
          })
          .catch(err => {
            Indicator.close();

            window.console.log(err);
          });
      }else {
        MessageBox("提示", '请输入用户名,密码');
      }
    },
    // 注册
    register() {
      if (this.form.username !== "" && this.form.password !== "" && this.form.password2 !== '') {
        Indicator.open('加载中...');
        this.$axios.post("/register", {
            'username': this.form.username,
            'password': this.form.password
          })
          .then(res => {
            Indicator.close();
            let data = res.data
            if(data.ok) {
              MessageBox("提示", data.msg);
              this.$router.push('/mineindex')
              window.localStorage.islogin = data.token
            }else {
              MessageBox("提示", data.msg);
            }
          })
          .catch(err => {
            Indicator.close();
          });
      } else {
        MessageBox("提示", '请输入用户名,密码');
      }
    },
    // 跳转注册页
    toRegister() {
      this.pageLogin = !this.pageLogin;
      this.form = {
        username: "",
        password: "",
        password2: ""
      }
      this.checkbox = {
        username: false,
        password: false,
        password2: false
      }
      window.console.log(this.form)
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  flex: 1;

  .title {
    font-size: 25px;
    color: #000;
    font-weight: 700;
    margin-top: 0.3rem;
    margin-left: 5%;
    margin-bottom: 0.3rem;
  }

  .form {
    margin-left: 10%;
    font-size: 20px;
    color: #000;
    font-weight: 600;

    div {
      width: 85%;
      height: 0.6rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #aaa;

      input {
        width: 50%;
        height: 0.3rem;
        margin-left: 0.3rem;
        border: none;
      }
      input:focus {
        outline: none;
      }

      span {
        width: 0.8rem;
      }
      .unchecked {
        width: 0.15rem;
        height: 0.15rem;
        margin-right: 0px;
        border-radius: 50%;
        background: #ccc;
      }
      .checked {
        width: 0.15rem;
        height: 0.15rem;
        margin-right: 0px;
        border-radius: 50%;
        background: #42bd56;
      }
    }

    .hint {
      font-size: 12px;
      line-height: 16px;
      color: #999;
    }
  }

  .register {
    font-size: 14px;
    margin-left: 10%;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    span {
      color: #777;
    }
  }

  button {
    font-size: 25px;
    width: 80%;
    margin-left: 10%;
    box-sizing: border-box;
    background: #42bd56;
    border-radius: 5px;
    border: 1px solid #fff;
    color: #fff;
    height: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button:focus {
    outline: none;
  }

  .disabled {
    background: #ccc;
  }
}
</style>
