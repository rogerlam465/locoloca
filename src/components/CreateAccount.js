import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const CreateAccount = () => {
  const form = useRef(null);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataHolder = new FormData(form.current);

    let dataObj = {};

    for (let pair of dataHolder.entries()) {
      let holder = pair[0];
      dataObj[holder] = pair[1];
    };

    let res = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(dataObj),
      headers: { 'Content-Type': 'application/json' }
    })
      .catch(error => {
        console.log(error);
      });

    if (res.status === 201) {
      history.push("/login");
    } else {
      console.log(res.message);
    }
  }

  return (
    <Wrapper>
      <h1>Let's create a new account. Just the two of us.</h1>

      <AccountForm id="accountForm" ref={form} onSubmit={handleSubmit}>

        <h2>Personal Deets</h2>

        <label htmlFor="firstName">First Name</label>
        <AccountInput type="text" id="firstName" name="firstName" required />

        <label htmlFor="lastName">Last Name</label>
        <AccountInput type="text" id="lastName" name="lastName" required />

        <label htmlFor="email">Email Address</label>
        <AccountInput type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <AccountInput type="password" id="password" name="password" minlength='8' required />

        <h2>Delivery Address</h2>

        <label htmlFor="addressCivicNum">Civic Number</label>
        <AccountInput type="text" id="addressCivicNum" name="addressCivicNum" required />

        <label htmlFor="addressStreet">Street Name</label>
        <AccountInput type="text" id="addressStreet" name="addressStreet" required />

        <label htmlFor="addressAptNum">Apartment Number (optional)</label>
        <AccountInput type="text" id="addressAptNum" name="addressAptNum" />

        <label htmlFor="addressPostcode">Postal Code</label>
        <AccountInput type="text" id="addressPostcode" name="addressPostcode" required />

        <label htmlFor="addressCity">City</label>
        <AccountInput type="text" id="addressCity" name="addressCity" required />

        <label htmlFor="addressProvince">Province</label>
        <AccountInput type="text" id="addressProvince" name="addressProvince" required />

        <label htmlFor="addressCountry">Country</label>
        <AccountInput type="text" id="addressCountry" name="addressCountry" value="Canada" readOnly />

        <label htmlFor="phoneNum">Phone Number</label>
        <AccountInput type="tel" id="phoneNum" name="phoneNum" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />

        <CreateButton>Let's go!</CreateButton>

      </AccountForm>

    </Wrapper>
  )
};

export default CreateAccount;

const Wrapper = styled.div`
  margin: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const AccountForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const AccountInput = styled.input`
  margin-bottom: 10px;
`;

const CreateButton = styled.button`
  width: 120px;
  height: 40px;
  background: lightgreen;
  border: 1px solid grey;
  border-radius: 5px;
  align-self: flex-end;
`;