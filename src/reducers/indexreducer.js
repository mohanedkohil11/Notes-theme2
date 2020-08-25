import {ADD_REMINDER, REMOVE_REMINDER} from "../types"

let initstate = {reminders:[],authError: null,signupError:null}
const reminders =(state=initstate,action)=>{
    let reminders = [];
    if(action.type == ADD_REMINDER)
    {
        reminders = action.reminders
        return {...state,reminders:reminders}
    }else if(action.type==REMOVE_REMINDER)
    {
        reminders=state.filter(reminder=>reminder.id !==action.id)
        return {...state,reminders:reminders}
    }
    else if(action.type=="get")
    {
        reminders=action.reminders
        return {...state,reminders:reminders}
    }
    else if(action.type=='get_reminders'){
        reminders=action.reminders
        // console.log("reddd",reminders)
        return {...state,reminders:reminders}
    }else if(action.type=='LOGIN_SUCCESS')
    {
        //console.log('login success');
        return {...state,authError: null}
    }
    else if(action.type=='LOGIN_ERROR'){
        //console.log('login error');
        return {...state,authError: 'loginfailed'}
    }
    else if (action.type=='SIGNOUT_SUCCESS'){
        //console.log('signout success');
        state=initstate;
        return state
    }
    else if(action.type=='SIGNUP_ERROR')
    {
        //console.log("errrrrrr",action.err.message)
        return  {...state,signupError: action.err.message}
    }
    else if(action.type=='get_acc')
    {
       
        return  {...state,accData:action.data}
    }
    else if(action.type=='notifications')
    {
        return {...state,notifications:action.notifications,no:action.notifications.length}
    }
    else if(action.type == "read")
    {
        return {...state,read:action.read}
    }
    else if (action.type =='reset'){
        return {...state,resetstatus:action.status}
    }
    else if (action.type == 'deletestatus')
    {
        return {...state,resetstatus:""}
    }
    else if (action.type == 'pc')
    {
        return {...state,pc:action.pc}
    }
    else{
        return state
    }
}
export default reminders;






