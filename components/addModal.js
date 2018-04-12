import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Platform, TouchableHighlight, Alert, Dimensions, TextInput } from 'react-native';
//import TaskList from './components/TaskList';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import taskListData from '../data/taskListData';
import DatePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

var screen = Dimensions.get('window');

export default class addModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
      newTaskDescription: '',
      newDate: '',
      completedTask: '',
      isDatePickerVisible: false,
      isTaskComplete: false
    }
  }
  showAddModal = () => {
    this.refs.myModal.open();
  }
  generateKey = (numberOfCharacters) => {
    return require('random-string')({ length: numberOfCharacters });
  }

  handleDatePicked = date => {
    this.setState({
      date,
      newDate: moment(date).format('MMM Do YY')
    });

    //alert(moment(date).format ('dddd'))
    this.handleDateCancel();
  }

  handleDateCancel = () => this.setState({ isDatePickerVisible: false })

  handleDatePickerOpen = () => this.setState({ isDatePickerVisible: true })

  checkTitle() {
    const { date } = this.state;

    if (date > moment()) {
      return moment(date).format('MMM Do YY');
    }
    return 'Pick a date';
  }

  completeTask = () => {
    if (this.state.isTaskComplete) {
      //alert('Task Complete')
      this.setState({
        isTaskComplete: false,
        completedTask: 'Not Complete :('
      })
    }
    else{
      //alert('Task not complete')
      this.setState({
        isTaskComplete: true,
        completedTask: 'Complete! ✔'
      })
    }
  }

  completeText = () =>{
    if (this.state.isTaskComplete) {
      return 'Press to uncomplete'
      
    }
      return 'Press to complete'

  
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

        <Text style={styles.modalHeader}>Add Task</Text>

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
        <Button
          style={{ fontSize: 18, color: 'white', marginBottom: 5 }}
          containerStyle={{
            padding: 8,
            marginLeft: 70,
            marginRight: 70,
            height: 40,
            borderRadius: 6,
            backgroundColor: 'mediumseagreen'
          }}
          onPress={() => {
            if (this.state.newTask.length == 0 || this.state.newTaskDescription.length == 0) {
              alert("Enter a task name and description")
              return;
            }
            const newKey = this.generateKey(24);
            const newTaskItem = {
              key: newKey,
              task: this.state.newTask,
              description: this.state.newTaskDescription,
              date: this.state.newDate,
              complete: this.state.completedTask
            };
            taskListData.push(newTaskItem);
            this.props.parentFlatList.refreshFlatList(newKey);
            this.refs.myModal.close();
          }}>
          Save
        </Button>
        <View style={{ height: 5 }} />
        <Button
          style={{ fontSize: 18, color: 'white' }}
          containerStyle={{
            padding: 8,
            marginLeft: 70,
            marginRight: 70,
            height: 40,
            borderRadius: 6,
            backgroundColor: 'mediumseagreen'
          }}
          onPress={this.completeTask.bind(this)}>
          {this.completeText()}
        </Button>
        <View style={{ height: 5 }} />
        <Button
          style={{ fontSize: 18, color: 'white' }}
          containerStyle={{
            padding: 8,
            marginLeft: 70,
            marginRight: 70,
            height: 40,
            borderRadius: 6,
            backgroundColor: 'mediumseagreen'
          }}
          onPress={this.handleDatePickerOpen}>
          {this.checkTitle()}
        </Button>
        <DatePicker
          isVisible={this.state.isDatePickerVisible}
          //date={this.state.date}
          onConfirm={this.handleDatePicked}
          onCancel={this.handleDateCancel}
          showIcon={false}
          mode="date"
          placeholder={this.state.date}
          format="MMM Do YY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => { this.setState({ date: date }) }}
        />

      </Modal>

    );
  }
}
const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    borderRadius: Platform.Os === 'ios' ? 30 : 0,
    shadowRadius: 10,
    width: screen.width - 80,
    height: 400,
  },
  modalInput: {
    height: 40,
    borderBottomColor: 'grey',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 0
  },
  modalInputBottom: {
    height: 40,
    borderBottomColor: 'grey',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 70,
    borderBottomWidth: 0
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 70,
  }
});