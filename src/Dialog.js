import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Dialog extends Component {
  constructor(props) {
    super(props);
  }

  organizeData() {
    const { title, activities, removeActivity } = this.props;
    let builtDiv = [];
    let occurenceMap = {};
    activities.map((curActivity) => {
      console.log(title, curActivity);

        const { activity } = curActivity;
        if ( title == 'Scheduled Activities') {
          removeActivity(activity);
          const { activityLeader, time, location } = curActivity;
          let meetingTime = new Date(time);
          builtDiv.push(
            <div className='Activity-list'>
              {activity} with {activityLeader}
              <div className='Activity-secondary'>
                {meetingTime.toLocaleString()} at {location}
              </div>
            </div>);
          } else {
            occurenceMap[activity] = occurenceMap[activity] ? occurenceMap[activity] + 1 : 1;
          }
      });
      if (Object.keys(occurenceMap).length) {
        console.log(occurenceMap);
        for (var activity in occurenceMap) {
          builtDiv.push(
            <div className='Activity-list'>
              <div className='Activity-vol'><span className='nudge-right'>{activity}</span><i class="float-right fas fa-hands-helping"></i></div>
              <div className='Activity-secondary'>
                Requested by {occurenceMap[activity]} person(s)
              </div>
            </div>);
        }
      }

      console.log(occurenceMap);
    return builtDiv;
  }

  render() {
    const { activities, title, faName } = this.props;
    return (
      <div className="Dialog-box">
          <div className="Dialog-header"><i class={`nudge-right fas ${faName}`}></i>{title}</div>
        <div className="Dialog-content">
          { activities.length ? <div> {this.organizeData()}</div> : <div>There are currently no activities available.</div> }
        </div>
      </div>
    );
  }
}

export default Dialog;
