import Login from "./pages/Login";
import RouteShipments from "./pages/Routes";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { PrivateRoute } from "./routes/PrivateRoute";
import RouteRoad from "./pages/RouteRoad";
import Shipment from "./pages/Shipment";
import RouteSuccess from "./pages/RouteSuccess";
import RouteCollection from "./pages/RouteCollection";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/route/success" element={<RouteSuccess/>}/>
          <Route path="/route/collections/success" element={<RouteSuccess/>}/>
          <Route path="/route" element={
            <PrivateRoute>
              <RouteShipments/>
            </PrivateRoute>
          }/>
          <Route path="/route/road" element={
            <PrivateRoute>
              <RouteRoad/>
            </PrivateRoute>
          }/>
          <Route path="/route/road/:shipment_id/:status" element={
            <PrivateRoute>
              <Shipment/>
            </PrivateRoute>
          }/>
          <Route path="/route/collection" element={
            <PrivateRoute>
              <RouteCollection/>
            </PrivateRoute>
          }/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
