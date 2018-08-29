import React, { Component } from "react";
import {View, Text} from 'react-native';
import { colors } from '../ui/config';

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  render() {
    const { container, tableHeaderText} = styles;
    return (
         <View style={container}>
          {this.props.columns.map(column => (
            <Text
              style={tableHeaderText}
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </Text>
          ))}
        </View>
      
    );
  }
}

const styles = {
  tableHeaderText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 5,
    backgroundColor: colors.secondary,
  }
}

export default TableHeader;
