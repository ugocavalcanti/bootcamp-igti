import React, { Component } from 'react'

export default class InputReadOnly extends Component {
    render() {
        let { value, percent } = this.props;
        if (percent !== undefined){
          percent = ` (${percent.toFixed(2)}%)`;
        }else {
          percent = "";
        }
        return (
        <div>
          <input type="text" value={value.toFixed(2) + percent} readOnly />
        </div>
        )
    }
}
