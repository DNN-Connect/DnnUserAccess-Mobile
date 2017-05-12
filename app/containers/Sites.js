import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import {
  Alert,
  Text,
  View,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

class Sites extends Component {
  constructor(props) {
    super(props);
  }

  viewSite(site) {
    this.props.changeSite(this.props, site);
    this.props.navigation.navigate('Users', { Site: site });
  };

  deleteSite(site) {
    Alert.alert('Delete Site', 'Do you want to delete this site?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => this.props.deleteSite(site)}
    ]);
  }

  addSite() {
    this.props.navigation.navigate('AddSite');
  }

  render() {

    // console.log(this.props);

    var siteList = this.props.sites.list.map((site) => (
            <ListItem
              key={site.PortalName}
              title={site.PortalName}
              subtitle={site.Host}
              leftIcon={{name: 'http'}}
              onPress={() => this.viewSite(site)}
              onLongPress={() => this.deleteSite(site)}
            />
          ));

    return (
      <ScrollView>
        <List>
          { siteList }
          <ListItem
            key='add'
            title='ADD'
            subtitle='Add a new site'
            leftIcon={{name: 'plus-one'}}
            onPress={() => this.addSite()}
          />
        </List>
      </ScrollView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  // console.log(state);
  return {
      sites: state.sites
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sites);
