
import React, { Component } from "react";
import PropTypes from "prop-types";
import "./editProfile.scss";
import { withStyles } from "@material-ui/core/styles";
import ClientService from "../../../../services/ClientService";

const styles = theme => ({
  name: {
    width: 440
  },
  citizenInfo: {
    width: 300
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    minWidth: 225
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: props.details
    };
    this.service = new ClientService();
  }

  handleChange = event => {
    const { name } = event.target;
    const doc = event.target.files[0]
    this.setState({ details: { ...this.state.details, [name]: doc } });
  };

  handleSubmit = () => {
    let { details } = this.state;
    let { _id, documentID } = details;
    this.service
      .updateDocumentID(_id, documentID)
      .then(response => {
        response.status === "updated"
          ? this.props.closeModal("updated")
          : this.props.closeModal("failed");
      })
      .catch(e => this.props.closeModal("failed"));
  };

  render() {

    return (
      <div className="modal-holder">
        <div className="heading-activity">
          <div>
            <p variant="heading" className="heading">
              Documentos
            </p>
          </div>
        </div>
        <div className="form-inputs-holder">
          Documento de Identidad
          <label className="btn">
            <input
              type="file"
              name="documentID"
              className=""
              placeholder="documentID"
              onChange={e => this.handleChange(e)}
            />
          </label>
        </div>
        <div className="edit-form-submit">
          <button onClick={() => this.handleSubmit()} className="btn btn-info">
            Editar Documentos
          </button>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProfile);
