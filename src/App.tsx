import { RecoilRoot } from "recoil";
import "./App.css";
import {} from "./atoms";
import { Filters, ItemList } from "./components";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <div className="shopHeaderAndControls">
          <h1>Fur-ever Homes</h1>
          <h2>Adopt Don't Shop!</h2>
          <Filters></Filters>
        </div>
        <div className="items">
          <ItemList></ItemList>
        </div>
      </RecoilRoot>
    </div>
  );
}

export default App;
