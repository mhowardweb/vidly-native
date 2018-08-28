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

    return (

  <Router>
    <View style={styles.container}>
      <View style={{backgroundColor: '#f0f0f0'}}>
        <View>
          <Link to="/movies">
            <Text>Movies</Text>
          </Link>
          <Link to="/customers">
            <Text>Customers</Text>
          </Link>
          <Link to="/rentals">
            <Text>Rentals</Text>
          </Link>
          {!user && (
            <View>
              <Link to="/login">
                <Text>Login</Text>
              </Link>
              <Link to="/register">
                <Text>Register</Text>
              </Link>
            </View>
          )}
          {user && (
            <View>
              <Link to="/profile">
                <Text>{user.name}</Text>
              </Link>
              <Link to="/logout">
                <Text>Logout</Text>
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
  
    </View>
  </Router>
)

}
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  header: {
    fontSize: 20,
    marginTop: 20,
  },
  sidebarText: {
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

export default NavBar;