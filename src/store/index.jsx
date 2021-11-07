import React, { createContext, useReducer } from "react";
import {
  SET_POPULAR,
  SET_SELECTED,
  SET_RELATED,
  SET_TERM,
  SET_SEARCHED,
} from "../actions";

const initialState = {
  popular: [],
  related: [],
  searched: [],
  selected: {},
  term: "",
};

// reducer関数 - 2つの値を受け取り、一つの値を返す関数
const reducer = (state, action) => {
  switch (action.type) {
    case SET_POPULAR:
      return { ...state, popular: action.payload.popular };
    case SET_RELATED:
      return { ...state, related: action.payload.related };
    case SET_SELECTED:
      // reducerでの更新は上書きになるため、ステートが複数の場合スプレッド構文で展開が必要
      return { ...state, selected: action.payload.selected };
    case SET_SEARCHED:
      return { ...state, searched: action.payload.searched };
    case SET_TERM:
      return { ...state, term: action.payload.term };
    default:
      return state;
  }
};

export const Store = createContext({
  globalState: initialState,
  setGrobalState: () => null,
});

export const StoreProvider = ({ children }) => {
  const [globalState, setGlobalState] = useReducer(reducer, initialState);
  return (
    <>
      <Store.Provider value={{ globalState, setGlobalState }}>
        {children}
      </Store.Provider>
    </>
  );
};

export default StoreProvider;
