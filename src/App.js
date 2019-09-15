import React, { Component } from 'react';
import Dialog from './Dialog';
import './App.css';
import { base, signUp, signIn } from './base';
import { runInContext } from 'vm';

class App extends Component {
  constructor() {
    super();
    this.addUser = this.addUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.userSignInOrUp  = this.userSignInOrUp.bind(this);
    this.removeActivity = this.removeActivity.bind(this);
    this.addActivity = this.addActivity.bind(this);
    this.triggerRerender = this.triggerRerender.bind(this);

    this.state = {
      users: [],
      scheduledActivities: [],
      requestedActivities: [],
      needRerender: false
    }
  }

  addUser(name, email, role) {
    const users  = { ...this.state.users} ;
    const id = Date.now();
    users[id] = {
      id: id,
      name: name,
      email: email,
      role: role
    };

    this.setState({users});
  }

  removeActivity(scheduledActivity = '') {
    let { requestedActivities } = this.state;
    console.log(requestedActivities);
    for (var i in requestedActivities) {
      console.log(i);
      const { activity = '' } = requestedActivities[i];
      console.log(activity, scheduledActivity);
      if (activity.toLowerCase() == scheduledActivity.toLowerCase()) {
        delete requestedActivities[requestedActivities[i].id];
      }
    }
    console.log(requestedActivities);
    this.setState({requestedActivities});
  }

  addActivity(activityName) {
    let { requestedActivities } = this.state;
    let actLength = Object.keys(requestedActivities).length;
    const date = new Date();
    requestedActivities[actLength * 2 + 3] = {
        "activity" : activityName,
        "dateRequested" : date.getTime(),
        "id": actLength * 2 + 3
    }
    console.log(requestedActivities);
    this.setState({requestedActivities});
  }


  updateUser(user) {
  }

  componentWillMount() {
    this.usersRef = base.syncState('users', {
      context: this,
      state: 'users'
    });
    this.reqActivitiesRef = base.syncState('requestedActivities', {
      context: this,
      state: 'requestedActivities'
    });
    this.scheduledActivitiesRef = base.syncState('scheduledActivities', {
      context: this,
      state: 'scheduledActivities'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.usersRef);
    base.removeBinding(this.reqActivitiesRef);
    base.removeBinding(this.scheduledActivitiesRef);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  triggerRerender() {
    this.setState({needRerender: true});
  }

  userSignInOrUp = (signin) => {
    const { email, password } = this.state;
    if (!signin) {
      signUp(email, password);
    } else {
      signIn(email, password)
    }
  }


  render() {
    const { scheduledActivities, requestedActivities, email, password } = this.state;
    console.log(scheduledActivities);
    return (
      <div className="App-wrapper">
        <header className="App-header">
        <div className="App-title">propel<i class="far fa-parachute-box"></i></div>
        <div className="App-Login">
        <label for="name"><i class="fas fa-user"></i></label>
        <input className='app-inputBox' type="text" id="name" name="name" required
              minlength="4"  size="20" placeholder="E-mail" onChange={this.handleEmailChange}></input>
        <label for="name"><i class="fas fa-key"></i></label>
        <input className='app-inputBox' type="password" placeholder="Password" id="pw" name="pw" required
              minlength="4" size="20" onChange={this.handlePasswordChange}></input>
          <button className="app-inputButton" onClick={ ()=>{this.userSignInOrUp(true)} }>
            Log In
          </button>
          <div className="app-signUpLink nudge-right "> or &nbsp;</div>
          <button onClick={ ()=>{this.userSignInOrUp(false)} }className="app-inputButton special-color">
            Sign Up 
          </button>
        </div>
        </header>
        <div className="App-cover">
          <div className="App-quote"><span>Sign up to request activities, 
            or share your talents and volunteer to lead an activity! Rack up benefits for being a helpful member of your community!&nbsp;<i class="fas fa-stars"></i></span></div>
        </div>
        <div className="App-intro">
          <Dialog triggerRerender={this.triggerRerender} activityRequest={"true"} addActivity={this.addActivity} title="Submit an Activity Request" faName="fa-hand-heart"></Dialog>
          <Dialog triggerRerender={this.triggerRerender} volunteer={"true"} title="Volunteer to Facilitate an Activity" faName="fa-hands-helping"></Dialog>
        </div>
        <div className="App-intro">
          <Dialog triggerRerender={this.triggerRerender} activities={ scheduledActivities } removeActivity={this.removeActivity} title="Scheduled Activities" faName="fa-calendar-check"></Dialog>
          <Dialog triggerRerender={this.triggerRerender}  activities={ requestedActivities }  removeActivity={this.removeActivity} title="Requested Activities" faName="fa-calendar-star"></Dialog>
        </div>
      </div>
    );
  }
}

export default App;
