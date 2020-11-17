import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const DeliveryItem = (props) => {
  const data = props.data;

  const courierId = useSelector((state) => state.user.userData._id);
  const orderId = data._id;
  let [currentStatus, setCurrentStatus] = useState();

  useEffect(() => {
    setCurrentStatus(data.status);
  }, [])

  const delivered = () => {
    fetch('/api/order/courier', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "courierId": courierId,
        "orderId": orderId,
        "status": "delivered"
      })
    });
    setCurrentStatus("delivered");
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let dateData = new Date(data.targetDeliveryDate);
  let deliverDateMonth = months[dateData.getMonth()];
  let deliverDateDay = dateData.getDate();

  let targetDeliveryDate = deliverDateMonth + " " + deliverDateDay + ", 8 PM";

  return (
    <Wrapper>

      <td>
        {data.sellerPostcode}
      </td>
      <td>
        {data.buyerPostcode}
      </td>
      <td>
        {data.numToBuy}
      </td>
      <td>
        {targetDeliveryDate}
      </td>
      <td>
        <span>$3</span>
      </td>
      <td>
        {currentStatus === "assigned" &&
          <button onClick={delivered}>I delivered it!</button>
        }
        {currentStatus === "delivered" &&
          <button disabled>Archived</button>
        }
      </td>

    </Wrapper>
  )
};

export default DeliveryItem;

const Wrapper = styled.tr`
  margin: 10px;
`;