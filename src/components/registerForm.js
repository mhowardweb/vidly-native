import React, {Component} from "react";
import {View, Text} from 'react-native';
//import Joi from "react-native-joi";
import * as userService from "../services/userService";
import auth from "../services/authService";
import {Card, CardSection, Input, Button, Spinner} from './ui';

class RegisterForm extends Component {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  // schema = {
  //   username: Joi.string()
  //     .required()
  //     .email({ minDomainAtoms: 2 })
  //     .label("Username"),
  //   password: Joi.string()
  //     .min(5)
  //     .required()
  //     .label("Password"),
  //   name: Joi.string()
  //     .required()
  //     .label("Name")
  // };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
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
    console.log(text);
  }

  onPasswordChange(text) {
    console.log(text);
  }

  onNameChange(text) {
    console.log(text);
  }


  render() {
    return (
      <View>
<Text>Register</Text>
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
    <Input 
      label='Name'
      placeholder='name'
      onChangeText={this.onNameChange.bind(this)}

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

export default RegisterForm;
