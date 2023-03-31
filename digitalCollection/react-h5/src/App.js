import { BrowserRouter as Router} from "react-router-dom";
import View from './router'
import vhCheck from "vh-check";

vhCheck('browser-address-bar');

function App() {
  return (
    <div className="App">
      <Router>
      <View />
      </Router>
    </div>
  );
}

export default App;
