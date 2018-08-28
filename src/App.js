import React, {Component} from "react";
import { View } from "react-native";
import NavBar from './components/navBar';
import Header from './components/ui/header';

class App extends Component {
  render() {
    return (
      <View>
        <Header headerText="Movie App" />
        <NavBar/>
      </View>
    );
  }
}

export default App;
