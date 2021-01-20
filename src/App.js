import logo from './logo.svg';
import './App.css';
import { Provider } from "react-redux";
import { store } from './redux/store/index'
import UserPage from "./Container/UserListing/index";
import 'antd/dist/antd.css';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <UserPage />
      </Provider>
    </div>
  );
}

export default App;
