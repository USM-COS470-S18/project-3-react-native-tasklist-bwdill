import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Platform, TouchableHighlight, Alert, Dimensions, TextInput } from 'react-native';
//import TaskList from './components/TaskList';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import taskListData from '../data/taskListData';

var screen = Dimensions.get('window');

export default class selectedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
      newTaskDescription: ''
    }
  }
  showAddModal = () => {
    this.refs.myModal.open();
  }
  generateKey = (numberOfCharacters) => {
    return require('random-string')({length: numberOfCharacters});
  }
  render() {
    return (
      <Modal
        ref={"myModal"}
        style={styles.modalContainer}
        position='center'
        backkdrop={true}
        onClosed={() => {
          //alert("Modal closed");
        }}>

        <Text style={styles.modalHeader}>Selected Task</Text>

        <TextInput style={styles.modalInput}
          onChangeText={(text) => this.setState({ newTask: text })}
          placeholder="Enter new task"
          value={this.state.newTask}>
        </TextInput>

        <TextInput style={styles.modalInputBottom}
          onChangeText={(text) => this.setState({ newTaskDescription: text })}
          placeholder="Enter new task description"
          value={this.state.newTaskDescription}>
        </TextInput>
        
      </Modal>
      
    );
  }
}
const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    borderRadius: Platform.Os === 'ios' ? 30 : 0,
    shadowRadius: 10,
    width: screen.width - 80,
    height: 200
  },
  modalInput: {
    height: 40,
    borderBottomColor: 'grey',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1
  },
  modalInputBottom: {
    height: 40,
    borderBottomColor: 'grey',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    marginBottom:5,
    borderBottomWidth: 1
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});