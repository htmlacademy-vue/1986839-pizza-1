<template>
  <div>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector />

          <BuilderSizeSelector />

          <BuilderIngredientsSelector />

          <BuilderPizzaView />

        </div>
      </form>
    </main>
  </div>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import { mapActions } from "vuex";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  created() {
    this.getDough();
    this.getSizes();
    this.getSauces();
    this.getIngredients();
    this.getMisc();
  },
  methods: {
    ...mapActions("Builder", [
      "getDough",
      "getSizes",
      "getSauces",
      "getIngredients"
    ]),
    ...mapActions("Cart", ["getMisc"]),
  },
};
</script>
