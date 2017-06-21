import React, { Component } from 'react';

class Loading extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text
        }
    }

    componentDidMount() {
        const stopper = this.props.text + "...";
        this.interval = window.setInterval(() =>{
            if(this.state.text === stopper) this.setState({text: this.props.text});
            this.setState((prevState) => {
                return {text: prevState.text + "."};
            });
        }, this.props.speed);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render() {
        return (
            <p style={styles.content}>
                {this.state.text}
            </p>
        );
    }
}

const styles = {
    content: {
        textAlign: "center",
        fontSize: "35px"
    }
};

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}

export default Loading;