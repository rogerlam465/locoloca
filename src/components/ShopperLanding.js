import React, { useState } from 'react';
import styled from 'styled-components';

import ItemGrid from './buyer/ItemGrid';

// todo - add grid
// todo - capture user location (search bar or by web api or by user profile)
// todo - customize grid according to location
// todo - build validator for postcode input (stretch)

// should we... just try to grab location automatically?
// then display the search bar if nothing shows?

// for some reason, getCurrentPosition doesn't work well on
// the tower. Let's leave it until after we deploy, I guess.
// irksome, but whatcha gonna do.

const ShopperLanding = () => {

  let itemData = [];

  // why are we setting state here? It's not like we're gonna
  // use it... or are we?

  const [postcodeState, setPostcodeState] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPostcodeState("loading");

    let targetPostcode;

    // this doesn't work right now

    const setPostcode = (position) => {
      console.log("what", position);
    }

    if (e.target.location.value.length === 3) {
      console.log("true", e.target.location.value);
      targetPostcode = e.target.location.value;
    } else {
      console.log("false");
      navigator.geolocation.getCurrentPosition(setPostcode);
    }

    // this currently returns target postcodes. This is probably not ideal.
    // this should actually return the products themselves.
    // all the searches should actually happen in the backend.

    await fetch('/api/item/postcode/' + targetPostcode)
      .then(res => res.json())
      .then(json => {
        itemData = json.data;
        console.log("itemData", itemData);
        setPostcodeState("success");
      })
      .catch(err => {
        console.log(err);
        setPostcodeState("error");
      });
  }

  return (
    <Wrapper>
      <h1>Shop Local!</h1>
      <p>The products below are available within a 20km radius of your location; this way, we can ensure 2 day delivery!</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Enter the first half of your postal code to get started, or leave it blank and we'll try to find you automagically!</label>
        <input type="text" maxLength="3" name="location" id="location" placeholder="A1B"></input>
        <button>Go!</button>
      </form>
      {
        postcodeState === "loading" &&
        <h2>Loading...</h2>
      }
      {postcodeState === "success" &&
        <ItemGrid itemData={itemData} />
      }
    </Wrapper>

  );
};

export default ShopperLanding;

const Wrapper = styled.div`
  margin: 30px;
`;