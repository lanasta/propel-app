import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.handleActivityInputChange= this.handleActivityInputChange.bind(this);
    this.state = {
      newActivity: '',
      activityChosen: ''
    }
  }

  handleActivityInputChange(event) {
    this.setState({newActivity: event.target.value});
  }

  handlePicked(activity) {
    console.log('wejaeuaweiae', activity);
    this.setState({activityChosen: activity}, () => {
      this.formDialogContent();
    });
  }

  organizeData() {
    const { title, activities, removeActivity } = this.props;
    let builtDiv = [];
    let occurenceMap = {};
    activities.map((curActivity) => {
        let { activity } = curActivity;
        activity = activity.toLowerCase();
        if ( title == 'Scheduled Activities') {
          removeActivity(activity);
          const { activityLeader, time, location } = curActivity;
          let meetingTime = new Date(time);
          builtDiv.push(
            <div className='Activity-list'>
              {activity} with {activityLeader}
              <div className='Activity-secondary'>
              <i class="nudge-right fas fa-clock"></i>{meetingTime.toLocaleString()} < i class="nudge-right fas fa-map-pin"></i>{location}
              </div>
            </div>);
          } else {
            occurenceMap[activity] = occurenceMap[activity] ? occurenceMap[activity] + 1 : 1;
          }
      });
      if (Object.keys(occurenceMap).length) {
        for (var activity in occurenceMap) {
          builtDiv.push(
            <div className='Activity-list'>
              <div className='Activity-vol'><span className='nudge-right'>{activity}</span><i onClick={this.handlePicked.bind(this, activity)} class="float-right fas fa-hands-helping"></i></div>
              <div className='Activity-secondary'>
                Requested by {occurenceMap[activity]} person(s)
              </div>
            </div>);
        }
      }
    return builtDiv;
  }

  formDialogContent() {
    const { activityRequest, volunteer, addActivity } = this.props;
    const { newActivity, activityChosen } = this.state;
     if (activityRequest) {
      return <div><input className='app-inputBox' type="text" placeholder="Please submit an activity that you are eager to do or learn." id="pw" name="pw" required
      minlength="4" size="20" onChange={this.handleActivityInputChange}></input>
    <button className="app-submitButton nudge-top" onClick={ ()=>{addActivity(newActivity); this.setState({newActivity:''})} }>
      Submit
    </button></div>;
    } else if (volunteer) {
      return <div>Choose an activity to facilitate by clicking on one of the hand icons below.<br></br>
      {activityChosen && <div>You have chosen to volunteer to facilitate the following activity ${activityChosen}</div> }</div>;
    } else {
      return <div>There are currently no activities available.</div> ;
    } 
  }

  render() {
    const { activities = [], title, faName, activityRequest, volunteer } = this.props;
    console.log(title, activities);
    const activitiesListing = title.indexOf("Activities") > -1 && activities.length;
    return (
      <div className="Dialog-box">
          <div className="Dialog-header"><i class={`nudge-right fas ${faName}`}></i>{title}</div>
        <div className="Dialog-content">
          { activitiesListing ? <div> {this.organizeData()}</div> : this.formDialogContent() }
        </div>
      </div>
    );
  }
}

export default Dialog;
