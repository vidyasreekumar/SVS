import React, { Component }  from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { BrowserRouter as Router,Route,Link,Switch } from "react-router-dom";
import AdminLogin from './AdminLogin'
import Homepage from './Homepage';
import { Redirect } from 'react-router-dom';

class Login extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:'',
  //buttonLabel1:'Admin Login'
  }
 }
 handleClick(event){
    var apiBaseUrl = "http://localhost:4000/api/";
    var self = this;
    var payload={
    "email":this.state.username,
    "password":this.state.password
    }
    axios.post(apiBaseUrl+'login', payload)
    .then(function (response) {
    console.log(response);
    if(response.data.code === 200){
    console.log("Login successfull");
    var homepage=[];
    homepage.push(<Homepage appContext={self.props.appContext}/>)
    self.props.appContext.setState({loginPage:[],homepage:homepage})
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

/*handleClick1 = () =>{
    this.setState({
        redirect: true
    })
}*/

render() {
    /*const { redirect } = this.state;
    if(redirect){
        return <Router><Redirect to ='/AdminLogin'/></Router>
    }
    else{*/
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
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
             <br/>
             {/*<RaisedButton label={this.state.buttonLabel1} primary={true} style={style} onClick={(event) => this.handleClick1(event)}/>
             */}
             
             <Router>
             <Link to="/AdminLogin">Admin Login</Link>
             <Route path="/AdminLogin">
             
             </Route>
             </Router>
            
             
             
         </div>
         </MuiThemeProvider>
      </div>
    );
    }
  }

const style = {
 margin: 15,
};
export default Login;