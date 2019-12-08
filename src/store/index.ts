import Vue from 'vue';
import Vuex from 'vuex';
import { Category, MonthExpense } from '@/Expenses-Category/expenses';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    monthlyExpese: Array<MonthExpense>(),
    currentMonth: String,
    listofCategory: Array<Category>()
  },
  mutations: {
    addWiseCategory(state, monthExpense: Array<MonthExpense>) {
      state.monthlyExpese = monthExpense;
  },
  changeCurrentMonthState(state, month) {
    state.currentMonth = month;
  }
  },
  actions: {
    addWiseCategory(context, monthlyCateg: MonthExpense) {
      return new Promise((resolve, reject) => {
        context.commit('addWiseCategory', monthlyCateg);
        resolve();
      });
  },
  changeCurrentMonthState(context, month: String) {
    return new Promise((resolve, reject) => {
      context.commit('changeCurrentMonthState', month);
      resolve();
    });
}
  },
  getters: {
    listofCategory: (state) => {
      let expenseForMonth = state.monthlyExpese.find((el) => <string>el.month == state.currentMonth.toString());
            return expenseForMonth ? expenseForMonth.expense_planned : [];
          },
    currentMonth: (state) => {
      return state.currentMonth;
    },
  },
  modules: {
  },
});