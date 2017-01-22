import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue : ''
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(text) {
        this.setState({ inputValue: text });
        this.props.lookup(text);
    }

    render() {
        return(
            <Typeahead
                onInputChange={this.onInputChange}
                onChange={this.props.onChange}
                options={this.props.options}
                placeholder={"Search"}
                emptyLabel={"No results found"}
            />
        );
    }
}

export default Search;
