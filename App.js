import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskList from './components/TaskList';

export default class App extends React.Component {
  render() {
    return (
      <TaskList />
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
