import React, { Component } from 'react';
import Stock from './stock';
import { Table } from 'react-bootstrap';
import GraphData from './graphData';

class StockTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRow : '',
            graphSymbol : ''
        }

        this.generateChart = this.generateChart.bind(this);
    }

    generateChart(symbol) {
        this.setState({
            graphSymbol : symbol
        });
    }

    render() {
        var rows = [];
        this.props.quotes.forEach((stock) => {
            rows.push(
                <Stock key={stock.Name}
                    symbol={stock.Symbol}
                    name={stock.Name}
                    change={stock.Change}
                    current={stock.LastPrice}
                    high={stock.High}
                    low={stock.Low}
                    generateChart={this.generateChart}/>
            );
        });
        return(
            <div className="stockTable">
                <div class="companyTable">
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Company Name</th>
                                <th>Change</th>
                                <th>Current</th>
                                <th>High</th>
                                <th>Low</th>
                                <th>View Chart</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </div>
                <div class="graphArea">
                    <GraphData
                        symbol={this.state.graphSymbol}/>
                </div>
            </div>
        );
    }
}

export default StockTable;
