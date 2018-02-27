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
        this.handleDelete = this.handleDelete.bind(this);
    }

    //componentDidMount() life cycle method
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'));
        this.setState({ user: user.result });
        const self = this;
        const { dispatch } = this.props;
        dispatch(userActions.getAll(user, function (data) {
            self.setState({ data });
        }));
    }

    //function handle change for update the state
    handleChange(event) {
        event.preventDefault();
        let formData = this.state.formData;
        let name = event.target.name; // Field name
        let value = event.target.value; // Field value

        formData[name] = value;

        this.setState({ formData });
    }

    //function handle submit for submitting data into db
    handleSubmit(event) {
        event.preventDefault();
        var self = this;
        const _id = this.state.user._id;
        const formData = this.state.formData;
        const { dispatch } = this.props;
        dispatch(userActions.register_dir(formData, _id, function (newdata) {
            self.setState({ data: newdata });
        }));
    }

    //function handle delete for deleting the users directory
    handleDelete(e) {
        e.preventDefault();
        console.log(e.target.value);
    }

    render() {
        const { loggingIn } = this.props;
        if (this.state.data !== undefined) {
            var dir = this.state.data.result;
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <a herf="#"><img src="https://i.pinimg.com/736x/c6/a4/64/c6a4645d9f9af45a9c9d7b094c18a47a--portrait-ideas-girl-photos.jpg" className="propic" alt="" /></a><h4 className="uname"><i>{this.state.user.firstName} {this.state.user.lastName}</i></h4>
                            <Link to="/" className="logout"><i className="material-icons">power_settings_new</i></Link>
                        </div>
                    </div>
                    <div className="content">
                        <label>Name: </label> <input type="text" className="col-xs-3" name="name" value={this.state.formData["name"]} onChange={this.handleChange.bind(this)} /> &nbsp; &nbsp;
                        <label>Mobile: </label> <input type="number" className=" col-xs-3" name="mobile" value={this.state.formData["mobile"]} onChange={this.handleChange.bind(this)} /> &nbsp;&nbsp;
                        <button type="button" className="btn btn-primary btn-sm" onClick={this.handleSubmit.bind(this)}>Save</button>&nbsp;&nbsp;
                        <button type="button" className="btn btn-danger btn-sm">Cancel</button>
                    </div><br /><br />
                    <div className="data">
                        <table className="table table-hover">
                            <thead className="thead-inverse">
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Mobile</th>
                                    <th className="text-center">Edit</th>
                                    <th className="text-center">Delete</th>
                                </tr>
                            </thead>
                            {
                                dir.map((items, index) => {
                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <td width="220px" align="center" >{items.name}</td>
                                                <td width="220px" align="center">{items.mobile} </td>
                                                <td width="150px" align="center"><a herf="#"><i className="material-icons">border_color</i></a></td>
                                                <td width="150px" align="center"><a herf="javascript:;" ><i className="material-icons" onClick={this.handleDelete} value={items._id}>delete</i></a></td>
                                            </tr>
                                        </tbody>
                                    )
                                })
                            }
                        </table>
                    </div>
                </div >
            );
        } else {
            return null;
        }
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { loggingIn } = authentication;
    return {
        loggingIn,
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };