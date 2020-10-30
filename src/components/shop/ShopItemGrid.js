import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// this component should show the list of inventory items
// ideally this would be presented as a list
// clicking on each product would open up the item view
// which would have the edit view by default

// search would be cool too, but I don't know if I care about that

const ShopItemGrid = () => {
  return (
    <Wrapper>
      <h1>this is where the shop items go.</h1>
      <Link to="/item/edit">
        <button>Add an item</button>
      </Link>

      <table>
        <tr>
          <th>Product Name</th>
          <th># in Stock</th>
          <th># of Orders</th>
        </tr>
      </table>

    </Wrapper>
  )
};

export default ShopItemGrid;

const Wrapper = styled.div`
  margin: 0 30px;
`;