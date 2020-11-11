import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import ItemGrid from './buyer/ItemGrid';

// done - add grid
// todo - capture user location (search bar or by web api or by user profile)
// done - customize grid according to location
// todo - build validator for postcode input (stretch)

// should we... just try to grab location automatically?
// then display the search bar if nothing shows?

// for some reason, getCurrentPosition doesn't work well on
// the tower. Let's leave it until after we deploy, I guess.
// irksome, but whatcha gonna do.

const ShopperLanding = () => {

  let itemData = [];

  const [itemGrabState, setItemGrabState] = useState("idle");
  const [itemHolderState, setItemHolderState] = useState([]);

  // this is incredibly stupid. Is there a better way to do this?
  // The problem with the previous solution is that it would
  // try to render the component using an itemData variable
  // without having received the item data

  // so we're using useEffect to force a re-render after validating
  // that we actually have data

  const userData = useSelector((state) => state.user.userData);

  const fetchData = async (postcode) => {
    await fetch('/api/item/postcode/' + postcode)
      .then(res => res.json())
      .then(json => {
        setItemHolderState(json.data);
      })
      .catch(err => {
        console.log(err);
        setItemGrabState("error");
      });
  };

  useEffect(() => {
    if (userData) {
      setItemGrabState("loading");
      let postcode = userData.addressPostcode.slice(0, 3);
      fetchData(postcode);
    }
  }, [userData]);

  useEffect(() => {
    if (itemHolderState.length > 0) {
      setItemGrabState("success");
    };
  }, [itemHolderState]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    setItemGrabState("loading");

    // this doesn't work right now

    const setPostcode = (position) => {
      console.log("what", position);
    }

    if (e.target.location.value.length === 3) {
      console.log("true", e.target.location.value);
      fetchData(e.target.location.value);
    } else {
      console.log("false");
      navigator.geolocation.getCurrentPosition(setPostcode);
    }

    // itemData = await fetch('/api/item/postcode/' + targetPostcode)
    //   .then(res => res.json())
    //   .then(json => {
    //     setItemHolderState(json.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     setItemGrabState("error");
    //   });

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
      {itemGrabState === "loading" &&
        <h2>Loading...</h2>
      }
      {itemGrabState === "success" &&
        <ItemGrid itemData={itemHolderState} />
      }
    </Wrapper>

  );
};

export default ShopperLanding;

const Wrapper = styled.div`
  margin: 30px;
`;