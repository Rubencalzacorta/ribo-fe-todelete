import React, { Component } from 'react';
import InvestorService from '../../../../services/InvestorService'

class Client extends Component {
  constructor(props){
    super(props);
    this.state = { 
        firstName:"",
        lastName:"",
        location:"PERU",
        investo: true
    };
    this.service = new InvestorService();
  }
    
  handleFormSubmit = (event) => {
    event.preventDefault();

    const firstName = this.state.firstName
    const lastName = this.state.lastName
    const location = this.state.location
    const investor = true


    this.service.createInvestor(firstName ,lastName ,location, investor)
    .then( response => {
        this.setState({
            firstName:"",
            lastName:"",
            location:"",
            investor: true
        });
    })
    .catch(error => {
      this.setState({
        error: error
      });
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      
  render() {
    return(
      <div className="content">
          <form onSubmit={this.handleFormSubmit}>
              <div className="form-row">
                  <div className="form-group col-md-6">
                      <label for="name">Nombre:</label>
                      <input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={e => this.handleChange(e)}/>
                  </div>
                  <div className="form-group col-md-6">
                      <label for="lastName">Apellido:</label>
                      <input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={e => this.handleChange(e)}/>
                  </div>
                  <div className="form-group col-md-6">
                      <label for="location">Region:</label>
                      <select className="form-control" name="location" value={this.state.location} onChange={e => this.handleChange(e)}>
                          <option value="PERU">Peru</option>
                          <option value="USA">USA</option>
                          <option value="DOMINICAN_REPUBLIC">República Dominicana</option>
                      </select>
                  </div>
              </div>
              <button type="submit" className="btn btn-info">Crear Cuenta de Inversión</button>
          </form>
      </div>

    )
  }
}

export default Client;