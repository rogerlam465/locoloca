import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  requestUserData,
  receiveUserData,
  receiveUserDataError,
  requestCartData,
  receiveCartData,
  receiveCartDataError
} from '../actions';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const form = useRef(null);

  const userLoadState = useSelector((state) => state.user.status);

  useEffect(() => {
    if (userLoadState === 'complete') {
      history.push("/");
    }
  }, [userLoadState]);

  const createAccount = () => {
    history.push("/createaccount");
  }

  const fetchData = async (userId) => {
    dispatch(requestUserData());
    dispatch(requestCartData());

    await fetch('/api/user/' + userId)
      .then(res => {
        return res.json();
      })
      .then(json => {
        let id = json["data"]["_id"];
        dispatch(receiveUserData(json["data"]));
        fetch('/api/cart/' + id)
          .then(res => {
            return res.json();
          })
          .then(json => {
            dispatch(receiveCartData(json["data"]));
          })
          .catch(error => {
            dispatch(receiveCartDataError());
            console.log(error);
          });
      })
      .catch(error => {
        dispatch(receiveUserDataError());
        console.log(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataHolder = new FormData(form.current);

    let dataObj = {};

    for (let pair of dataHolder.entries()) {
      let holder = pair[0];
      dataObj[holder] = pair[1];
    };

    let r = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify(dataObj),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => {
        // put fetchData in here somewhere
        if (json.auth === true) {
          fetchData(json.userId);
        }
      })
      .catch(error => {
        console.log(error);
      });

  };

  return (
    <Wrapper>
      <h1>Hi there! Please log in here.</h1>
      <LoginForm onSubmit={handleSubmit} ref={form}>
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

      <h2>Don't have an account?</h2>
      <button onClick={createAccount}>Create an account here!</button>
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