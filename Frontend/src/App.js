import {
  HashRouter,
  Route,
  Routes,
} from "react-router-dom"
import { PrimeReactProvider } from 'primereact/api';

import Main from "./MainPage/Main";
import ResultPage from "./ResultPage/ResultPage";
function App() {


  return (
    <PrimeReactProvider>
      <HashRouter basename="/">
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </HashRouter>

    </PrimeReactProvider>

  );
}

export default App;
