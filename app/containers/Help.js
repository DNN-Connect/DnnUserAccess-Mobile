import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { View, Text, StyleSheet } from 'react-native';

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>DNN User Access App</Text>
        <Text style={styles.intro}>
          This mobile app allows you to manage user access (role membership,
          password management, verification) for your website.
        </Text>
        <Text style={styles.body}>
          This mobile application connects to any DNN Platform website with
          the Dnn User Access personabar extension installed. You can add any
          number of websites (portals) that you manage with this app. You must have
          Administrator access rights on the portal. And the DNN installation must
          have WJT authentication enabled.
        </Text>
        <Text style={styles.body}>
          Add a website by selecting "Add" on the principal screen. The app
          will begin your phone's camera. Point the phone at the QR code that is
          generated on the website in the personabar extension (there is a small
          blue icon button that will pop it up). You will be prompted for your
          password and subsequently verified.
        </Text>
        <Text style={styles.body}>
          Note: you must be connected to the internet for this app to work.
        </Text>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Help);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',    
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  intro: {
    padding: 20,
    fontWeight: 'bold',
  },
  body: {
    padding: 20,
  },
})
