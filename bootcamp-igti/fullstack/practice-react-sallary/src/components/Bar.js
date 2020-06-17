import React, { Component } from 'react'

export default class Bar extends Component {
    render() {
        const { style, width } = this.props;
        return (
            <div className={style} style={{width: width+'%'}}></div>
        )
    }
}
