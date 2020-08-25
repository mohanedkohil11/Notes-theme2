import React , {Component} from "react"
import {connect} from "react-redux"
import{ add_Reminder , remove_Reminder,get_rem,get_reminder,get_acc,get_read} from "../actions/index"
import {NavLink,Redirect} from "react-router-dom"
import {firestoreConnect,useFirebaseConnect,useFirestoreConnect } from 'react-redux-firebase'
import {compose} from "redux"
import i18next from 'i18next';

class Takenote extends Component {
    constructor(props){
        super(props);
        this.state={
            text:"",
            date: ""
        }
        // let email = this.props.reminders.firebase.auth.email
        this.props.get_reminder(this.props.reminders.firebase.auth.email)
        this.props.get_acc(this.props.reminders.firebase.auth.email)
        this.props.get_rem(this.props.reminders.firebase.auth.email)
        this.props.get_read(this.props.reminders.firebase.auth.email)
    }
    render_Reminders=()=>{
               

        // this.props.get_rem(this.props.reminders.firebase.auth.email)
        console.log("rem",this.props.reminders)
        const reminders = this.props.reminders.reminder.reminders;
        if(reminders){

        return(
            <ul className="list-group">
                {
                    reminders.map(reminder => {
                        
                        let date = reminder.data.createdAt.toDate()
                        return(
                            <li key={reminder.id} className="list-group-item">
                                <div className="">
                                    <div className="">
                                        <div className="mb-2">{reminder.data.text}</div>
                                        <div className="text-secondary" >{reminder.data.date}</div>
                                    </div>
                                    <div className="float-right">
                                        <div className="remove btn btn-danger" onClick={()=> this.props.remove_Reminder(reminder.id,this.props.reminders.firebase.auth.email)}><span className="fa fa-trash-o"></span> {i18next.t("DELETE")}</div>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                       
                }
            </ul>
                    
        )
            }
    }
    render(){
        // console.log("date",this.props,this.state)
        if(!this.props.reminders.firebase.auth.uid) return <Redirect to={process.env.PUBLIC_URL + "/"}></Redirect>
        return(
            <div className=' mt-3 col mb-3'>
                <div className='container'>
                    <div className="">
                        <h2 className={`${i18next.language=='ar'?'float-right':'float-left'}`}>{i18next.t('WHATSHOULDUDO')}</h2>
                
                    </div>
                    <div>
                        <input onChange={(e)=>this.setState({text: e.target.value})} className="form-control mb-3" type="text" placeholder={i18next.t('TAKENOTES')}></input>
                        <input onChange={(e)=>{var d = Date.parse( e.target.value);const dateObject = new Date(d);this.setState({date:dateObject.toLocaleString('en-US', {month: 'long',day: '2-digit',year: 'numeric',hour: '2-digit',minute:'2-digit'})})}}  className="form-control mb-3" type="datetime-local" placeholder="xx"></input>
                        <button onClick={()=> this.props.add_Reminder(this.state.text,this.state.date,this.props.reminders.firebase.auth.email)} className="btn btn-primary btn-block mb-3">{i18next.t('AddReminder')}</button>
                        {this.render_Reminders()}
                        {/* <button className="btn btn-danger btn-block">Clear Reminders</button> */}
                    </div>
                </div>
                
            </div>
        )
    }
}
// function mapdispatchtoprops(dispatch) //we can replace all this function by just typing name of the action
// {
//     return {
//         add_Reminder : () =>  dispatch(add_Reminder())
//     }
// }

// function mapdispatchtoprops(dispatch) //we can replace all this function by just typing name of the action
// {
//     return {
//         remove_Reminder : () =>  dispatch(remove_Reminder())
//     }
// }
function mapstatetoprops(state){
    return{
        reminders : state,
        data: state.firestore.ordered.projects
    }
}

export default compose(
    connect(mapstatetoprops,{add_Reminder,remove_Reminder,get_rem,get_reminder,get_acc,get_read}),
    firestoreConnect(() => ['projects'])
  )(Takenote)
