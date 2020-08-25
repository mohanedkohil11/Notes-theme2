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


class NavBAr extends Component {
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
    // photorender = file => {
    //    var  photo
    //     var reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = function () {
    //     //   return (reader.result);
    //       console.log('photo',reader.result)
    //         photo= reader.result
    //     };
    //     reader.onerror = function (error) {
    //       console.log('Error: ', error);
    //     };
    //     console.log(photo)
    //     this.setState({x:photo})
    //  }

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
        const {notifications}= this.props
        const {readNotification}=this.props
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

                {/*push notification modal */}
                {auth.uid ? <Modal backdrop="static" show={this.state.notify} dialogClassName={"modal-dialog-centered"}>
                    <Modal.Header>
                        <h3>{i18next.t('PushNotifications')}</h3>
                        <a id="react-logo" className="d-inline fa fa-times-circle" href='' onClick={(e)=>{e.preventDefault();this.setState({notify:false})}}></a>
                    </Modal.Header>
                    <form onSubmit={(e)=>{e.preventDefault();this.props.push_noti(this.state.to,this.state.notification,this.props.accData.firstName)}}>

                    <Modal.Body>
                        <input required id='to' className="form-control mb-3" placeholder={i18next.t('Enteruser')} onChange={this.handleChange} />
                        <input required id='notification' className="form-control mb-3" placeholder={i18next.t('Enternotification')} onChange={this.handleChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary btn-block mb-3" >{i18next.t('PUSH')}</button>
                    </Modal.Footer>
                    </form>
                </Modal>:null}
                 {/* notifications modal */}
                 {auth.uid ? <Modal onExit={this.notifications} backdrop="static" show={this.state.shownoti} dialogClassName={"modal-dialog-centered"}>
                    <Modal.Header>
                        <h3>{i18next.t('Notifications')}</h3>
                        <a id="react-logo" className="d-inline fa fa-times-circle" href='' onClick={(e)=>{e.preventDefault();this.setState({shownoti:false})}}></a>
                    </Modal.Header>

                    <Modal.Body>
                    {notifications ? <ul className="list-group">

                        {
                            notifications.map(notification => {
                                return(
                                    <li key={notification.id} className="list-group-item ">
                                        <div className="row">
                                            <div className="col-11">
                                                <div className="font-weight-bold text-primary">{notification.notification}</div>
                                                <div className="mb-2 font-weight-lighter badge badge-secondary">{i18next.t('ADMIN')} <span className="font-weight-bold">{notification.sender}</span></div>
                                            </div>
                                            <div className="col-1">
                                                {/* <span type="button" className="fa fa-times-circle" onClick={(e)=>{e.preventDefault();this.props.remove_notification(notification.id,auth.email)}}></span> */}
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>:null} 

                    </Modal.Body>
                    <Modal.Body>
                        {readNotification ? <ul className="list-group">

                        {
                            readNotification.map(notification => {
                                return(
                                    <li key={notification.id} className="list-group-item ">
                                        <div className="row justify-content-between">
                                            <div className="col-9">
                                                <div className="font-weight-bold text-secondary">{notification.notification}</div>
                                                <div className="mb-2 font-weight-lighter badge badge-secondary">{i18next.t('ADMIN')} <span className="font-weight-bold">{notification.sender}</span></div>
                                            </div>
                                            <div className="col-1">
                                                <a id="react-logo" href='' className="fa fa-times-circle" onClick={(e)=>{e.preventDefault();this.props.remove_notification(notification.id,auth.email)}}></a>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        </ul>:null} 
                    </Modal.Body>
                </Modal>:null}
                {/* Account modal */}
                {auth.uid ? <Modal backdrop="static" show={this.state.account} dialogClassName={"modal-dialog-centered"}>
                    <Modal.Header>
                        {this.props.accData? <h3 className="text-uppercase">{this.props.get_PC(auth.email)}<Avatar name={`${this.props.accData.firstName} ${this.props.accData.lastName}`} round={true} size="40" onClick={()=>{this.setState({showpc:true})}} src={this.props.pc}/> {this.props.accData.firstName} {this.props.accData.lastName}</h3>:null}
                        <a id="react-logo" className="d-inline fa fa-times-circle" href='' onClick={(e)=>{e.preventDefault();this.setState({account:false});this.props.remove_status()}}></a>
                    </Modal.Header>

                    <Modal.Body>
                    <div  >
                        {this.props.accData ?
                        <div className="container "  >
                            {/* <div className="text-uppercase"><Avatar name={`${this.props.accData.firstName} ${this.props.accData.lastName}`} round={true} size="40" onClick={()=>console.log('clicked')} src={logo}/>{this.props.accData.firstName} {this.props.accData.lastName}</div> */}
                            <div >{i18next.t('Loggedinas')} <p className="text-secondary">{auth.email}</p></div>
                            <a className=" mb-3"  href='' onClick={(e)=>{e.preventDefault(); this.props.reset(auth.email)}} >{i18next.t('ResetPassword')} </a>
                            <div className='text-center text-danger'>{this.props.resetstatus} </div>
                            <a className="" data-toggle="collapse" href="#collapseExample">{i18next.t('EditAccount')}</a>

                            <div className="collapse" id="collapseExample">
                                    <div className="card card-body">
                                    <form onSubmit={e=>{e.preventDefault(); this.props.editacc(auth.email,document.getElementById('editfname').value,document.getElementById('editlname').value)}}>
                                        <input  id='editfname' className="form-control mb-3"  defaultValue={this.props.accData.firstName} />
                                        <input  id='editlname' className="form-control mb-3" defaultValue={this.props.accData.lastName}  />
                                        <button className="btn btn-primary float-right">{i18next.t('Save')}</button>
                                    </form>
                                </div>
                            </div>
                            <br/>
                            <a data-toggle="collapse" href="#collapse">{i18next.t('UpdateprofilePicture')}</a>
                            
                            <div className="collapse" id="collapse">
                                <div className="card card-body">
                                    <form onSubmit={this.upd_pc}>
                                        <input  className=" mb-3" type="file"  accept="image/*" onChange={this.toBase64}/>
                                        <button className="btn btn-primary float-right">{i18next.t('Save')}</button>
                                    </form>
                                    {this.state.pc?<img className="w-100" src={URL.createObjectURL(this.state.pc)}/>:null}

                                </div>
                            </div>
                        </div>
                        :null}
                    </div>
                    </Modal.Body>
                    
                </Modal>:null}
                {/* show pc modal */}
                {auth.uid ? 
                <Modal backdrop="static" show={this.state.showpc} dialogClassName={"modal-dialog-centered"}>
                        <div>
                            <a id="react-logo" className="float-right fa fa-times-circle" href='' onClick={(e)=>{e.preventDefault();this.setState({showpc:false})}}></a>
                            <img className="w-100" src={this.props.pc}></img>
                        </div>
                </Modal>:null}         
                
                <nav className="navbar  bg-dark ">
                    <div className="container p-0">
                       
                        <div className="navbar-brand m-0"><span className='fa fa-bookmark fa-2x' id="react-logo"> {i18next.t('NOTES')}</span></div>
                        <div className="form-inline">
                            {this.props.auth.uid ? null :<a id="react-logo" style={{textDecoration:"none"}} className="mr-3 "  href='' onClick={(e)=>{e.preventDefault(); this.setState({show:true})}}><span className="fa fa-user-plus"> </span> {i18next.t('SignUp')}</a>}
                            {this.props.accData ? this.props.accData.type == "admin"?<a style={{textDecoration:'none'}} id="react-logo" className="mr-3 d-none d-md-block"  href='' onClick={this.notify}><span className="fa fa-plus"></span> {i18next.t('PushNotifications')} </a> :null :null}
                            {this.props.auth.uid ? <a id="react-logo" className="mr-3 d-none d-md-block" href='' onClick={(e)=>{e.preventDefault(); this.setState({shownoti:true})}}><span className='fa fa-bell'></span> {i18next.t('Notifications')}  <span className="badge badge-secondary">{this.props.number?this.props.number :0}</span></a>:null}
                            
                                {this.props.auth.uid ? <a id="react-logo" className="mr-3 d-none d-md-block" href='' onClick={(e)=>{e.preventDefault(); this.setState({account:true})}}><span className='fa fa-user'></span> {i18next.t('Account')}</a> :null}


                                {this.props.auth.uid ?<div className="dropdown d-md-none" id ="react-logo">
                                <a className="" href=""  data-toggle="dropdown" >
                                    <span className="fa fa-bars fa-2x" id ="react-logo"></span> 
                                </a>
                                <div className={`dropdown-menu   ${i18next.language=='ar'?'dropdown-menu-left':'dropdown-menu-right'}`}>
                                    {this.props.accData ? this.props.accData.type == "admin"?<a id="react-logo" className='dropdown-item d-flex flex-row' href='' onClick={this.notify}><span className='fa fa-plus '> {i18next.t('PushNotifications')}</span></a> :null :null}
                                    {this.props.auth.uid ? <a id="react-logo" className='dropdown-item d-flex flex-row' href='' onClick={(e)=>{e.preventDefault(); this.setState({shownoti:true})}}><span className='fa fa-bell '> {i18next.t('Notifications')} <span className="badge badge-secondary">{this.props.number?this.props.number :0}</span></span></a>:null}
                                    {this.props.auth.uid ? <a id="react-logo" className='dropdown-item d-flex flex-row' href='' onClick={(e)=>{e.preventDefault(); this.setState({account:true})}}><span className='fa fa-user'> {i18next.t('Account')}</span></a> :null}
                                    {this.props.auth.uid ? <a id="react-logo" className='dropdown-item d-flex flex-row' onClick={(e)=>{e.preventDefault(); this.props.signOut()}} href=''><span className='fa fa-sign-out'> {i18next.t('Logout')}</span></a> :null}
                                </div>
                            </div>:null}
                            {this.props.auth.uid ? <a id="react-logo" className="mr-3 d-none d-md-block" onClick={ (e)=>{e.preventDefault(); this.props.signOut()}} href=''><span className="fa fa-sign-out"></span> {i18next.t('Logout')} </a> :null}
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
  export default connect(mapStateToProps, mapDispatchToProps)(NavBAr)