import React, { Component } from "react";
import {View, Text} from 'react-native';
import _ from "lodash";
import { colors } from '../ui/config';

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <View style={styles.container}>
        {data.map(item => (
          <View style={styles.content} key={item._id}>
            {columns.map(column => (
              <Text style={styles.tableHeaderText} key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </Text>
            ))}
          </View>
        ))}
      </View>
    );
  }
}

const styles = {
  tableHeaderText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 5,
    backgroundColor: '#fff',
  },
  content: {
    
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  }
}

export default TableBody;
