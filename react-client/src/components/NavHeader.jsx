import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Menu>
        <Menu.Item
          as={Link}
          to="/"
          name="Home"
        />
        <Menu.Item
          as={Link}
          to={this.props.sessionId ? '/create' : '/PleaseLogIn'}
          name="Add Project"
        />
        <Menu.Item
          as={Link}
          to={this.props.sessionId ? '/ideas' : '/PleaseLogIn'}
          name="Brainstorm"
        />
        {this.props.username ?
          <Menu.Menu position="right">
            <Menu.Item
              as={Link}
              to={`/users/${this.props.username}`}
              name="My Profile"
            />
            <Menu.Item
              href="/logout"
              icon="github"
              name="Logout"
            />
          </Menu.Menu>
          :
          <Menu.Menu position="right">
            <Menu.Item
              href="/auth/github"
              icon="github"
              name="Login"
            />
          </Menu.Menu>
        }
      </Menu>
    );
  }
}

export default NavHeader;
