<template>
  <draggable
    :sort="subMouse"
    class="dragArea"
    tag="ul"
    :list="tasks"
    :group="{ name: 'g1' }"
  >
    <transition-group name="list-complete">
      <sub-items
        :child="child"
        class="items list-complete-item"
        v-for="child in tasks"
        :key="child.id"
        @delSubItem="deleteItemsChild"
      >
      </sub-items>
    </transition-group>
  </draggable>
</template>
<script>
import SubItems from "../SubItems.vue";
import { VueDraggableNext } from "vue-draggable-next";

import { mapMutations, mapState } from "vuex";
export default {
  props: {
    child: Object,
    item: Object,
    tasks: {
      required: true,
      type: Array,
    },
  },
  name: "nested-draggable",
  components: {
    draggable: VueDraggableNext,
    SubItems,
  },
  data() {
    return {
      removeText: false,
    };
  },
  methods: {
    ...mapMutations({
      sumMouse: "SET_SUBMOUSE",
    }),
    deleteItemsChild(child) {
      this.item.children = this.item.children.filter(
        (el) => el.id !== child.id
      );
    },
  },
  computed: {
    ...mapState({
      subMouse: (state) => state.subMouse,
    }),
  },
};
</script>
<style></style>
