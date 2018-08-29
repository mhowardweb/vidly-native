import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import auth from "../services/authService";
import { Router, Route, Link, Switch, Redirect } from '../Routing'
import Movies from "./movies";
import MovieForm from "./movieForm";
import NotFound from "./notFound";
import Rentals from "./rentals";
import Logout from "./logout";
import Customers from "./customers";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import ProtectedRoute from "./common/protectedRoute";

class NavBar extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const {menu, menuItem, container} = styles;
    return (

  <Router>
    <View style={container}>
      
        <View style={menu}>
          <Link to="/movies">
            <Text style={menuItem}>Movies</Text>
          </Link>
          <Link to="/customers">
            <Text style={menuItem}>Customers</Text>
          </Link>
          <Link to="/rentals">
            <Text style={menuItem}>Rentals</Text>
          </Link>
          {!user && (
            <View>
              <Link to="/login">
                <Text style={menuItem}>Login</Text>
              </Link>
              <Link to="/register">
                <Text style={menuItem}>Register</Text>
              </Link>
            </View>
          )}
          {user && (
            <View>
              <Link to="/profile">
                <Text style={menuItem}>{user.name}</Text>
              </Link>
              <Link to="/logout">
                <Text style={menuItem}>Logout</Text>
              </Link>
            </View>
          )}
        </View>
         <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        
  
    </View>
  </Router>
)

}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 20,
    padding: 10,
  },
  menu: {
   
    
    
  },
  menuItem: {
    paddingBottom: 20,
    paddingTop: 20,
    justifyContent: 'space-around',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    position: 'relative',
    height: 50,
    margin: 50
  }
})

export default NavBar;