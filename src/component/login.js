import React, { Component } from 'react';
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: "",
        }
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    }
    handleOnFocus(e){
        this.setState({active:!this.state.active});
    }
    handleBlur(e){
        this.setState({active:!this.state.active});
    }
  
    render() {
        let labelTag = document.querySelector(".mds-text-field__label");
        let bordetLine = document.querySelector(".mds-text-field-borderline");
        if (this.state.active){
            labelTag.classList.add ("mds-text-field__label__active")
            bordetLine.classList.add ("mds-text-field-borderline__active")
        }
        else if (this.state.active === false && this.props.username === ""){
            labelTag.classList.remove ("mds-text-field__label__active")
            bordetLine.classList.remove ("mds-text-field-borderline__active")
        }
      return (
        <div className="body-container">
            <div className="body-box">
                <div className="body-div">
                    <h2 className="body-title-text">Choose a username!</h2>
                </div>
                <div className="body-div">
                    <form className="body-form" onSubmit={this.props.onSubmit}>
                        <input className="mds-text-field__input" 
                               maxLength="12"
                               onChange = {this.props.onChange}
                               onFocus = {this.handleOnFocus}
                               onBlur = {this.handleBlur}/>
                        <span className="mds-text-field-borderline"></span>
                        <label className="mds-text-field__label">Username</label>
                        <button className="body-button">Login</button>
                    </form>
                </div>
            </div>

        </div>
      );
    }
  }

  export default Login;