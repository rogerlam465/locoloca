import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const EditItem = () => {
  const history = useHistory();
  const userShop = useSelector((state) => state.user.userData.shop);

  const [itemLoad, setItemLoad] = useState(null);
  const form = useRef(null);

  useEffect(() => {
    if (itemLoad === "saved") {
      history.push("/shop");
    }
  }, [itemLoad])

  const handleSubmit = (event) => {
    event.preventDefault();

    setItemLoad("working")

    const dataHolder = new FormData(form.current);

    const dataObj = {
      "shop": userShop,
    };

    for (let pair of dataHolder.entries()) {
      let holder = pair[0];
      dataObj[holder] = pair[1];
    };

    const data = JSON.stringify(dataObj);

    // todo - some way to save images

    fetch('/api/item', {
      method: 'POST',
      body: data,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        setItemLoad("saved");
      })
      .catch(error => {
        console.log(error);
        setItemLoad("error");
      });

    console.log(itemLoad);
  }

  return (
    <Wrapper>

      <ItemForm id="itemForm" ref={form} onSubmit={handleSubmit}>
        <h1>Create a New Item for Sale</h1>
        <p>This is it. This is the one.</p>

        <h2>Item Info</h2>

        <label htmlFor="itemName">Item Name</label>
        <ItemInput type="text" id="itemName" name="itemName" required />

        <label htmlFor="itemDesc">Item Description</label>
        <ItemTextarea id="itemDesc" name="itemDesc" rows="3" cols="50" required ></ItemTextarea>

        <label htmlFor="itemManufacturer">Item Manufacturer</label>
        <ItemInput type="text" id="itemManufacturer" name="itemManufacturer" required />

        <label htmlFor="numInStock"># of items in stock</label>
        <ItemInput type="number" id="numInStock" name="numInStock" required />

        <label htmlFor="itemPrice">Item Price</label>
        <ItemInput type="number" id="itemPrice" name="itemPrice" required />

        <h2>Package Size</h2>

        <p>Your items can be up to the size of a shoebox (35 x 25 x 15 cm), and can weigh no more than 3 kg. Does this item fit the parameters? Note that our drivers can refuse to take your item, and you <em>will</em> be charged for pickup.</p>

        <div>
          <ItemInput type="checkbox" id="pkgSizeCertify" name="pkgSizeCertify" required />
          <label for="pkgSizeCertify">Do you certify that your item, including the packaging, meets delivery guidelines?</label>
        </div>

        <button>Submit</button>

      </ItemForm>
    </Wrapper >
  );
};

export default EditItem;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 30px;
`;

const ItemForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const ItemInput = styled.input`
  margin-bottom: 10px;
`;

const ItemTextarea = styled.textarea`
  margin-bottom: 10px;
`;