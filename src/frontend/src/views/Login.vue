<template>
  <div class="sign-form">
    <button
      class="close close--white"
      data-test="close"
      @click="closeDialog"
    >
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </button>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form method="post" @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <AppInput
            ref="email"
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            data-test="email-component"
            :error-text="validations.email.error"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <AppInput
            v-model="password"
            type="password"
            name="pass"
            placeholder="***********"
            data-test="password-component"
            :error-text="validations.password.error"
          />
        </label>
      </div>
      <button
        type="submit"
        class="button"
      >
        Авторизоваться
      </button>
    </form>
  </div>
</template>

<script>
import AppInput from "@/common/components/AppInput";
import validator from "@/common/mixins/validator";

export default {
  name: "Login",
  components: { AppInput },
  mixins: [validator],
  data() {
    return {
      email: "",
      password: "",
      validations: {
        email: {
          error: "",
          rules: ["required", "email"],
        },
        password: {
          error: "",
          rules: ["required"],
        },
      }
    };
  },
  watch: {
    email() {
      this.$clearValidationErrors();
    },
    password() {
      this.$clearValidationErrors();
    },
  },
  mounted() {
    this.$refs.email.$refs.input.focus();
  },
  methods: {
    async login() {
      if (!this.$validateFields(
        { email: this.email, password: this.password },
        this.validations
      )) {
        return;
      }
      await this.$store.dispatch('Auth/login', {
        email: this.email,
        password: this.password
      });
      await this.$router.push({name: "index"});
    },
    closeDialog() {
      this.$router.push({ name: 'index' });
    },
  },
};
</script>

<style lang="scss" scoped>
  .close {
    padding: 0;
    border: none;
    background-color: transparent;
  }
</style>
