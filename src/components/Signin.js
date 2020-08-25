import React, { Component } from 'react'
import {NavLink,Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {signIn,signOut} from '../actions/index'
import i18next from 'i18next';
import TextField from '@material-ui/core/TextField';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
          }
          // this.props.signOut()
    }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }
  render() {
            // console.log("signin",this.props)

      const {auth}=this.props
        // if(auth.uid)
        // {
        //     return <Redirect to="/notes/"></Redirect>
        // }
      return (
      <div className="container mt-5">
        
        {this.props.state.firebase.auth.isLoaded == false ?<div className="mt-5"><div className="spinner-border text-primary mx-auto d-block" role="status"><span className="sr-only">Loading...</span></div></div>:
          <div>
            {auth.uid ?<Redirect to={process.env.PUBLIC_URL + "/notes/"}></Redirect>:
            <div className="row justify-content-center">
            <form className="col-10 col-md-8 col-lg-6" onSubmit={this.handleSubmit}>
              <div className='jumbotron '>
                <h3 className="text-center mb-3" >{i18next.t('SignIn')}</h3>
                {/* <input required type="email" id='email' className="form-control mb-3" placeholder={i18next.t('Email')} onChange={this.handleChange}/> */}
                <div><TextField  fullWidth label={i18next.t('Email')}  required type="email" id='email'className="mb-3 " onChange={this.handleChange}/></div>
                <div><TextField fullWidth label={i18next.t('Password')}  required type="password" id='password'className="mb-3 " onChange={this.handleChange}/></div>

                {/* <input required type="password" id='password' className="form-control mb-3" placeholder={i18next.t('Password')} onChange={this.handleChange} /> */}
                

                <button className="btn btn-primary btn-block mb-3">{i18next.t('Login')}</button>
                <div className="text-center text-danger">{this.props.authError ? i18next.t('loginfailed') : null}</div>
              </div>
            </form>
          </div>
            }
          </div>
          
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return{
      authError: state.reminder.authError,
      auth: state.firebase.auth,
      state:state
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
      signIn: (creds) => dispatch(signIn(creds)),
      signOut: ()=>dispatch(signOut())
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)


  