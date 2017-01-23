import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue : ''
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onInputChange(text) {
        this.setState({ inputValue: text });
        this.props.lookup(text);
    }

    onChange(stock) {
        if (stock.length > 0) {
            this.refs.search.getInstance().clear()
            this.props.onChange(stock);
        }
    }

    render() {
        return(
            <Typeahead ref="search"
                onInputChange={this.onInputChange}
                onChange={this.onChange}
                options={this.props.options}
                placeholder={"Search"}
                emptyLabel={"No results found"}
            />
        );
    }
}

export default Search;
