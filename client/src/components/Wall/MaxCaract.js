import React from 'react'

var TwitterInput = React.createClass({
    getInitialState: function() {
        return {
            chars_left: max_chars
        };
    },
    handleChange(event) {
        var input = event.target.value;
        this.setState({
            chars_left: max_chars - input.length
        });
    },
    render: function() {
        return (
            <div>
                <textarea onChange={this.handleChange.bind(this)}></textarea>
                <p>Characters Left: {this.state.chars_left}</p>
            </div>
        );
    }
});

export default MaxCaract