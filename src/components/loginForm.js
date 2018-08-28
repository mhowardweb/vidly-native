import React, {Component} from "react";
import {View, Text} from 'react-native';

import { Redirect } from "../Routing";
import Joi from "react-native-joi";
import {Card, CardSection} from './ui';
import auth from "../services/authService";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

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

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <View>
        <Text>Login</Text>
        <Card>
          <CardSection>
            <Input
              label='Email'
              placeholder='email@gmail.com'
              value={this.state.username}
            />
          </CardSection>
          <CardSection>
            <Input />
          </CardSection>
          <CardSection>

          </CardSection>
        
        {/* <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form> */}
        </Card>
      </View>
    );
  }
}

export default LoginForm;
