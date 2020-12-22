import React, { Component } from 'react'
import SubmitButton from './SubmitButton.js'
import Pickup from '../Icons/Pickup.svg'
import Dropoff from '../Icons/Dropoff.svg'
import Pays from '../Icons/Pays.svg'

export class IndividualJob extends Component {

  acceptJob = () => {
    this.props.acceptJob(this.props.id);
  }


  render() {
    return (
      <div>
        <div className='JobCard'>

          <h1>Job</h1>

          <div className='JobDetails'>
              <img src={Pickup}
                  alt='Pickup' 
                  className='JobIcons'/>

              <div className='JobDetailsFlexContainer'>
                <div>
                  <span className='JobDetailsGrey'>Pickup from </span>{this.props.pickupAdd1}
                </div>
                <div>
                  {this.props.pickupAdd2}
                </div>
              </div>

            </div>

            <div className='JobDetails'>
              <img src={Dropoff} 
                  alt='Dropoff' 
                  className='JobIcons'/>

              <div className='JobDetailsFlexContainer'>
                <div>
                  <span className='JobDetailsGrey'>Drop-off at </span>{this.props.dropoffAdd1}
                </div>

                <div>
                  {this.props.dropoffAdd2}
                </div>              
              </div>

            </div>

          <div className='JobDetails'>
                <img src={Pays} 
                alt='$' 
                className='JobIcons' 
                style={{padding: '0 12px 0 5px'}}/>
                <span className='JobDetailsGrey'>Pays </span>${this.props.pays}
          </div>

          </div>

          <div className='AcceptCard'>
          <SubmitButton 
            text='ACCEPT'
            disabled={false}
            className='AcceptButton'
            onClick={this.acceptJob}
            />
          </div>
        
      </div>
    )
  }
}

export default IndividualJob
