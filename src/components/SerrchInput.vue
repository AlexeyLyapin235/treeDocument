<template>
  <div class="search__container">
    <input class="search" v-model="search" @change="searchGetters" />
    <button @click="clearnSearch" v-if="search !== ''" class="search__clean">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAANlBMVEX////mAADzAADvAADqAAD4AAD0PT2LAADUAAD5oqK0eXnwEhL+4eHo1tb8bm6KMTG7FRXhkpLs7cyuAAAE4klEQVR4nM3biXLaMBSFYbwAJmSB93/ZWrZlvGg5Vzr3TkVnQgqOPn7LtGFGl0t4fD8iDyiNx7fs+d+/N1Ph4/YrEo6+p6XwMU4nEY6+69VQOPquV4Fw8o3DSjj5BELvs2q4+GDh6jNquPpA4dZn0XDjg4Q7n0HDnQ8QHn3aDQ++rPDkU2548mWEIZ9mw4AvKQz6FBsGfQlhzKfVMOKLCqM+JWHUFxEmfCrChC8oTPoUhElfQJjx0YUZ30mY9ZGFWd9BCPioQsC3E0I+ohDybYSgjybM+tq9EPaRhEi/diMU+ChCtF/rhe9Xs3tAWQj2a+cvzet9uXzdG/fN/FepG0M4+dLTtB9ic/9yB03C68eQbl8lXHy5eRbn4puF7e6xyCtrK4VQv9W/+nzDXEL/aLEQ6udfwda3rsN8wZqG3gcEPPq8EBqlwtGHTTDNcfCtQmCFuMMLhM6H/PTA+RU2vBY1nH3F/UQN24KGiw/LF/b5dxuooVQo6dfGfIsQ/jEC4XJ9YCso7vsIoYy4kNRvFcJrGRRWvr8chQP+WltIKOs3pH0yIdRQ1i/rEwrzDSU+oB+9Ib0fuaFCP2pDlX7Ehkr9aEJFH0Wo6iOsQ2WfTNidG6r7FmEHjfZ0lkcfdqg7usznhcjNEXdC58MObct9/iyj82yERr71LEPzbBqa+daGeeO0lhYh7qtYf1th1+WvlWm6WTj7sMujq/V5ITZb141CyfVL8EmEjvi8WftEQneWYR/j/EqFbYesVz9YPmFDdFRfv9pCpk9DyPXxhWwfW8j3cYUaPqZQx8cTavlYQj0fR6jpW4R9xU3ZV99Q21fbUN9X19DCV9PQxjcJW7feZaPvWiOfFwqHoW9tKHp/sfQVNDT2TUJZQGPfKHz1eMLxmS9j3+XxXGZG/ozjab0/5fYULMC+b0x3fwh9s9F6f4oI54Zlw4J+bpgJxb6FaNWwxDcPG2G5r28shBU+k4Z1Pv2GlT71hvU+3YbO1/zHQkI/VSGl3wTUEZL6zUSd/SmUfjOQLxx9DW0oCCdfT7yRhc5H5ZGF8/nFwjTQM6fB3J+C6vqmm+9Bz+btTwH7jbeuWYh2QtH6G38/d7/Rw+uBsz8Ff/9wnx+4zxzwIxj7U9C5+mb+fEMkHOr3p+A1/OcvEmHl/w8L+kmFVWe5qJ+hsLCfWFi6Dov7SYWF67Cin7hhibCqn1zYFOxPqfMpNyT4VIUUn+K1TPKpNaT5lBoSfSoNqT6FhmQfvSHdR37HVvBRG4p8vWR/imAdJhqq9CM2VOpHa6joozRU9RGuZWVfdcOjb0h8KfIhwmF797Q/BX91Zb6dcPeKh+Asx/0pwddB9VVcyyb9MsLhdOfT0MxXeC3HfMELpM5XdC2/X/4j2fzyq/ZthdnJ3Hi9Lz9/949Q3XdqmGbe/34uQWH4MIYvfZYP806+sFDPFxIO4e8W30EYbc7ywVfK6os23Fl5PlC48WXO8sD2hYXh9QcJ6T6g4cGXE7J9GWF/9h2F+958X0YY8KUaavg2wvP7RtAXF+r4Eg0jvphQyxcVRn1hoZ4vIkz4QkJNX1CY9J2Fur6AMOM7CrV9J2HWtxfq+w5CwLcVWvg2wuC/H6HhhTa+VQj7vNBuf8AkFPhmofX+FIlvElrvTxH5JqHx/hSZbxRa70+J+f4BBLegrORx/OUAAAAASUVORK5CYII="
        width="20"
        height="20"
      />
    </button>

    <select-sort
      :selectedSort="selectedSort"
      @selected="selectRemove"
    ></select-sort>
  </div>
</template>

<script>
import SelectSort from "@/components/SelectSort.vue";
import { mapMutations, mapState, mapGetters } from "vuex";
export default {
  name: "SearchInput",
  components: {
    SelectSort,
  },
  data() {
    return {
      search: "",
      selectedSort: "",
    };
  },
  methods: {
    clearnSearch() {
      this.search = "";
      this.stateFilter(false);
    },
    ...mapMutations({
      searchMut: "SET_SEARCH",
      stateFilter: "SET_STATEFILTER",
    }),
    selectRemove(selectedSort) {
      this.selectedSort = selectedSort;
    },
  },
  watch: {
    search(newVal) {
      this.searchMut(newVal);

      if (this.selectedSort == "По элементам в категориях" && newVal !== "") {
        this.stateFilter(true);
        this.searchGetters;
        return;
      }

      if (this.selectedSort == "По категориям" && newVal !== "") {
        this.stateFilter(true);
        this.searchCategory;
        return;
      }

      if (
        this.selectedSort == "По суб элементам в категориях" &&
        newVal !== ""
      ) {
        this.stateFilter(true);
        this.searchImportance;
        return;
      }
    },
  },
  computed: {
    ...mapState({
      items: (state) => state.items,
    }),
    ...mapGetters({
      searchGetters: "searchItemGetters",
      searchCategory: "searchItemCategory",
      searchImportance: "searchImportance",
    }),
  },
};
</script>

<style lang="scss" scoped>
.search {
  margin-left: 37px;
  outline: none;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #bfc9e0;

  width: 500.07px;
  height: 30px;
  display: flex;

  padding: 5px 5px 5px 40px;
  height: 20px;
}

.search__container {
  display: flex;
  width: 704.07px;
  height: 30px;
}
input {
  outline: none;
  border: 0px;

  background: url("@/assets/Vector5.svg") no-repeat 3px 1px;
  background-size: auto 71%;
}
.search__clean {
  border: none;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #bfc9e0;
  background-color: white;
  display: flex;
  flex-direction: column-reverse;
  align-items: baseline;
  justify-content: center;
  height: 32px;
}
</style>
