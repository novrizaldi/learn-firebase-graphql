import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postUser } from '../actions';

class UserForm extends Component {
    constructor (props){
        super(props)
        console.log('props', this.props)
        this.state = {
            Id: "",
            Name: "",
            Phone: ""
        }

        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleIdChange(event){
        this.setState({Id: event.target.value})
    }

    handleNameChange(event){
        this.setState({Name: event.target.value})
    }
    handlePhoneChange(event){
        this.setState({Phone: event.target.value})
    }
    handleSubmit(event){
        if(this.state.Id && this.state.Name && this.state.Phone){
            this.props.postUser(this.state.Id, this.state.Name, this.state.Phone)
            this.setState({Id: "", Name:"", Phone:""});
        }
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} className="form-inline judull" >
            <div className="form-group row">
              <label htmlFor="userName" className=" col-form-label">Id</label>
              <div className="col">
                <input type="text" className="form-control " id="Id" name="Id" value={this.state.Id} onChange={this.handleIdChange} placeholder="Id" />
              </div>

              <label htmlFor="Name" className=" col-form-label">Name</label>
              <div className="col">
                <input type="text" className="form-control" id="Name" name="Name" value={this.state.Name} onChange={this.handleNameChange} placeholder="name"/>
              </div>

              <label htmlFor="Age" className=" col-form-label">Phone</label>
              <div className="col">
                <input type="text" className="form-control" id="Phone" name="Phone" value={this.state.Phone} onChange={this.handlePhoneChange} placeholder="Phone"/>
              </div>
     
       
              <div className="">
                <button type="submit" className="btn btn-primary">Tambah</button>
              </div>
              </div>
          </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    postUser: (Id, Name, Phone) => dispatch(postUser(Id, Name, Phone))
})

export default connect(
    null, 
    mapDispatchToProps
)(UserForm)