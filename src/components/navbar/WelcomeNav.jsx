import React from 'react';
import { Link } from 'react-router-dom';

function WelcomeNav() {

  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/"><img className="img-nav" src="https://res.cloudinary.com/ribo/image/upload/v1553507176/logo.png" alt="Logo"/></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse nav-list" id="navbarNav">
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Cómo funciona</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Contacto</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Ingresar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/signup'>Crear cuenta</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default WelcomeNav;


