import React, {Component} from 'react';
import reqwest from 'reqwest';
import { ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';
import Search from './search';
import StockTable from './stockTable';

class Container extends Component {
    constructor() {
        super();
        this.state = {
            stockLookup: [],
            stockQuotes: [],
            quotedStocks: [],
            validation: null
        }

        this.lookupStock = this.lookupStock.bind(this);
        this.getStockSelection = this.getStockSelection.bind(this);
        this.quoteStock = this.quoteStock.bind(this);
    }

    lookupStock(searchValue) {
        if (searchValue) {
            let url = 'http://dev.markitondemand.com/Api/v2/Lookup/jsonp?input=' + searchValue;
            var self = this;
            reqwest({
                url: url,
                type: 'jsonp',
                success: function(results) {
                    if (results !== undefined) {
                        let items = results.map((res, i) => {
                            return res.Name + " (" + res.Exchange + ")" + " (" + res.Symbol + ")"
                        });
                        self.setLookupStock(items);
                    }
                },
                error: function(err) {
                    console.log('Parsing failed, err');
                    self.setState({ validation : 'error' })
                }
            });
        }
    }

    setLookupStock(results) {
        if (results.length > 0) {
            this.setState({ validation: null });
            this.setState({ stockLookup: results });
        }
    }

    getStockSelection(stock) {
        if (stock[0]) {
            var pattern1 = /\W[A-Z]*\W$/;
            var pattern2 = /[A-Z]+/g;
            var result = pattern1.exec(stock[0]);
            var symbol = pattern2.exec(result[0]);
            this.quoteStock(symbol);
        }
    }

    quoteStock(stockSymbol) {
        let url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + stockSymbol;
        if (this.state.quotedStocks.indexOf(stockSymbol[0]) === -1) {
            this.setState({
                quotedStocks : this.state.quotedStocks.concat([stockSymbol[0]])
            });
            var self = this;
            reqwest({
                url: url,
                type: 'jsonp',
                success: function(results) {
                    if (results !== undefined) {
                        self.setQuoteStock(results);
                    }
                },
                error: function(err) {
                    console.log('Parsing failed, err');
                    self.setState({ validation : 'error' })
                }
            });
        }
    }

    setQuoteStock(results) {
        if (results !== undefined) {
            this.setState({ validation: null })
            this.setState({
                stockQuotes: this.state.stockQuotes.concat([results])
            });
        }
    }

    setQuoteStock(results) {
        if (results !== undefined) {
            this.setState({ validation: null })
            this.setState({
                stockQuotes: this.state.stockQuotes.concat([results])
            });
        }
    }

    render() {
        var renderTable = this.state.stockQuotes.length > 0;
        return (
            <div>
                <div>
                    <form>
                        <FormGroup controlId="searchBox" validationState={this.state.validation}>
                            <ControlLabel>Company Name or Symbol</ControlLabel>
                            <Search lookup={this.lookupStock} onChange={this.getStockSelection} options={this.state.stockLookup}/>
                            { this.state.validation && <HelpBlock>Error: stock cannot be found or has already been selected. Please try again</HelpBlock> }
                        </FormGroup>
                    </form>
                </div>
                <div>
                    { renderTable && <StockTable
                        quotes={this.state.stockQuotes}/> }
                </div>
            </div>
        );
    }

}

export default Container;
