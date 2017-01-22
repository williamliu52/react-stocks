import React, {Component} from 'react';
import fetchJSONP from 'fetch-jsonp';
import Graph from './graph'

class GraphData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // default to 3 months/quarter
            numberOfDays : 90,
            dataPeriod : "Day",
            graphData : []
        }

        this.getInputParams = this.getInputParams.bind(this);
        this.getGraphData = this.getGraphData.bind(this);
    }

    componentDidMount() {
        console.log("Mounted");
        this.getInputParams();
    }

    componentWillReceiveProps() {
        console.log("Will update");
        this.getInputParams()
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("Should update?");
        if (this.props.symbol !== nextProps.symbol) {
            return true;
        }
        return false;
    }

    getInputParams(days, period) {
        if (days) {
            this.setState({
                numberOfDays: days
            });
        }
        if (period) {
            this.setState({
                dataPeriod: period
            });
        }
        var params = {
            Normalized : false,
            NumberOfDays : this.state.numberOfDays,
            DataPeriod : this.state.dataPeriod,
            Elements : [
                {
                    Symbol : this.props.symbol,
                    Type : "price",
                    Params : ["ohlc"]
                }
            ]
        };
        var parameters = "parameters={\"Normalized\":" + params.Normalized + ",\"NumberOfDays\":" + params.NumberOfDays + ",\"DataPeriod\":\"" + params.DataPeriod + "\",\"Elements\":[{\"Symbol\":\"" + params.Elements[0].Symbol + "\",\"Type\":\"" + params.Elements[0].Type + "\",\"Params\":[\"" + params.Elements[0].Params + "\"]}]}";
        this.getGraphData(parameters);
        // return parameters;
    }

    getGraphData(parameters) {
        // var nbrDays = days ? days : this.state.numberOfDays;
        // var interval = period ? period : this.state.dataPeriod;
        // var params = this.getInputParams(nbrDays, interval);
        // console.log(params);
        let url = 'http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp?' + parameters;
        fetchJSONP(url).then((response) => {
            return response.json();
        }).then((results) => {
            var dataArray = [];
            for (var i = 0; i < results.Positions.length; i++) {
                dataArray.push(
                    {
                        'name' : results.Positions[i],
                        'value' : results.Elements[0].DataSeries.close.values[i]
                    }
                )
            }
            this.setState({
                graphData : dataArray
            });
        }).catch((err) => {
            // TODO: replace with proper alert
            console.log(err);
        })
    }

    render() {
        console.log(this.props.symbol);
        return(
            <Graph
            lookup={this.getInputParams}
            symbol={this.props.symbol} graphData={this.state.graphData} />
        );
    }
}

export default GraphData;