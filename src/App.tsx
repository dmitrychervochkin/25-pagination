import "./App.scss";
import { Pagination } from "./components";

function App() {
    return (
        <div className="app">
            <Pagination count={30} />
        </div>
    );
}

export default App;
