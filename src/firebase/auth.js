import React, { Component } from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import  Game  from "../board/board";
import {ini} from '../board/board';
import  Game1  from "../board/four";
import firebase from './firebase'

import '../board/board.css';
import "./firebase.css";

const db = firebase.firestore();
 
class Firebase extends Component {
  state= { 
    isSignedIn:false ,
    username:"",
    userData:null
  }
  uiConfig = {
    signInFlow: "popup",
    
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,      
    ],

    callbacks:{
      signInSuccessWithAuthResult:()=>false
    }
    
  }
  componentDidMount = ()=>{
    
    firebase.auth().onAuthStateChanged(user=>{
      this.setState({isSignedIn:!!user})
      if(this.state.isSignedIn)
      {
        this.setState({username:firebase.auth().currentUser.displayName});
        db.collection('user').where('username','==',this.state.username).get().then(doc=>{
          if(doc.empty)
          {
            db.collection("user").add({
              username:this.state.username,
              matches:0,
              score:0
            }); 
          }
          else{ 
        
              doc.docs.forEach(doc=>{
                if(doc.data().username==this.state.username)
                {console.log(doc.data());ini(doc.data().score,doc.data().matches,doc.data().username);}              
                
              })             
                          
          }         
          
        })         
        
      }
      console.log(this.state.isSignedIn);
      
      db.collection("user").orderBy("score","desc").get().then((snapshot)=>
      {
        const userData=[];
        snapshot.docs.forEach(doc=>{
          const data=doc.data();
          userData.push(data);
          
          
        })
        this.setState({userData:userData})
      })

    })
  }
  render(){
    return (
    <div className="top">
      {this.state.isSignedIn ?
       <span className="auth">
         <p>Please refresh the page if you can't see your username on the board</p>
         <th>user</th>
          <th>matches</th>
          <th>score</th>
         {this.state.userData && this.state.userData.map(user=>{
           return(
             
               
               <tr>
                 
                 <td>{user.username}</td>
                 <td>{user.matches}</td>
                 <td>{user.score}</td>
               </tr>
            
           )
         })}
         <div>Signed in</div>
      <button onClick={()=>firebase.auth().signOut()}>Sign out</button>
      <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
      
            <img
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
      <Game/>
      </span>
      :<StyledFirebaseAuth uiConfig={this.uiConfig}
      firebaseAuth={firebase.auth()}
      />
      
    }
    
     
    </div>
    )
}
}

export default Firebase;