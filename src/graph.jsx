import React, { Component } from 'react';
import { LineChart, Line, Legend } from 'recharts';

class Graph extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <LineChart width={400} height={400} data={this.props.graphData}>
              <Line type="monotone" dataKey="value" stroke="#8884d8" name={this.props.symbol} />
              <Legend />
              {this.props.lookup}
            </LineChart>
        );
    }

}

export default Graph;
