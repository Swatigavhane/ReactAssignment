import reducer from '../Reducer/index'
import { createStore } from "redux";
const store = createStore(reducer);
export { store }