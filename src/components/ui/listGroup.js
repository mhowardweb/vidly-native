import React from "react";
import {FlatList, Text, View} from 'react-native';

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedItem
}) => (<View style={styles.container}>
  <FlatList {...data=[items].map((items, index) => { return renderItem={({ item }) => (<View style={styles.flatview}> ); }         ) ) }) 
    <Text style={styles.name} key={valueProperty}>
      {textProperty}
      {item}
    </Text>
  </View>)}} />
</View>)

    // textProperty and valueProperty have defaults set, but can be overwritten
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

const styles = ({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18,
    color: '#4dc',
  },
  email: {
    color: 'red'
  }
  
});

export {ListGroup};
