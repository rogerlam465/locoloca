import React from 'react';
import styled from 'styled-components';

// this should be the easiest UI to build
// just shows all items that can be delivered to your address
// no maps, just a list of items

// this turns out to be pretty complicated. There doesn't
// seem to be an API for geocoding within a radius.

// HAHA LIES THERE'S ONE

// todo - add grid
// todo - capture user location (search bar or by web api)
// todo - customize grid according to location
// todo - build validator for postcode input (stretch)

const ShopperLanding = () => {

  let postcodes = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let targetPostcode = e.target.location.value;

    let r = await fetch('/api/postcode/' + targetPostcode)
      .then(res => res.json())
      .then(json => {
        postcodes = json;
        // modify state for loading
      })
      .catch(err => console.log(err));
  }

  return (
    <Wrapper>
      <h1>Shop Local!</h1>
      <p>Delivery in two days!</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Enter the first half of your postal code to get started:</label>
        <input type="text" maxLength="3" name="location" id="location" placeholder="A1B"></input>
        <button>Go!</button>
      </form>
    </Wrapper>
  );
};

export default ShopperLanding;

const Wrapper = styled.div`
  margin: 30px;
`;