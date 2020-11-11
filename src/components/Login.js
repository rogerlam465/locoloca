import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  requestUserData,
  receiveUserData,
  receiveUserDataError,
} from '../actions';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLoadState = useSelector((state) => state.user.status);

  // this feels like it's going to cause a race condition
  // with the fetch. sigh.

  useEffect(() => {
    if (userLoadState === 'complete') {
      history.push("/");
    }
  }, [userLoadState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(requestUserData());
    // setUserLoadState('pending');

    await fetch('/api/user/')
      .then(res => {
        return res.json();
      })
      .then(json => {
        dispatch(receiveUserData(json["data"][0]));
        // setUserLoadState('loaded');
        // return json["data"][0];
      })
      .catch(error => {
        dispatch(receiveUserDataError());
        // setUserLoadState('error');
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <h1>Hi there! Please log in here.</h1>
      <LoginForm onSubmit={handleSubmit}>
        <FormSpacer>
          <FormLabel htmlFor="emailAddress">Email Address</FormLabel>
          <input type="email" name="emailAddress"></input>
        </FormSpacer>

        <FormSpacer>
          <FormLabel htmlFor="password">Password</FormLabel>
          <input type="password" name="password"></input>
        </FormSpacer>

        <FormSpacer>
          <SubmitButton>Submit!</SubmitButton>
        </FormSpacer>
      </LoginForm>
    </Wrapper>
  )
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  margin: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
`;

const FormLabel = styled.label`
  margin-right: 20px;
`;

const FormSpacer = styled.div`
  display: flex;
  margin: 10px;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  margin: 0 auto;
  margin-top: 10px;
  padding: 5px;
`;