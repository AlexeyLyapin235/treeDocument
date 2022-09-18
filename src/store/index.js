import { createStore } from "vuex";

export default createStore({
  state: {
    subItem: "",
    searchItem: "",
    mouse:false,
    subMouse:false,
    stateFilter: false,
    searchedData: "",
    items: [
      {
        name: "Обязательный для всех",
        Importance: "Документы обязательны для всех сотрудников без исключения",
        id: 1,
        children: [
          {
            name: "Паспорт",
            id: 1.1,
            Availability: "Обязательный",
            Importance: "Для всех",
          },
          {
            name: "ИНН",
            id: 1.2,
            Availability: "Обязательный",
            Importance: "Для всех",
          },
        ],
      },
      {
        name: "Обязательные для трудоустройства",
        id: 2,
        Importance:
          "Документы ,без которых не возможно трудоустройство человека на какую то нибыло должность ",
        children: [
          {
            name: "Тестовое задание для кандидата",
            id: 2.1,
            Importance:
              "Россия,Белоруссия,Украина,администратор филлиала ,повар сушист ,повар пиццемейкер,повар горячего цеха ",
          },
          { name: "Трудовой договор", id: 2.2 },
          { name: "Мед книжка", id: 2.3 },
        ],
      },
      {
        name: "Тестовое задание для кандидата",
        id: 3,
        Importance: "Россия,Белоруссия,Украина,администратор филлиала ,повар сушист ,повар пиццемейкер,повар горячего цеха ",
        children:[
          {
            name: "Тестовое задание для кандидата",
            id: 2.1,
            Importance:
              "Россия,Белоруссия,Украина,администратор филлиала ,повар сушист ,повар пиццемейкер,повар горячего цеха ",
          },
        ]
        
      },
    ],
  },
  getters: {
    searchItemGetters(state) {
      state.searchedData = state.items.filter((el) =>
        el.children?.find((child) =>
          child.name.toLowerCase().includes(state.searchItem.toLowerCase())
        )
      );
    },
    searchItemCategory(state) {
      state.searchedData = state.items.filter((el) =>
        el.name.toLowerCase().includes(state.searchItem.toLowerCase())
      );
    },
    searchImportance(state) {
      state.searchedData = state.items.filter((el) =>
        el.Importance?.toLowerCase().includes(state.searchItem.toLowerCase())
      );
    },
  },
  mutations: {
    SET_SUBMOUSE(state,payload){
      state.subMouse = payload
    },

    SET_MOUSE(state,payload){
      state.mouse = payload
    },
    SET_ITEMS(state,payload){
    state.items = payload
    },
    SET_STATEFILTER(state, payload) {
      state.stateFilter = payload;
    },
    SET_SEARCH(state, payload) {
      state.searchItem = payload;
    },
    SET_SUBITEMS(state, payload) {
      state.subItem = payload;
    },
    DELETE_ITEMS(state, payload) {
      state.items.splice(payload, 1);
    },
  },
  actions: {
  
  },
  modules: {},
});
