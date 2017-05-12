import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Text, View, ScrollView, FlatList, TextInput, StyleSheet, TouchableHighlight, ActivityIndicator} from 'react-native';
import {List, ListItem, Icon} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

class Users extends Component {
  
  static navigationOptions = ({navigation, screenProps}) => ({ 
   title: navigation.state.params.Site.PortalName + ' Users',
  });

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      currentPage: 0,
      typing: 0
    }
  }

  pageSize = 20;

  componentDidMount() {
    this.setState({
      searchText: "",
      currentPage: 0,
      typing: 0
    }, () => {
      this.props.loadUsers(this.props, this.props.navigation.state.params.Site, "", "DisplayName", "asc", 0, this.pageSize);
    });
  }

  viewUser(user) {
    this.props.navigation.navigate('Details', {
        Site: this.props.navigation.state.params.Site,
        User: user,
      });
  };

  changeSearch(text) {
    this.setState({
      searchText: text,
      typing: this.state.typing + 1
    }, () => {
      setTimeout(() => this.checkChangeSearch(), 300);
    });
  }

  checkChangeSearch() {
    this.setState({
      typing: this.state.typing - 1
    }, () => {
      if (this.state.typing == 0) {
        this.refresh();
      }
    });
  }

  refresh() {
    this.setState({
      currentPage: 0
    }, () => {
      this.props.loadUsers(this.props, this.props.navigation.state.params.Site, this.state.searchText, "DisplayName", "asc", 0, this.pageSize);
    });
  }

  onEndReached() {
    if (this.props.users.list.length < this.props.users.total) {
      var newPage = this.state.currentPage + 1;
      this.setState({
        currentPage: newPage
      }, () => {
        this.props.loadUsers(this.props, this.props.navigation.state.params.Site, "", "DisplayName", "asc", this.state.currentPage, this.pageSize);      
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.sites.active.mustLogin) {
      this.props.navigation.navigate("Login", { Site: this.props.sites.active });
    }
  }

  render() {
    // console.log(this.props);
    var act = [];
    if (this.props.users.loading) {
      act.push(<ActivityIndicator key="act" />);
    }
    if (this.props.users.loadingFirstPage && !this.props.sites.active.mustLogin) {
      act.push(<Spinner cancelable={true} key="spin" />);
    }
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput onChangeText={(text) => this.changeSearch(text)}
            value={this.state.searchText} style={styles.searchBox}
            autoCorrect={false}
          />
        </View>
        {act}
        <View style={styles.listContainer}>
          <List>
            <FlatList data={this.props.users.list}
            keyExtractor={(item, index) => item.UserId}
            refreshing={this.props.users.loading}
            initialListSize={ 20 }
            onEndReachedThreshold={10}
            onEndReached={() => this.onEndReached()}
            renderItem={({item}) => (<ListItem
              title={item.DisplayName}
              subtitle={item.Email}
              leftIcon={{name: 'person'}}
              onPress={() => this.viewUser(item)}/>)} />
          </List>
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
      users: state.users,
      sites: state.sites,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  searchContainer: {
    backgroundColor: '#eee',
    height: 44,
    alignItems: 'flex-end',
    padding: 6,
  },
  listContainer: {
  },
  searchBox: {
    backgroundColor: '#fff',
    height: 40,
    alignSelf: 'stretch',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})
