<template>
  <select class="select" v-model="selectedSort" @change="this.$emit('selected', selectedSort)">
    <option value="">Выберите сортировку</option>
    <option>По категориям</option>
    <option>По элементам в категориях</option>
    <option>По суб элементам в категориях</option>
  </select>
</template>

<script>
export default {
  name: "SelectSort",
  props: {
    selectedSort: String,
  },
  data() {
    return {};
  },
};
</script>

<style>

.select{
  border: 1px solid #bfc9e0;
  margin-left: 5px;
}
</style>
