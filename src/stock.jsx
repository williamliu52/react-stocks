import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Stock extends Component {
    render() {
        return(
            <tr>
                <td>{this.props.symbol}</td>
                <td>{this.props.name}</td>
                <td>{this.props.change.toFixed(2)}</td>
                <td>{this.props.current}</td>
                <td>{this.props.high}</td>
                <td>{this.props.low}</td>
                <td>
                    <Button bsStyle="primary" onClick={() => { this.props.generateChart(this.props.symbol)}}>View</Button>
                </td>
            </tr>
        );
    }
}

export default Stock;
