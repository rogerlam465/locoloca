import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const EditItem = () => {
  const history = useHistory();

  const [itemLoad, setItemLoad] = useState(null);
  const form = useRef(null);

  React.useEffect(() => {
    if (itemLoad === "saved") {
      history.push("/shop");
    }
  }, [itemLoad])

  const handleSubmit = (event) => {
    event.preventDefault();

    setItemLoad("working")

    const dataHolder = new FormData(form.current);

    const dataObj = {};

    for (let pair of dataHolder.entries()) {
      let holder = pair[0];
      dataObj[holder] = pair[1];
    };

    const data = JSON.stringify(dataObj);

    // todo - this still needs to save the current store

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
        <input type="text" id="itemName" name="itemName" />

        <label htmlFor="itemDesc">Item Description</label>
        <textarea id="itemDesc" name="itemDesk" rows="3" cols="50"></textarea>

        <label htmlFor="itemManufacturer">Item Manufacturer</label>
        <input type="text" id="itemManufacturer" name="itemManufacturer" />

        <h2>Package Size</h2>

        <p>All measurements in centimetres and grams, please.</p>
        <p>Packages may not exceed 40 cm in any dimension, nor exceed 3 kg in weight.</p>

        <label htmlFor="pkgWidth">Width</label>
        <input type="number" id="pkgWidth" name="pkgWidth" />

        <label htmlFor="pkgLength">Length</label>
        <input type="number" id="pkgLength" name="pkgLength" />

        <label htmlFor="pkgHeight">Height</label>
        <input type="number" id="pkgHeight" name="pkgHeight" />

        <label htmlFor="pkgWeight">Weight</label>
        <input type="number" id="pkgWeight" name="pkgWeight" />

        {/* eventually it would be cool to have multiple warehouses for each items. We're not there yet, though. */}

        <label htmlFor="itemStock"># of items in stock</label>
        <input type="number" id="itemStock" name="itemStock" />

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