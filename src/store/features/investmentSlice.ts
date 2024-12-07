import { createSlice } from "@reduxjs/toolkit";
import { Investment } from "../../data/interface";

interface InvestmentState {
  investments: Investment[];
}

const initialState: InvestmentState = {
  investments: localStorage.getItem("investments")
    ? JSON.parse(localStorage.getItem("investments")!)
    : [],
};

export const investmentsSlice = createSlice({
  name: "investments",
  initialState: initialState,
  reducers: {
    addInvestment: (state, action) => {
      state.investments.push(action.payload);
      // Сохраняем обновленные данные в localStorage
      localStorage.setItem("investments", JSON.stringify(state.investments));
    },
    removeInvestment: (state, action) => {
      state.investments = state.investments.filter(
        (investment) => investment.id !== action.payload
      );
      // Сохраняем обновленные данные в localStorage
      localStorage.setItem("investments", JSON.stringify(state.investments));
    },
  },
});

export const { addInvestment, removeInvestment } = investmentsSlice.actions;
export default investmentsSlice.reducer;
