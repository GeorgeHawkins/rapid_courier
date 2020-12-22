import React, { Component } from 'react'

export class SubmitButton extends Component {
  render() {
    return (
      <button 
      type='button'
      disabled={this.props.disabled} 
      className={this.props.className}
      onClick={this.props.onClick}>
      {this.props.text}
      </button>
    )
  }
}

export default SubmitButton
