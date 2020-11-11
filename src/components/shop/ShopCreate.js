import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ShopCreate = () => {

  // todo - automatic re-direct after creating store

  const [shopLoad, setShopLoad] = useState(null);
  const [userLoad, setUserLoad] = useState(null);
  const form = useRef(null);

  const userId = useSelector((state) => state.user.userData._id);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setShopLoad("working");

    const dataHolder = new FormData(form.current);

    const dataObj = {
      "admin": userId,
    };

    for (let pair of dataHolder.entries()) {
      let holder = pair[0];
      dataObj[holder] = pair[1];
    };

    const data = JSON.stringify(dataObj);

    // done - this also needs to update the user to add the shop ID
    // todo - add phone number validator
    // todo - add postal code validator

    await fetch('/api/shop', {
      method: 'POST',
      body: data,
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        setShopLoad("saved");
        return res.json();
      })
      .then(async (json) => {
        let shopId = json.data;
        console.log("shop Id", shopId);

        setUserLoad("working");

        await fetch('/api/user', {
          method: 'PATCH',
          body: JSON.stringify({
            "id": userId,
            "shop": shopId,
          }),
          headers: { 'Content-Type': 'application/json' }
        })
          .then(() => {
            setUserLoad("saved");
          })
          .catch(error => {
            console.log(error);
            setUserLoad("error");
          });
      })
      .catch(error => {
        console.log(error);
        setShopLoad("error");
      });



    console.log(shopLoad);
  }

  return (
    <Wrapper>
      <FormWrapper>
        <h1>Let's get you started.</h1>

        <p>Welcome to the seller segment of LocoLoca. Anyone can set up inventory and benefit from LocoLoca's sales and shipping!</p>

        <p>All we need is a pickup address. We need this address because our drivers will pick up packages from you!</p>

        <StoreForm id="itemForm" ref={form} onSubmit={handleSubmit}>

          <label for="civicNum">Civic Number</label>
          <FormInput type="text" id="civicNum" name="civicNum" required />

          <label for="streetName">Street Name</label>
          <FormInput type="text" name="streetName" id="streetName" required />

          <label for="unitNum">Apt/Unit Number</label>
          <FormInput type="text" name="unitNum" id="unitNum" required />

          <label for="city">City</label>
          <FormInput type="text" name="city" id="city" required />

          <label for="country">Country</label>
          <FormInput type="text" name="country" id="country" value="Canada" readOnly />

          <label for="postCode">Postal Code</label>
          <FormInput type="text" name="postCode" id="postCode" required />

          <label for="phoneNum">Phone Number</label>
          <FormInput type="tel" name="phoneNum" id="phoneNum" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />

          <label for="specialInstructions">Special Pickup Instructions</label>
          <textarea id="phoneNum"></textarea>

          <p>And that's it!</p>

          <SubmitButton>Let's go!</SubmitButton>

        </StoreForm>

      </FormWrapper>
    </Wrapper >
  );
};

export default ShopCreate;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormWrapper = styled.div`
  width: 600px;
  margin-bottom: 100px;
`;

const StoreForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  margin: 5px 0 10px 0;
`;

const SubmitButton = styled.button`
  width: 100px;
`;