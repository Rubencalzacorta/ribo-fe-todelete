import React from 'react';
import { Link } from 'react-router-dom';

function AdminNav({ handleLogout }) {

  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/dashboard"><img className="img-nav" src="https://res.cloudinary.com/ribo/image/upload/v1553507176/logo.png" alt="Logo"/></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
<div className="collapse navbar-collapse nav-list" id="navbarSupportedContent">
  <div>
    <ul className="navbar-nav mr-auto">
      <li className="nav-item dropdown">
        <Link className="nav-link" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          CLIENTE
          </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item nav-drop-text" to="/client">REGISTRO</Link>
          <Link className="dropdown-item nav-drop-text" to="/client-list">LISTADO</Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <Link className="nav-link" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          INVERSIONISTA
          </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item nav-drop-text" to="/create-investor-account">REGISTRO</Link>
          <Link className="dropdown-item nav-drop-text" to="/investor-details">DETALLE</Link>
          <Link className="dropdown-item nav-drop-text" to="/investor-transaction">TRANSACCIONES</Link>
          <Link className="dropdown-item nav-drop-text" to="/portfolio">PORTAFOLIO</Link>
        </div>
      </li>
      <li className="nav-item dropdown">
          <Link className="nav-link" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          PRESTAMO
          </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item nav-drop-text" to="/loan-list">LISTADO</Link>
          <Link className="dropdown-item nav-drop-text" to="/period-schedule">PERIODO</Link>
        </div>
      </li>
    </ul>
  </div>

  <div>
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/" onClick={handleLogout}>logout</Link>
      </li>
    </ul>
  </div>

</div>

    </nav>
  )

}

export default AdminNav;
