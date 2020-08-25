import React, { Component } from 'react';
import {signUp,signOut,push_noti,read,remove_notification,reset,remove_status,editacc,upd_PC,get_PC} from '../actions/index'
import {connect} from "react-redux";
import {NavLink,Redirect} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Avatar from 'react-avatar';
import logo from '../components/logo.ico';
import i18next from 'i18next';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';


class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
           show:false,
           notify:false,
           email: '',
           password: '',
           firstName:"",
           lastName:'',
           to:"",
           notification:"",
           shownoti:false,
           account:false,
           resetemail:'',
           pc:null,
           showpc:false,
          }

    }
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }
      handleSubmit = (e) => {
        e.preventDefault();
        //console.log("signup",this.state)
        this.props.signUp(this.state)
      }
      notify=(e)=>{
        e.preventDefault();
        this.setState({notify:true})
      }
    notifications=()=>{
        //console.log("not",this.props.notifications)
        this.props.read(this.props.auth.email,this.props.notifications)
    }
    

    toBase64 = (e) => {
        if(e.target.files[0]){
            // console.log('Error: ', e.target.files[0]);
            this.setState({pc:e.target.files[0]})
        }
    }
    upd_pc=(e)=>{
        e.preventDefault();
        if(this.state.pc)
        {
            this.props.upd_PC(this.props.auth.email,this.state.pc)
            this.setState({pc:null})
        }
    }
    
    
    render() {
        // console.log("NAVBAR",this.state,i18next.language)

        const {auth}=this.props
       
        return (
            <div >
                {/* signup modal */}
                {auth.uid ? null :
                <Modal backdrop="static" show={this.state.show} dialogClassName={"modal-dialog-centered"}>
                    <Modal.Header>
                        <h3>{i18next.t('Signup')}</h3>
                        <a id="react-logo" className="d-inline fa fa-times-circle" href='' onClick={(e)=>{e.preventDefault();this.setState({show:false,pc:null})}}></a>
                    </Modal.Header>
                    <form onSubmit={this.handleSubmit}>

                    <Modal.Body>
                        <input required id='firstName' className="form-control mb-3" placeholder={i18next.t("FirstName")} onChange={this.handleChange} />
                        <input required id='lastName' className="form-control mb-3" placeholder={i18next.t("LastName")} onChange={this.handleChange} />
                        <input required type="email" id='email' className="form-control mb-3" placeholder={i18next.t('Email')} onChange={this.handleChange} />
                        <input required type="password" id='password' className="form-control mb-3" placeholder={i18next.t('Password')} onChange={this.handleChange} />
                        {i18next.t('ChooseprofilePicture')} <input id='pc' className=" mb-3 "  type="file"  accept="image/*"onChange={this.toBase64}/>
                        {this.state.pc?<img className="w-100" src={URL.createObjectURL(this.state.pc)}/>:null}
                        <div className="text-center text-danger">{this.props.signupError}</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary btn-block mb-3" >{i18next.t('SignUp')}</button>
                    </Modal.Footer>
                    </form>
                </Modal>}

                 
                <nav className="navbar  bg-dark ">
                   
                       <div className='container'>
                        <div className="navbar-brand m-0"><span className='fa fa-bookmark fa-2x' id="react-logo"> {i18next.t('NOTES')}</span></div>
                        <div className="form-inline">
                            {this.props.auth.uid ? null :<a id="react-logo" style={{textDecoration:"none"}} className="mr-3 "  href='' onClick={(e)=>{e.preventDefault(); this.setState({show:true})}}><span className="fa fa-user-plus"> </span> {i18next.t('SignUp')}</a>}
                        </div>
                       </div>
                        
                        
                </nav>
                
                
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
      authError: state.reminder.authError,
      signupError : state.reminder.signupError,
      auth: state.firebase.auth,
      accData:state.reminder.accData,
      notifications:state.reminder.notifications,
      readNotification:state.reminder.read,
      number:state.reminder.no,
      resetstatus:state.reminder.resetstatus,
      pc:state.reminder.pc
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        signUp : (newuser)=>dispatch(signUp(newuser)),
        signOut: ()=>dispatch(signOut()),
        push_noti: (email,notify,sender)=>dispatch(push_noti(email,notify,sender)),
        read:(email,notifications)=>dispatch(read(email,notifications)),
        remove_notification:(id,email)=>dispatch(remove_notification(id,email)),
        reset:(email)=>dispatch(reset(email)),
        remove_status:()=>dispatch(remove_status()),
        editacc:(email,first,last)=>dispatch(editacc(email,first,last)),
        upd_PC:(email,file)=>dispatch(upd_PC(email,file)),
        get_PC:(email)=>dispatch(get_PC(email))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Header)