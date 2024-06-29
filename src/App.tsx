import { requests } from "./request";
import { Row } from "./components/Row";

function App() {
  return (
   // 追加箇所
    <div className="App">
     <Row fetchUrl={requests.fetchNetflixOriginals} />
    </div>
  );
}

export default App;
