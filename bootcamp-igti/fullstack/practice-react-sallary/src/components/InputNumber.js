import React, { Component } from 'react'

export default class InputNumber extends Component {

    handleCalcSalary = (event) => {
        this.props.onChangeNumber(event.target.value);
    }

    render() {
        const { number } = this.props;
        return (
        <div>
            <input step="10" type="number" id="idsalary"  value={number} onChange={this.handleCalcSalary} />
        </div>
        )
    }
}
