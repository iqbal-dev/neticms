import React from 'react';

export default class LocalClockTime extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString()
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
            time: new Date().toLocaleTimeString()
        });
    }

    render() {
        return (

            <span className="d-inline-flex justify-content-center align-items-center">
                <i className="fas fa-map-marker-alt pr-2" /> Bangladesh,
                Time :<span style={{ width: "95px"}}>{this.state.time}</span>
            </span>

        );
    }
}