import {ADD_REMINDER, REMOVE_REMINDER} from "../types"
import {jsPushNotification} from 'pushjs-notification';

function generateNotification(admin,noti){
    let jsPush = new jsPushNotification();
    jsPush.NotificationTitle = `A new notification from ${admin}!`;
    jsPush.Options.body=`${noti}`
    jsPush.showNotification();
}

export const get_read =(email)=>{
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore.collection(`/users/${email}/read`).onSnapshot(
        function(snapshot) {
          let read =[]

          snapshot.docs.forEach(doc=>{
            read.push({
              notification: doc.data().notification,
              sender:doc.data().sender,
              createdAt: doc.data().createdAt,
              id:doc.id
            })
        })
          
          // console.log("New city: ", read);
          dispatch({type:"read",read:read})
        }
    )
  }
}
export const read=(email,notifications)=>{
    return (dispatch,getState,{getFirebase})=>{
        const firestore= getFirebase().firestore();
        let read=[]
        notifications.map(notification => {
          //console.log("tesssst",notification)
            firestore.collection(`/users/${email}/read`).add({
              notification: notification.notification,
              sender:notification.sender,
              createdAt: new Date()
            }).then(()=>{
              notifications.map(notification=>{
                firestore.collection(`/users/${email}/notifications`).doc(notification.id).delete()
              })
                })
        })
    }
}
// .then(
                
//   firestore.collection(`/users/${email}/read`).get().then(snapshot => {
  
//     snapshot.docs.forEach(doc=>{read.push({
//       notification: doc.data().notification,
//       sender:doc.data().sender,
//       createdAt: doc.data().createdAt,
//       id:doc.id
//     })})
//     console.log('readddd',read)
//   }).then(()=>{dispatch({type:"read",read:read})})
// )

export const push_noti=(email,notify,sender)=>{
  return (dispatch,getState,{getFirebase})=>{
      const firestore= getFirebase().firestore();
      firestore.collection(`/users/${email}/notifications`).add({
          notification: notify,
          sender:sender,
          createdAt: new Date()
      })
  }
}
export const add_Reminder=(text,date,id)=>{
    return (dispatch,getState,{getFirebase})=>{
        const firestore= getFirebase().firestore();
        let reminders=[]
        firestore.collection(`/users/${id}/notes`).add({
            text: text,
            date: date,
            createdAt: new Date()
        }).then(()=>{
            firestore.collection(`/users/${id}/notes`).get().then(snapshot => {snapshot.docs.forEach(doc=>{
                reminders.push({data:doc.data(),id:doc.id})
            })
            }).then(()=>{ dispatch({type: ADD_REMINDER,reminders:reminders})})
            })
    }
}
export const get_reminder=(id)=>{
    return (dispatch,getState,{getFirebase})=>{
        const firestore= getFirebase().firestore();
        let reminders=[]
            firestore.collection(`/users/${id}/notes`).get().then(snapshot => {
              console.log("fireb",getFirebase())
                snapshot.docs.forEach(doc=>{reminders.push({data:doc.data(),id:doc.id})
            })
            //console.log("remindersssss",reminders)
            })
            .then(()=>{console.log('hi');dispatch({type: "get_reminders",reminders:reminders})})
    }
}

export const get_acc=(id)=>{
  return (dispatch,getState,{getFirebase})=>{
    const firestore= getFirebase().firestore();
    let data
        firestore.doc(`/users/${id}`).get().then(snapshot => {
            data= snapshot.data()
        // console.log("acc", snapshot.data())
        }).then(()=>{dispatch({type: "get_acc",data:data})})
  }
}

export const remove_Reminder = (id,email)=>{
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        let reminders =[]
        // console.log("firebase",id)
        firestore.collection(`/users/${email}/notes`).doc(id).delete()
        .then(()=>{
            firestore.collection(`/users/${email}/notes`).get().then(snapshot => {snapshot.docs.forEach(doc=>{
                reminders.push({data:doc.data(),id:doc.id})
            })
            }).then(
                ()=>{dispatch({type: ADD_REMINDER,reminders:reminders})})
        })
    }
}
export const remove_notification=(id,email)=>{
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    //console.log("delete",email,id)
    firestore.collection(`/users/${email}/read`).doc(id).delete()
  }
}

export const get_rem =(email)=>{
    return (dispatch, getState, { getFirebase }) => {
        let notifications =[]
        const firestore = getFirebase().firestore();

        firestore.collection(`/users/${email}/notifications`).onSnapshot(
            function(snapshot) {
              snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                                // console.log("New city: ", change.doc.id);
                                generateNotification(change.doc.data().sender,change.doc.data().notification)
                  notifications.push({sender:change.doc.data().sender,notification:change.doc.data().notification,id:change.doc.id,date:change.doc.createdAt})
                }
                if (change.type === "removed") {
                  notifications=[]
                }
              })
              // console.log("New city: ", notifications);
              dispatch({type:"notifications",notifications:notifications})
            }
        )
            

                // doc.docs.forEach(doc=>{
                //     reminders.push({data:doc.data(),id:doc.id})
                // })
                //console.log("reminders111notifffffff")
                //generateNotification()
            
        firestore.collection(`/login_signup/Users/${email}`).onSnapshot(
            function(doc) {
                let reminders=[]

                doc.docs.forEach(doc=>{
                    reminders.push({data:doc.data(),id:doc.id})
                })
            },
            //console.log("notify")
        )
    }
}
// export const remove_Reminder = (id)=>{
//     const action ={
//         type: REMOVE_REMINDER,
//         id: id,
//     }
//     console.log("Remove",action)
//     return action
// }
// export const add_Reminder=(text,date)=>{
    
//     const action = {
//         type: ADD_REMINDER,
//         text:text,
//         date:date,
//     }
//     console.log("Add",action)
//     return action
// }






export const remove_status=()=>{
  return ({type:'deletestatus'})
}
export const reset =(email)=>{
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      dispatch({type:'reset',status:'Email Sent'})
    }).catch(function(error) {
      dispatch({type:'reset',status:error})
    });
  }
}
export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
    
      firebase.auth().signInWithEmailAndPassword(
        
        credentials.email,
        credentials.password
      ).then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
    }
}
export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
  
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' })
      });
    }
}
export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const firestore = getFirebase().firestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email, 
      newUser.password
    ).then(resp => {
      console.log("resp",resp)
      return firestore.collection('users').doc(resp.user.email).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        type: "user"
      }).then(() =>{

        firebase.storage().ref('ProfilePictures/'+resp.user.email).put(newUser.pc)
      });
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err});
    });
  }
}

export const editacc = (email,first,last) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const firestore = getFirebase().firestore();
    var user = firebase.auth().currentUser;

    user.updateProfile({firstName:first,lastName:last}).then(resp => {
      return firestore.collection('users').doc(email).set({
        firstName: first,
        lastName: last,
      });
    })
  }
}
export const upd_PC = (email,file) => {
  return (dispatch, getState, {getFirebase}) => {
    console.log("file",file)
    const firebase = getFirebase();
    firebase.storage().ref('ProfilePictures/'+email).put(file)
  }
}
export const get_PC = (email) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.storage().ref('ProfilePictures/'+email).getDownloadURL()
    .then(imgUrl => {
      console.log(imgUrl);
      dispatch({type:"pc",pc:imgUrl})
    });

  }
}