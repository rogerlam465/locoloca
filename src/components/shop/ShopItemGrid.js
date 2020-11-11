import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SellerItem from './SellerItem';

// this component should show the list of inventory items
// ideally this would be presented as a list
// clicking on each product would open up the item view
// which would have the edit view by default

// search would be cool too, but I don't know if I care about
// that right now

const ShopItemGrid = () => {
  const userShop = useSelector((state) => state.user.userData.shop);
  const [getItemsState, setGetItemsState] = useState("idle");
  const [itemState, setItemState] = useState([]);

  let itemData = [];

  // I don't quite understand what's happening. setGetItemsState just doesn't work.
  // we still receive the data in itemData. Just that the setter doesn't do the thing.

  const fetchData = async (shopId) => {
    await fetch('/api/item/all/' + shopId)
      .then(res => res.json())
      .then(json => {
        setItemState(json.data);
      })
      .catch(err => {
        console.log(err);
        setItemState("error");
      });
  };

  useEffect(() => {
    setGetItemsState("loading");
    fetchData(userShop);
  }, [])

  useEffect(() => {
    if (itemState.length > 0) {
      setGetItemsState("success");
    };
  }, [itemState]);

  return (
    <Wrapper>
      <h1>these are the items you're selling.</h1>
      <Link to="/item/edit">
        <button>Add an item</button>
      </Link>

      {(getItemsState === "loading") &&
        <h2>Loading...</h2>
      }
      {(getItemsState === "success") &&
        <>
          <table>

            <tr>
              <th>Product Name</th>
              <th># in Stock</th>
              <th>Active Orders</th>
              <th>Sold</th>
            </tr>

            {itemState.map(item => {
              return <SellerItem data={item} />
            })}

          </table>
        </>
      }

    </Wrapper>
  )
};

export default ShopItemGrid;

const Wrapper = styled.div`
  margin: 0 30px;
`;