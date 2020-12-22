import React, { Component } from 'react'
import IndividualJob from './IndividualJob.js'
import UserStore from '../Stores/UserStore.js'

export class Jobs extends Component {

  state = {
    jobs: [],
    isLoaded: false
  }

  async getJobs() {
    try {

      if (!UserStore.isLoggedIn) {
        console.log('User is not logged in');
        return false;
      }

      this.setState({ isLoaded: false})
      await new Promise(r => setTimeout(r, 1000));

      const res = await fetch('/jobs', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await res.json();
      if (result.length > 0) {
        this.setState({ 
          jobs: result,
          isLoaded: true
        });
      }
      else if (result && result.success === false) {
        this.setState({
          jobs: [],
          isLoaded: true
        })

      }

    }

    catch(e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    this.getJobs();
  }

  acceptJob = (id) => {
    
    try {

      fetch('/accept', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        })
      })
      .then(res => res.json())
      .then((result) => {
        if (result && result.success) {
          this.getJobs().then(this.setState({ isLoaded: true}));
        }
        else if(result && result.success === false) {
          alert(result.msg);
        }
      })

    }

    catch(e) {
      console.log(e);
    }

  }

  renderJobs() {
    return this.state.jobs.map((job) => {
      return (
        <IndividualJob 
        key={job.id} 
        id={job.id}
        pickupAdd1={job.pickupAdd1}
        pickupAdd2={job.pickupAdd2}
        dropoffAdd1={job.dropoffAdd1}
        dropoffAdd2={job.dropoffAdd2}
        pays={job.pays}
        acceptJob={this.acceptJob}
        />
      )
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return <div className='JobScreen'>Loading Available Jobs...</div>
    }

    else if (this.state.isLoaded && this.state.jobs.length < 1) {
      return <div className='JobScreen'>No available jobs, check back later</div>
    }

    else {
      return (
        <div className='JobScreen'>

          {this.renderJobs()}

        </div>
    
      )
    }
   
  }
  
}

export default Jobs