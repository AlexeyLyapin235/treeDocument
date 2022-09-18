<template>
  <div class="homePage">
    <h2 class="homePage__title">Документы</h2>
    <serrch-input></serrch-input>

    <div v-if="stateFilter == false" class="children__container">
      <draggable :sort="mouse" v-model="myList" tag="transition-group">
        <transition-group name="list-complete">
          <children-items
            v-for="(item, i) in myList"
            class="list-complete-item"
            :key="i"
            :i="i"
            :item="item"
            :elements="myList"
          ></children-items>
        </transition-group>
      </draggable>
    </div>

    <div v-if="stateFilter == true">
      <children-items
        v-for="(item, i) in searchedData"
        :key="i"
        :i="i"
        :item="item"
      ></children-items>
    </div>
  </div>
</template>

<script>
import ChildrenItems from "@/components/ChildrenItems.vue";
import SerrchInput from "@/components/SerrchInput.vue";
import { VueDraggableNext } from "vue-draggable-next";
import { mapState, mapMutations } from "vuex";
export default {
  name: "HomeView",
  components: {
    ChildrenItems,
    SerrchInput,
    draggable: VueDraggableNext,
  },
  data() {
    return {
      elements: "",
    };
  },
  methods: {
    ...mapMutations({
      setTasks: "SET_ITEMS",
    }),
  },
  watch: {
    //
  },
  computed: {
    ...mapState({
      items: (state) => state.items,
      stateFilter: (state) => state.stateFilter,
      searchedData: (state) => state.searchedData,
      mouse: (state) => state.mouse,
    }),

    myList: {
      get() {
        return this.items;
      },
      set(value) {
        this.setTasks(value);
      },
    },
  },

  mounted() {
    //this.elements = this.items;
  },
};
</script>
<style lang="scss">
.homePage {
  pointer-events: display;
  .homePage__title {
    display: flex;
    margin-left: 40px;
  }

  .children__container {
    margin-top: 20px;
  }

  .list-complete-item {
    transition: all 1s;
    display: flex;
    margin-right: 10px;
    margin: 1px;
  }
  .list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active до версии 2.1.8 */ {
    opacity: 1;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
}
</style>
