<template>
  <header class="header">
    <div class="header__logo">
      <router-link
        :to="{ name: 'index' }"
        class="logo"
      >
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link
        :to="{ name: 'cart' }"
      >
        {{ totalPrice }} ₽
      </router-link>
    </div>
    <div class="header__user">
      <router-link
        v-if="!isAuthenticated"
        :to="{ name: 'login' }"
        class="header__login"
        data-test="header-login"
      >
        <span>Войти</span>
      </router-link>
      <router-link
        v-else
        :to="{ name: 'profile' }"
        data-test="profile-link"
      >
        <picture>
          <source
            type="image/webp"
            :srcset="user.avatar"
          >
          <img
            :src="user.avatar"
            :srcset="user.avatar"
            :alt="user.name"
            width="32"
            height="32"
          >
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
    </div>
    <div class="header__user">
      <a
        v-if="isAuthenticated"
        href="#"
        class="header__logout"
        data-test="header-logout"
        @click="$logout"
      >
        <span>Выйти</span>
      </a>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import logout from "@/common/mixins/logout";

export default {
  name: "AppLayoutHeader",
  mixins: [logout],
  computed: {
    ...mapGetters("Cart", ["totalPrice"]),
    ...mapState("Auth", ["user", "isAuthenticated"]),
  },
};
</script>
