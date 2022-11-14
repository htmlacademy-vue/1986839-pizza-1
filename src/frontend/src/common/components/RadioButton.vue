<template>
  <input
    type="radio"
    :value="value"
    :checked="checked"
    v-on="$listeners"
  />
</template>

<script>
  export default {
    name: "RadioButton",
    props: {
      value: {
        type: Number,
        required: true,
      },
      checked: {
        type: Boolean,
        required: true,
      },
    },
  };
</script>
