import Login from "./pages/Login";
import RouteShipments from "./pages/Routes";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/route" element={
            <PrivateRoute>
              <RouteShipments/>
            </PrivateRoute>
          }/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
