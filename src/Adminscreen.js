import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import AdminLogin from './AdminLogin';
class Adminscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      adminscreen:[],
      adminmessage:'',
      buttonLabel:'AdminLogin',
      isLogin:true
    }
  }
  handleClick(event){
    // console.log("event",event);
    var adminmessage;
    if(this.state.isLogin){
      var adminscreen=[];
      adminscreen.push(<AdminLogin parentContext={this}/>);
      adminmessage = "Already registered? Go to Login";
      this.setState({
                     adminscreen:adminscreen,
                     adminmessage:adminmessage,
                     buttonLabel:"Login",
                     isLogin:false
                   })
    }
    else{
      adminscreen=[];
      adminscreen.push(<Login parentContext={this}/>);
      adminmessage = "Not Registered yet? Go to registration";
      this.setState({
                     adminscreen:adminscreen,
                     adminmessage:adminmessage,
                     buttonLabel:"AdminLogin",
                     isLogin:true
                   })
    }
  }
  componentWillMount(){
    var adminscreen=[];
    adminscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
    var adminmessage = "Not registered yet? Register Now";
    this.setState({
                  adminscreen:adminscreen,
                  adminmessage:adminmessage
                    })
  }
  render() {
    return (
      <div className="adminscreen">
        {this.state.adminscreen}
        <div>
          {this.state.adminmessage}
          <MuiThemeProvider>
            <div>
               <RaisedButton label={this.state.buttonLabel} primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
           </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Adminscreen;