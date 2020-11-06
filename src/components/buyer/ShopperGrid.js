import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// this component should show the list of inventory items
// ideally this would be presented as a list
// clicking on each product would open up the item view
// which would have the edit view by default

// search would be cool too, but I don't know if I care about
// that right now


const ShopItemGrid = () => {
  const userShop = useSelector((state) => state.user.userData.shop);
  const [getItemsState, setGetItemsState] = useState("idle");

  let itemData = [];

  // philosophically, it doesn't make sense to store the list of items
  // within state. It's not a state. It's an arbitrarily sized chunk of data.
  // So I guess what we want is to just store it. But we also want a loading
  // indicator.

  useEffect(() => {
    setGetItemsState("loading");

    async function fetchData() {
      let r = await fetch("/api/item/all/" + userShop)
        .then(res => res.json())
        .then(json => {

          itemData = json.data;
          setGetItemsState("done");
          console.log(getItemsState);
        })
        .catch(err => {
          setGetItemsState("error");
          console.log(err);
        });
      return r;
    };

    fetchData();

  }, [])


  return (
    <Wrapper>
      <h1>these are the items you're selling.</h1>
      <Link to="/item/edit">
        <button>Add an item</button>
      </Link>

      {(getItemsState === "loading") &&
        <h2>Loading...</h2>
      }
      {(getItemsState === "done") &&
        <table>
          <thead>
            <td>Product Name</td>
            <td># in Stock</td>
            <td>Active Orders</td>
            <td>Sold</td>
          </thead>
          <tbody>
            <tr>
              <td>something</td>
              <td>something</td>
              <td>something</td>
              <td>something</td>
            </tr>
          </tbody>
        </table>
      }

    </Wrapper>
  )
};

export default ShopItemGrid;

const Wrapper = styled.div`
  margin: 0 30px;
`;