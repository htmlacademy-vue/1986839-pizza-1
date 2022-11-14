<template>
  <div>
    <AppLayout />

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <BuilderDoughSelector
            :pizza="pizza"
            :pizzaOrder="pizzaOrder"
            @changePizzaOrder="changePizzaOrder"
          />

          <BuilderSizeSelector
            :pizza="pizza"
            :pizzaOrder="pizzaOrder"
            @changePizzaOrder="changePizzaOrder"
          />

          <BuilderIngredientsSelector
            :pizza="pizza"
            :pizzaOrder="pizzaOrder"
            @changePizzaOrder="changePizzaOrder"
          />

          <BuilderPizzaView
            :pizza="pizza"
            :pizzaOrder="pizzaOrder"
            :pizzaName="pizzaName"
            @changePizzaOrder="changePizzaOrder"
            @setName="setName"
          />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
import AppLayout from "@/layouts/AppLayout";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

export default {
  name: "Index",
  data() {
    return {
      misc,
      pizza,
      user,
      pizzaOrder: {
        dough: { ...pizza.dough[0] },
        sizes: { ...pizza.sizes[0] },
        sauces: { ...pizza.sauces[0] },
        ingredients: [],
      },
      pizzaName: "",
    };
  },
  components: {
    AppLayout,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  methods: {
    setName(name) {
      this.pizzaName = name;
    },
    changePizzaOrder(obj) {
      if (obj.pizzaOrderParam === "ingredients") {
        this.setOrderIngredient(obj);
      } else {
        this.setOrderParam(obj);
      }
    },
    setOrderParam({ pizzaOrderParam, id }) {
      this.pizzaOrder[pizzaOrderParam] = {
        ...this.pizza[pizzaOrderParam].find((item) => item.id === +id),
      };
    },
    setOrderIngredient({ pizzaOrderParam, id, count }) {
      const itemIndex = this.pizzaOrder[pizzaOrderParam].findIndex(
        (item) => item.id === id
      );
      if (~itemIndex) {
        const ingredient = this.pizzaOrder[pizzaOrderParam][itemIndex];
        const ingredientNewCount = ingredient.count + count;
        if (ingredientNewCount === 0) {
          this.pizzaOrder[pizzaOrderParam].splice(itemIndex, 1);
        } else {
          ingredient.count = ingredientNewCount;
        }
      } else {
        this.pizzaOrder[pizzaOrderParam].push({
          ...(this.pizza[pizzaOrderParam].filter((item) => item.id === id)[0] || []),
          count,
        });
      }
    },
  },
};
</script>
