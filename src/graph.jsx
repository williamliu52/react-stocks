import React, { Component } from 'react';
import { LineChart, Line, Legend, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class Graph extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <LineChart width={500} height={400} data={this.props.graphData}  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name" label="Time" allowDecimals={false} />
              <YAxis label="Price ($)" type="number" domain={['dataMin - 5','dataMax + 5']} />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3"/>
              <Line type="monotone" dataKey="value" stroke="#8884d8" name={this.props.symbol} />
              {this.props.lookup}
            </LineChart>
        );
    }

}

export default Graph;
