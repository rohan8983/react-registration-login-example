import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import './homepage.css';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {},
        };
    }

    handleChange(event) {
        event.preventDefault();
        let formData = this.state.formData;
        let name = event.target.name; // Field name
        let value = event.target.value; // Field value

        formData[name] = value;

        this.setState({ formData });
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = this.state.formData;
        console.log(formData);
        const { dispatch } = this.props;
        dispatch(userActions.register_dir(formData));
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 className="uname"><i>{user.firstName} {user.lastName}</i></h4>
                        <Link to="/login" className="logout">Logout</Link>
                    </div>
                </div>
                <div align="center">
                    <input type="text" className="col-xs-3" name="address" value={this.state.formData["address"]} onChange={this.handleChange.bind(this)} /> &nbsp; &nbsp;
                        <input type="number" className=" col-xs-3" name="mobile" value={this.state.formData["mobile"]} onChange={this.handleChange.bind(this)} /> &nbsp;&nbsp;
                        <button type="button" className="btn btn-primary btn-sm" onClick={this.handleSubmit.bind(this)}>Save</button>&nbsp;&nbsp;
                        <button type="button" className="btn btn-danger btn-sm">Cancel</button>
                </div>
                <br />
                <div align="center">
                    sample table data
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users,
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };