import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { alertActions } from '../_actions/alert.actions'
import './homepage.css';
import userPic from './user.png';
import logoutPic from './logout.png';
//import Pagination from '../Pagination/Pagination';

class HomePage extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            formData: { name: '', mobile: '', search: '', },
            flag: false,
            items: {},
            pageOfItems: [],
        };

        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        //update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
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
        const { dispatch } = this.props;
        const formData = this.state.formData;
        if (this.state.flag) {
            var userId = this.state.user._id;
            dispatch(userActions.updateDir(formData, userId, function (newData) {
                self.setState({ data: newData, flag: false });
            }));
        } else {
            const _id = this.state.user._id;
            dispatch(userActions.register_dir(formData, _id, function (newdata) {
                self.setState({ data: newdata });
                //dispatch(alertActions.clear());
            }));
        }
        self.setState({ formData: { name: '', mobile: '' } });
    }

    //function handle delete for deleting the users directory
    handleDelete(id) {
        var obj = {
            id: id,
            user: this.state.user,
        }
        var self = this;
        const { dispatch } = this.props;
        dispatch(userActions.deleteDir(obj, function (data) {
            self.setState({ data: data });
        }));
    }

    handleEdit(value) {
        let obj = {
            _id: value._id,
            name: value.name,
            mobile: value.mobile,
        }
        this.setState({
            formData: obj,
            flag: true,
        });
    }

    handleSearch() {
        var value = this.state.formData.search.toLowerCase(),

            matches = this.state.data.result.filter(function (item) {
                return item.name.substring(0, value.length).toLowerCase() === value || item.mobile.substring(0, value.length).toLowerCase() === value;
            });
        var result = matches;
        var searchData = {
            result,
        }
        this.setState({ data: searchData });
    }

    handleSearchChange(event) {
        event.preventDefault();
        let formData = this.state.formData;
        let name = event.target.name; // Field name
        let value = event.target.value; // Field value
        var current = this;
        formData[name] = value;

        this.setState({ formData });
        var userId = this.state.user._id;
        const { dispatch } = this.props;

        dispatch(userActions.search(formData, userId, function (newdata) {
            current.setState({ data: newdata })
        }));
    }

    handleLogout() {
        userActions.logout();
    }

    render() {
        const { loggingIn } = this.props;
        if (this.state.data !== undefined) {
            var dir = this.state.data.result;
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <a herf="#" title="Profile"><img src={userPic} className="propic" alt="userPic" /></a><h4 className="uname"><i>{this.state.user.firstName} {this.state.user.lastName}</i></h4>
                            <Link to="/" onClick={this.handleLogout.bind(this)} className="logout" title="Logout"><img src={logoutPic} className="logoutpic" /></Link>
                        </div>
                    </div>
                    <div className="content">
                        <label>Name: </label> <input type="text" className="col-xs-3" name="name" value={this.state.formData["name"]} onChange={this.handleChange.bind(this)} /> &nbsp; &nbsp;
                        <label>Mobile: </label> <input type="number" className=" col-xs-3" name="mobile" value={this.state.formData["mobile"]} onChange={this.handleChange.bind(this)} /> &nbsp;&nbsp;
                        <button type="button" className="btn btn-primary btn-sm" onClick={this.handleSubmit.bind(this)}>Save</button>&nbsp;&nbsp;
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => { this.setState({ formData: { name: '', mobile: '' } }); }}>Cancel</button>
                    </div><br />
                    <div className="search">
                        <input type="text" className="col-xs-3" name="search" value={this.state.formData["search"]} onChange={this.handleSearchChange.bind(this)} /> &nbsp; &nbsp;
                        <button type="button" className="btn btn-success btn-sm" onClick={this.handleSearch.bind(this)}>Search</button>
                    </div><br />
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
                                                <td width="150px" align="center"><i className="material-icons sym-btn" onClick={this.handleEdit.bind(this, items)}>border_color</i></td>
                                                <td width="150px" align="center"><i className="material-icons sym-btn" onClick={this.handleDelete.bind(this, items._id)}>delete</i></td>
                                            </tr>
                                        </tbody>
                                    )
                                })
                            }
                        </table>
                         {/* <Pagination items={this.state.items} onChangePage={this.onChangePage} /> */}
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