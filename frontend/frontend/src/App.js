import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { PrimeReactProvider } from 'primereact/api';

import Main from "./MainPage/Main";
import ResultPage from "./ResultPage/ResultPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
    },
    {
      path: "/result",
      element: <ResultPage />,
    },
  ])
  
  return (
    <PrimeReactProvider>
       <RouterProvider router={router}/>
    </PrimeReactProvider>
   
  );
}

export default App;
