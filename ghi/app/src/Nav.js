import { NavLink } from 'react-router-dom';
function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent"> 
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Manufacturer Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Manufacturers
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/manufacturers">Manufacturers</NavLink>
                <NavLink className="dropdown-item" to="/manufacturers/create">Create a Manufacturer</NavLink>
              </div>
            </li>
            {/* Vehicle Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Vehicle Models
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/models">Vehicle Models</NavLink>
                <NavLink className="dropdown-item" to="/models/create">Create a Vehicle Model</NavLink>
              </div>
            </li>
            {/* Automobiles Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Automobiles
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/automobiles">Automobiles List</NavLink>
                <NavLink className="dropdown-item" to="/automobiles/create">Create an Automobile</NavLink>
              </div>
            </li>
            {/* Customer Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Customers
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/customers/create">Customer Creation</NavLink>
              </div>
            </li>
            {/* Sales */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/salesperson/create">Add Salesperson</NavLink>
                <NavLink className="dropdown-item" to="/salesrecord/create">Add a Salesrecord</NavLink>
                <NavLink className="dropdown-item" to="/salesrecord">Sales Records</NavLink>
                <NavLink className="dropdown-item" to="/salesrecord/history">Sales History</NavLink>
              </div>
            </li>
            {/* Service / Technician Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Service & Technicians
              </a>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/technicians/create">Add a Technician</NavLink>
                <NavLink className="dropdown-item" to="/appointments">Appointments</NavLink>
                <NavLink className="dropdown-item" to="/appointments/history">Service History</NavLink>
              </div>
            </li>
            <li className="nav-item position-relative top-0 end-0" >
              <NavLink className="nav-link"  to="/appointments/create">Schedule an Appointment</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Nav;