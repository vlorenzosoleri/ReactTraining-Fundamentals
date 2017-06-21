import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

class Battle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerOneName: "",
            playerTwoName: "",
            playerOneImage: null,
            playerTwoImage: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, username) {
        this.setState(() => {
            let newState = {};
            newState[id+'Name'] = username;
            newState[id+'Image'] = 'https://github.com/' + username + '.png?size=200';
            return newState;
        });
    }

    handleReset(id) {
        this.setState(() => {
            let newState = {};
            newState[id+'Name'] = "";
            newState[id+'Image'] = null;
            return newState;
        })
    }

    render() {
        const playerOneName = this.state.playerOneName;
        const playerTwoName = this.state.playerTwoName;
        const playerOneImage = this.state.playerOneImage;
        const playerTwoImage = this.state.playerTwoImage;
        const match = this.props.match;
        return (
            <div>
                <div className="row">
                    {!playerOneName &&
                        <PlayerInput
                        id='playerOne'
                        label="Player One"
                        onSubmit={this.handleSubmit} />}

                    {playerOneImage &&
                        <PlayerPreview
                            avatar={playerOneImage}
                            username={playerOneName} >
                            <button
                                className="button"
                                onClick={this.handleReset.bind(null, 'playerOne')} >
                                Reset
                            </button>
                        </PlayerPreview>
                    }

                    {!playerTwoName &&
                        <PlayerInput
                        id='playerTwo'
                        label="Player Two"
                        onSubmit={this.handleSubmit} />}

                    {playerTwoImage &&
                        <PlayerPreview
                            avatar={playerTwoImage}
                            username={playerTwoName} >
                            <button
                                className="button"
                                onClick={this.handleReset.bind(null, 'playerTwo')} >
                                Reset
                            </button>
                        </PlayerPreview>
                    }
                </div>
                {playerOneImage && playerTwoImage &&
                    <Link className="button" to={{
                        pathname: match.url + "/results",
                        search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
                    }} >Battle</Link>}
            </div>
        );
    }
}

class PlayerInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({username: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(
            this.props.id,
            this.state.username
        );
    }

    render() {
        return (
            <form className="column" onSubmit={this.handleSubmit} >
                <label className="header" htmlFor="username">
                    {this.props.label}
                </label>
                <input type="text"
                    id="username"
                    placeholder="github username"
                    autoComplete="off"
                    value={this.state.username}
                    onChange={this.handleChange} />
                <button
                    className="button"
                    type="submit"
                    disabled={!this.state.username} >
                    Submit
                </button>
            </form>
        );
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default Battle;