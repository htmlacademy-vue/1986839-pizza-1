<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="test"
          class="select"
          data-test="cart-form-select"
          @change="changeAddress($event.target.value)"
        >
          <option value="pickup">Заберу сам</option>
          <option value="newAddress">Новый адрес</option>
          <option
            v-for="address in addresses"
            :key="address.id"
            :value="address.id"
            data-test="user-addresses"
          >
            {{ address.name }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          v-model="phone"
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          @change="setOrderAddress"
        >
      </label>

      <div
        v-if="isAddressFormDisplayed"
        class="cart-form__address"
        data-test="cart-form-address"
      >
        <span class="cart-form__label">{{ addressFormName }}:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              v-model="street"
              type="text"
              name="street"
              required
              :disabled="isAddressDisabled"
              @change="setOrderAddress"
            >
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              v-model="building"
              type="text"
              name="house"
              required
              :disabled="isAddressDisabled"
              @change="setOrderAddress"
            >
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              v-model="flat"
              type="text"
              name="apartment"
              :disabled="isAddressDisabled"
              @change="setOrderAddress"
            >
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "CartOrder",
  data() {
    return {
      deliveryOption: "pickup",
      addressId: null,
      phone: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
      addressFormName: "Новый адрес",
    };
  },
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Addresses", ["addresses"]),

    isAddressFormDisplayed() {
      return this.deliveryOption !== "pickup";
    },

    isAddressDisabled() {
      return this.deliveryOption !== "newAddress";
    }
  },
  async mounted() {
    if (this.user) {
      this.phone = this.user.phone;
      await this.getAddresses();
    }
  },
  methods: {
    ...mapActions("Addresses", ["getAddresses"]),

    changeAddress(value) {
      this.deliveryOption = value;
      if (value === "newAddress") {
        this.addressId = null;
        this.street = "";
        this.building = "";
        this.flat = "";
        this.comment = "";
        this.addressFormName = "Новый адрес";
      } else if (value !== "pickup") {
        const address = this.addresses.find((address) => address.id === +value);
        this.addressId = address.id;
        this.street = address.street;
        this.building = address.building;
        this.flat = address.flat;
        this.comment = address.comment;
        this.addressFormName = "Адрес";
      }

      this.setOrderAddress();
    },

    setOrderAddress() {
      const formAddress = {
        id: this.addressId,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment,
      };

      this.$emit("setAddress", {
        phone: this.phone,
        address: this.deliveryOption === "pickup" ? null : formAddress,
      });
    }
  },
};
</script>
