"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vuex = require("vuex");

var _default = (0, _vuex.createStore)({
  state: {
    subItem: "",
    searchItem: "",
    stateFilter: false,
    searchedData: "",
    items: [{
      name: "Обязательный для всех",
      Importance: "Документы обязательны для всех сотрудников без исключения",
      id: 1,
      children: [{
        name: "Паспорт",
        id: 1.1,
        Availability: "Обязательный",
        Importance: "Для всех"
      }, {
        name: "ИНН",
        id: 1.2,
        Availability: "Обязательный",
        Importance: "Для всех"
      }]
    }, {
      name: "Обязательные для трудоустройства",
      id: 2,
      Importance: "Документы ,без которых не возможно трудоустройство человека на какую то нибыло должность ",
      children: [{
        name: "Тестовое задание для кандидата",
        id: 2.1,
        Importance: "Россия,Белоруссия,Украина,администратор филлиала ,повар сушист ,повар пиццемейкер,повар горячего цеха "
      }, {
        name: "Трудовой договор",
        id: 2.2
      }, {
        name: "Мед книжка",
        id: 2.3
      }]
    }, {
      name: "Обязательные для трудоустройства",
      id: 3,
      Importance: "Документы ,без которых не возможно трудоустройство человека на какую то нибыло должность ",
      children: [{
        name: "Тестовое задание для кандидата",
        id: 3.1
      }, {
        name: "Трудовой договор",
        id: 3.2
      }, {
        name: "Мед книжка",
        id: 3.3
      }]
    }]
  },
  getters: {
    searchItemGetters: function searchItemGetters(state) {
      state.searchedData = state.items.filter(function (el) {
        return el.children.find(function (child) {
          return child.name.toLowerCase().includes(state.searchItem.toLowerCase());
        });
      });
    },
    searchItemCategory: function searchItemCategory(state) {
      state.searchedData = state.items.filter(function (el) {
        return el.name.toLowerCase().includes(state.searchItem.toLowerCase());
      });
    },
    searchImportance: function searchImportance(state) {
      state.searchedData = state.items.filter(function (el) {
        return el.Importance.toLowerCase().includes(state.searchItem.toLowerCase());
      });
    }
  },
  mutations: {
    SET_STATEFILTER: function SET_STATEFILTER(state, payload) {
      state.stateFilter = payload;
    },
    SET_SEARCH: function SET_SEARCH(state, payload) {
      state.searchItem = payload;
    },
    SET_SUBITEMS: function SET_SUBITEMS(state, payload) {
      state.subItem = payload;
    },
    DELETE_ITEMS: function DELETE_ITEMS(state, payload) {
      state.items.splice(payload, 1);
    }
  },
  actions: {},
  modules: {}
});

exports["default"] = _default;
//# sourceMappingURL=index.dev.js.map
