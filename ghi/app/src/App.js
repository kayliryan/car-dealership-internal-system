import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateVehicleModel from './CreateVehicleModel'
import ListAutomobiles from './ListAutomobiles';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelList from './VehicleModelList';
import AutomobileForm from './AutomobileForm';
import TechnicianForm from './TechnicianForm';
import AppointmentList from './ListAppointments';
import ServiceHistory from './ServiceHistory';

function App(props) {
  // if (props.manufacturers !== undefined) {
  //   return null;
  // }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/models/create" element={<CreateVehicleModel />} />
          <Route path="/automobiles" element={<ListAutomobiles />} />
          <Route path="/manufacturers" element={<ManufacturerList manufacturers={props.manufacturers} />} />
          <Route path="/manufacturers/create" element={<ManufacturerForm />} />
          <Route path="/models" element={<VehicleModelList />} />
          <Route path="/automobiles/create" element={<AutomobileForm />} />
          <Route path="/technicians/create" element={<TechnicianForm />} />
          <Route path="/appointments/" element={<AppointmentList />} />
          <Route path="/appointments/history/" element={<ServiceHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
