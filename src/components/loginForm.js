import React, {Component} from "react";
import {View, Text} from 'react-native';

import { Redirect } from "../Routing";
//import Joi from "react-native-joi";
import {Card, CardSection, Input, Button, Spinner} from './ui';
import auth from "../services/authService";

class LoginForm extends Component {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };

  // schema = {
  //   username: Joi.string()
  //     .required()
  //     .label("Username"),
  //   password: Joi.string()
  //     .required()
  //     .label("Password")
  // };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.doSubmit.bind(this)}>
        Login
      </Button>
    );
  }

  onUsernameChange(text) {
    this.setState({ username: text });
  }

  onPasswordChange(text) {
    this.setState({ password: text });
  }

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <View>
        <Text>Login</Text>
        <Card>
          <CardSection>
            <Input
              label='Username'
              placeholder='email@gmail.com'
              onChangeText={this.onUsernameChange.bind(this)}
            />
          </CardSection>

          <CardSection>
            <Input 
              label='Password'
              placeholder='password'
              secureTextEntry= {true}
              onChangeText={this.onPasswordChange.bind(this)}

            />
          </CardSection>

          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default LoginForm;
