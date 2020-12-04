import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import ItemGrid from './buyer/ItemGrid';

// done - add grid
// done - capture user location (search bar)
// done - capture user location (web api)
// done - capture user location (user profile)
// done - customize grid according to location
// todo - search bar
// todo - build validator for postcode input (stretch)

const ShopperLanding = () => {

  const [itemGrabState, setItemGrabState] = useState("idle");
  const [itemHolderState, setItemHolderState] = useState([]);

  // this is incredibly roundabout. Is there a better way to do this?
  // The problem with the previous solution is that it would
  // try to render the component using an itemData variable
  // without having received the item data

  // so we're using useEffect to force a re-render after validating
  // that we actually have data

  const userData = useSelector((state) => state.user.userData);

  // fetchData assumes we have a postcode FSA available
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

  // fetchPostcode works on the basis that there is no FSA
  const fetchPostcode = async (latlong) => {
    await fetch('/api/postcode/' + latlong[0] + "/" + latlong[1])
      .then(res => res.json())
      .then(json => {
        fetchData(json.data);
      })
      .catch(err => {
        console.log(err);
        setItemGrabState("error");
      });
  }

  useEffect(() => {
    if (userData) {
      setItemGrabState("loading");
      let postcode = userData.addressPostcode.slice(0, 3);
      fetchData(postcode);
    } else if (!userData) {
      setItemGrabState("loading");
      let navigatorCoords = [];
      navigator.geolocation.getCurrentPosition(position => {
        navigatorCoords.push(position.coords.latitude);
        navigatorCoords.push(position.coords.longitude);
        fetchPostcode(navigatorCoords);
      })
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

    if (e.target.location.value.length === 3) {
      console.log("true", e.target.location.value);
      fetchData(e.target.location.value);
    } else {
      console.log("input wrong.");
    }

  }

  return (
    <Wrapper>
      <h1>Shop Local!</h1>
      <p>The products below are available within a 20km radius of your location; this way, we can ensure 2 day delivery!</p>
      <PostcodeForm onSubmit={handleSubmit}>
        <label htmlFor="location">Enter the first half of your postal code to get started, or allow location access and we'll try to find you automagically!</label>
        <PostcodeInput type="text" maxLength="3" name="location" id="location" placeholder="A1B"></PostcodeInput>
        <PostcodeButton>Go!</PostcodeButton>
      </PostcodeForm>
      <h2>What are you looking for?</h2>
      <ProductSearchFrom>
        <ProductSearchInput type="text" size="90" placeholder="Enter a product"></ProductSearchInput>
        <ProductSearchButton>Whatcha got?</ProductSearchButton>
      </ProductSearchFrom>
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

const PostcodeForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const PostcodeInput = styled.input`
  width: 100px;
  margin: 10px 0;
`;

const PostcodeButton = styled.button`
  width: 150px;
`;

const ProductSearchFrom = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductSearchInput = styled.input`
  margin: 5px;
`;

const ProductSearchButton = styled.button`
  padding: 3px;
`;