<template>
  <ul class="items__list">
    <li>
      <div class="items__list-content">
        <button
          class="items__togle"
          @click="toggleChildren"
          v-if="item.children && item.children.length > 0"
        >
          <div
            v-if="viewChildren"
            class="arrow_example"
            style="width: 50px; height: 50px"
          ></div>
          <div
            v-if="viewChildren == false"
            class="arrow_example__togle"
            style="width: 50px; height: 50px"
          ></div>
        </button>

        <span v-if="removeText == false" class="items__list-name">{{
          item.name
        }}</span>
        <input
          v-if="removeText == true"
          class="items__list-name"
          v-model="item.name"
        />
        <span class="items__Importance">{{ item.Importance }}</span>
        <div class="items__buttons">
          <button
            class="items__buttons-delete"
            value="{{item.id}}"
            @click="deleteItems(item)"
          >
            <img
              class="items__buttons-delete__image"
              src="@/assets/delete.svg"
            />
          </button>
          <button
            class="items__buttons-remove"
            v-if="removeText == false"
            @click="removeText = true"
          >
            <img
              class="items__buttons-remove__image"
              src="@/assets/Vector4.svg"
            />
          </button>
          <button
            class="items__buttons-save"
            v-if="removeText == true"
            @click="removeText = false"
          >
            <img
              class="items__buttons-save__image"
              src="data:image/png;base64,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"
            />
          </button>
          <button
            class="items__buttons-drop"
            @mouseover="this.mouse(true)"
            @mouseleave="this.mouse(false)"
          >
            <img
              class="items__buttons-drop__image"
              src="@/assets/Vector3.svg"
            />
          </button>
        </div>
      </div>
      <div v-if="viewChildren" class="items__children">
        <nested-draggable :tasks="item.children" :item="item" />
        <transition-group name="list-complete"> </transition-group>
      </div>
    </li>
  </ul>
</template>
<script lang="js">
import { VueDraggableNext } from "vue-draggable-next";
import nestedDraggable from "./infra/nested";
import SubItems from "./SubItems.vue";
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  components: {
    draggable: VueDraggableNext,
    SubItems,
    nestedDraggable
  },
  name: "ChildrenItems",
  props: {
    item: Object,
  },
  data() {
    return {
      ind:0,
      viewChildren: false,
      removeText: false,
      toggle: false,

    };
  },
  methods: {

    ...mapMutations({
      deleteItem: "DELETE_ITEMS",
      setItem:'SET_ITEMS',
      mouse:'SET_MOUSE',

    }),
    ...mapActions({
      filteredItems: "removeItem",
    }),
    toggleChildren() {
      this.viewChildren = !this.viewChildren;

    },
   async deleteItems(item) {
       const acx = this.items.filter((el)=> Number(el.id) !== Number(item.id) )
       this.setItem(acx)
    },
},
  computed: {
    ...mapState({
      items: (state) => state.items,
    }),
  },
}
</script>
<style lang="scss">
.items__list {
  .items__children {
    .list-complete-item {
      transition: all 3s;
      display: flex;
      margin-left: -40px;
    }
    .list-complete-enter,
    .list-complete-leave-to {
      opacity: 0;
      transform: translateY(30px);
    }
    .list-complete-leave-active {
      position: absolute;
    }
  }

  .items__list-content {
    display: flex;
    align-items: center;

    .items__list-name {
      margin-left: 10px;
      border: 0px;
      color: black;
      font-size: 17px;
      width: 400px;
      display: flex;
    }
    .items__Importance {
      font-size: 11px;
    }
    .items__buttons {
      position: absolute;
      right: 0px;
      margin-right: 10px;
      .items__buttons-remove {
        border: 0px;
        background: white;
        .items__buttons-remove__image {
          border: 0px;
          width: 18px;
          height: 20px;
        }
      }
      .items__buttons-delete {
        border: 0px;
        background: white;
        .items__buttons-delete__image {
          border: 0px;
          width: 18px;
          height: 20px;
        }
      }

      .items__buttons-save {
        border: 0px;
        background: white;
        .items__buttons-save__image {
          border: 0px;
          width: 18px;
          height: 20px;
        }
      }
      .items__buttons-drop {
        border: 0px;
        background: white;
        .items__buttons-drop__image {
          border: 0px;
          width: 18px;
          height: 20px;
        }
      }
    }
    .items__togle {
      border-radius: 50%;
      margin-left: 15px;
      width: 25px;

      height: 25px;

      border: 0.2px solid #bfc9e0;
      .arrow_example {
        width: 6px !important;
        height: 7px !important;
        border-top: 2px solid blue !important;
        border-right: 2px solid blue !important;

        transform: rotate(-45deg);
        display: inline-block;
        transition: 1s;
      }
      .arrow_example__togle {
        width: 6px !important;
        height: 7px !important;
        border-top: 2px solid blue !important;
        border-right: 2px solid blue !important;

        transform: rotate(132deg);
        display: inline-block;
        transition: 1s;
      }
    }

    width: 1190px;
    height: 48px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, -0.75));
    border: 1px solid #bfc9e0;
  }
}

ul {
  list-style: none;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
