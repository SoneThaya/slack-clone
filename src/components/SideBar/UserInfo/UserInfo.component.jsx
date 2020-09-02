import React from 'react';
import { Grid, Header, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

import './UserInfo.css'

const UserInfo = (props) => {
  if (props.user) {

    return (
      <Grid>
        <Grid.Column>
          <Grid.Row>
            <Header>
              <Icon name="slack" />
              <Header.Content>Slack</Header.Content>
            </Header>
            <Header>
              <span>
                <Image src={props.user.photoUrl} avatar></Image>
                {props.user.displayName}
              </span>
            </Header>
          </Grid.Row>
        </Grid.Column>
      
      </Grid>
    )

  }
  return null
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser
  }
}

export default connect(mapStateToProps)(UserInfo);
