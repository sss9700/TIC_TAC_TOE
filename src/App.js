import React, { Component } from "react"
import './App.css';
import Firebase from './firebase/auth';
import Rules from './rules'

class App extends Component {
 
  render(){
    return (
    <div className="App">
      <Rules/>
      <Firebase/>  
      

    </div>
    )
}
}

export default App;
