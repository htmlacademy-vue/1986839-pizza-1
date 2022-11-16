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
            :dough.sync="dough"
          />

          <BuilderSizeSelector
            :pizza="pizza"
            :pizzaOrder="pizzaOrder"
            :size.sync="size"
          />

          <BuilderIngredientsSelector
            :pizza="pizza"
            :pizzaOrder="pizzaOrder"
            :sauce.sync="sauce"
            :ingredient.sync="ingredient"
          />

          <BuilderPizzaView
            :pizza="pizza"
            :pizzaOrder="pizzaOrder"
            :pizzaName="pizzaName"
            @setOrderIngredient="setOrderIngredient"
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
      dough: 1,
      size: 1,
      sauce: 1,
      ingredient: {
        id: 0,
        count: 0,
      },
    };
  },
  components: {
    AppLayout,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  created() {
    this.$watch('dough', () => {
      this.pizzaOrder['dough'] = {
        ...this.pizza['dough'].find((item) => item.id === +this.dough),
      };
    })

    this.$watch('size', () => {
      this.pizzaOrder['sizes'] = {
        ...this.pizza['sizes'].find((item) => item.id === +this.size),
      };
    })

    this.$watch('sauce', () => {
      this.pizzaOrder['sauces'] = {
        ...this.pizza['sauces'].find((item) => item.id === +this.sauce),
      };
    })

    this.$watch('ingredient', () => {
      this.setOrderIngredient(this.ingredient);
    })
  },
  methods: {
    setName(name) {
      this.pizzaName = name;
    },
    setOrderIngredient({ id, count }) {
      const itemIndex = this.pizzaOrder['ingredients'].findIndex(
        (item) => item.id === id
      );
      if (~itemIndex) {
        if (count === 0) {
          this.pizzaOrder['ingredients'].splice(itemIndex, 1);
        } else {
          this.pizzaOrder['ingredients'][itemIndex].count = count;
        }
      } else {
        this.pizzaOrder['ingredients'].push({
          ...(this.pizza['ingredients'].filter((item) => item.id === id)[0] || []),
          count,
        });
      }
    },
  },
};
</script>
