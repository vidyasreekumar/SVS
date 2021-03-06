import React, { Component }  from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './Login';
class AdminLogin extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:''
  }
 }
 handleClick(event){
    var apiBaseUrl = "http://localhost:4000/api/";
    console.log("values",this.state.email,this.state.password);
    var self = this;
    var payload={
    "email":this.state.username,
    "password":this.state.password
    }
    axios.post(apiBaseUrl+'adminlogin', payload)
    .then(function (response) {
    console.log(response);
    if(response.data.code === 200){
    //console.log("Login successfull");
    var adminscreen=[];
    adminscreen.push(<Login parentContext={this}/>);
    var adminmessage = "Not Registered yet? Go to registration";
    self.props.parentContext.setState({adminscreen:adminscreen,adminmessage:adminmessage,
    buttonLabel:"AdminLogin",
    isLogin:true    
    });
}
    else if(response.data.code === 204){
    console.log("Username password do not match");
    alert("username password do not match")
    }
    else{
    console.log("Username does not exists");
    alert("Username does not exist");
    }
    })
    .catch(function (error) {
    console.log(error);
    });
    }
render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Admin Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default AdminLogin;