import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends Component {
    
    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUsers() {
        return this.props.users.map(user => 
            <li key={user.id}>{user.name}</li>
        );
    }

    render() {
        return (
            <div>
                Big List of Users
                <ul>
                    {this.renderUsers()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

// Why are we making use of the store?
// we're not using the normal connect function
// to use action creators here. Why?
// Connect fn works in a normal app by communicating
// with the provider tag, which has a reference 
// to the store.
// We are not using the connect tag here because
// connect only works through communication with the
// Provider.
// We need to use redux and collect data before 
// rendering our application at all.
// So, no Provider tag, no props because we have not
// yet rendered our application which means we cannot
// use the connect tag.

// Why are we using the dispatch function here?
// Since we cannot use the connect tag, we are 
// working with redux manually by calling the action 
// creator ourselves so that the dispatch function can 
// pipe that through middleware and then through reducers.

// Why is redux involved in this data fetching process?
// All loadData functions then dispatch actions which 
// then populate the store. The store is then full of data.
// This all happens before the page is rendered and sent
// back tot the client. A series of promises are called,
// which are the loadData functions, then once they complete
// they populate the store before it's sent back to the client.
function loadData(store) {
    return store.dispatch(fetchUsers());
}

export { loadData };

export default connect(mapStateToProps, { fetchUsers })(UsersList);
