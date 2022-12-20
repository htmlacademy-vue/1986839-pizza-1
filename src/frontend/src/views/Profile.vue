<template>
  <div>
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <router-link
          :to="{ name: 'index' }"
          class="logo layout__logo"
        >
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          >
        </router-link>

        <router-link
          :to="{ name: 'orders' }"
          class="layout__link"
        >
          История заказов
        </router-link>
        <router-link
          :to="{ name: 'profile' }"
          class="layout__link layout__link--active"
        >
          Мои данные
        </router-link>
      </div>

      <div class="layout__content">
        <div class="layout__title">
          <h1 class="title title--big">Мои данные</h1>
        </div>

        <div
          v-if="user"
          class="user"
        >
          <picture>
            <source
              type="image/webp"
              :srcset="user.avatar"
            />
            <img
              :src="user.avatar"
              :srcset="user.avatar"
              :alt="user.name"
              width="72"
              height="72"
            />
          </picture>
          <div class="user__name">
            <span>{{ user.name }}</span>
          </div>
          <p class="user__phone">
            Контактный телефон: <span>{{ user.phone }}</span>
          </p>
        </div>

        <div
          v-for="address in addresses"
          :key="address.id"
          class="layout__address"
        >
          <ProfileAddress
            v-if="address.id === editableAddressId"
            :address="address"
            :user="user"
            data-test="address-edit-form"
          />
          <div
            v-else
            data-test="address-form"
            class="sheet address-form"
          >
            <div class="address-form__header">
              <b>Адрес №{{ address.id }}. {{ address.name }}</b>
              <div class="address-form__edit">
                <button
                  type="button"
                  class="icon"
                  data-test="address-edit-button"
                  @click="openFormToEdit(address.id)"
                >
                  <span class="visually-hidden">Изменить адрес</span>
                </button>
              </div>
            </div>
            <p>ул. {{ address.street }}, д. {{ address.building }}{{ address.flat ? ", кв. " + address.flat : "" }}</p>
            <small>{{ address.comment }}</small>
          </div>
        </div>

        <div
          v-if="newAddressForm"
          class="layout__address"
        >
          <ProfileAddress
            :address="newAddressData"
            :user="user"
            data-test="address-add-form"
          />
        </div>

        <div class="layout__button">
          <button
            type="button"
            class="button button--border"
            data-test="address-add-button"
            @click="openNewAddressForm"
          >
            Добавить новый адрес
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import ProfileAddress from "@/views/ProfileAddress";

export default {
  name: "Profile",
  components: {
    ProfileAddress,
  },
  data() {
    return {
      newAddressData: {
        id: null,
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      },
      editableAddressId: null,
      newAddressForm: false,
    };
  },
  created() {
    this.getAddresses();
  },
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Addresses", ["addresses"]),
  },
  methods: {
    ...mapActions("Addresses", ["getAddresses"]),

    openFormToEdit(id) {
      this.newAddressForm = false;
      this.editableAddressId = id;
    },

    openNewAddressForm() {
      this.editableAddressId = null;
      this.newAddressForm = true;
    }
  }
};
</script>
