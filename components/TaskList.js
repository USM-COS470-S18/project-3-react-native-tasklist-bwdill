import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Platform, TouchableHighlight, TouchableOpacity, Alert, Date} from 'react-native';
import taskListData from '../data/taskListData';
import AddModal from './addModal';
import SelectedModal from './selectedModal';
import Swipeout from 'react-native-swipeout';
import moment from 'moment';
import Button from 'react-native-button';



class TaskListItem extends Component {
  constructor(props) {
    super(props);
    this.selectTask = this.selectTask.bind(this);
    this.state = {

      activeRowKey: null,
      date: moment(),
      
      isComplete: false,
      isCompleteText: this.props.item.complete
    };
  }
  selectTask = () => {
    this.refs.selectedModal.showAddModal();
    //this.TaskList.refs.addModal.showAddModal();
    //alert("Do stuff")
  }

  completeTask = () => {
    if(!this.isComplete){
      //alert('pressed')
      this.setState({isComplete: false})
    }
    else {
       this.setState({isComplete: true})
    }
  }
  completeText = () =>{
    if(this.state.isComplete){
      return 'Complete! ✔'
    }
    else {
    return 'Complete? no'
  }
}

completeButton = () => {
  if (this.state.isCompleteText === "Complete! ✔"){
    this.setState({
      isComplete: false,
    isCompleteText: 'Not Complete :('})
    
  }
  else
  this.setState({
    isComplete: true,
  isCompleteText: 'Complete! ✔'})
}

  render() {
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null) {
          this.setState({ activeRowKey: null });
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowKey: this.props.item.key });
      },
      right: [
        {
          onPress: () => {
            const deleteingRow = this.state.activeRowKey;
            Alert.alert(
              'Are you sure?',
              'Are you sure you want to delete?',
              [

                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                  text: 'Yes', onPress: () => {
                    taskListData.splice(this.props.index, 1);
                    this.props.parentFlatList.refreshFlatList(deleteingRow);
                  }
                },

              ],
              { cancelable: true }
            );


          },
          text: 'Delete', type: 'delete'
        }
      ],
      rowId: this.props.index,
      sectionId: 1
    };
    return (
      <Swipeout {...swipeSettings}>
      
        <View style={{ flex: 1, backgroundColor: 'mediumseagreen', flexDirection: 'column' }}>
        
        <TouchableOpacity
      onPress = {this.selectTask}>

          <Text style={styles.taskListItem}>{this.props.item.task}</Text>
          <Text style={styles.taskListItem}>{this.props.item.description}</Text>
          <Text style={styles.taskListItem}>{this.props.item.date}</Text>
          {/* <Text style={styles.taskListItem}>{this.props.item.complete}</Text> */}
          <Button style = {styles.completeButton}
          onPress = {this.completeButton}
          containerStyle={{
            padding: 0,
            marginLeft: 90,
            marginRight: 90,
            height: 40,
            borderRadius: 6,
          
            backgroundColor: 'tomato'}}>
          {this.state.isCompleteText}
          </Button>
          

          </TouchableOpacity>
          <View style = {{backgroundColor: 'mediumseagreen', height: 10 }} />
        </View>
        
        <View style={{
          height: 1,
          backgroundColor: 'white'
        }}>
        </View>
         <SelectedModal ref={'selectedModal'} parentFlatList={this} style = {{zIndex: 1000}}>
        </SelectedModal>
      </Swipeout>
      
    );
  }
}

export default class TaskList extends React.PureComponent {
  constructor(props) {
    super(props)
   this.addTask = this.addTask.bind(this);
    this.state = ({
      deleteRowKey: null,
    });
  }

  refreshFlatList = (activeKey) => {
    this.setState((prevState) => {
      return {
        deleteRowKey: activeKey
      };
    });
    this.refs.flatlist.scrollToEnd();
  }

  addTask = () => {
    this.refs.addModal.showAddModal();
  };
  selectedTask = () =>{
    alert("efef")
  };

  render() {
    return (

      <View style={styles.container}>

        <View style={styles.headerContainer}>
        <Text style = {styles.headerText}>Task List</Text>
          <TouchableHighlight style={styles.addButton}
            underlayColor='tomato'
            onPress={this.addTask}>
            
            <Text style={styles.addButtonText}>+</Text>

          </TouchableHighlight>

        </View>
        
        <FlatList
          ref={"flatlist"}
          data={taskListData}
          renderItem={({ item, index }) => {
            //console.log('Item = ${item}, index = ${index}');
            return (
              
              <TaskListItem item={item} index={index} parentFlatList={this}>
              </TaskListItem>
              
            );
          }}>

        </FlatList>
        <AddModal ref={'addModal'} parentFlatList={this}>
        </AddModal>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 34 : 0,
    backgroundColor: 'orange'
  },
  taskListItem: {
    color: 'white',
    padding: 5,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5
  },
  addButton: {
    marginRight: 10
  },
  addButtonText: {
    fontSize: 50,
    color: 'white'
  },
  headerContainer: {
    backgroundColor: 'tomato',
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    color: 'white',
    fontSize: 24
  },
  completeButton: {
    color: 'white',
    padding: 5,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    alignItems: 'flex-end'
  }
});
