import React from 'react';
// import styled from 'styled-components';

const SellerItem = (props) => {
  let itemData = props.data;

  console.log(itemData);

  return (
    <tr>
      <td>{itemData.itemName}</td>
      <td>{itemData.itemStock}</td>
      <td>ordersPlaceholder</td>
      <td>soldPlaceholder</td>
    </tr>
  )
};

export default SellerItem;