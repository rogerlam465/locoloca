import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import DeliveryItem from './courier/DeliveryItem';
import AssignedItem from './courier/AssignedItem';

// show all pending deliveries nearby
// map and list view? - should remember preference
// search by destination

const CourierLanding = () => {

  let [deliveryDataStatus, setDeliveryDataStatus] = useState("idle");
  let [userDeliveries, setUserDeliveries] = useState([]);
  let [availableDeliveries, setAvailableDeliveries] = useState([]);

  const userId = useSelector((state) => state.user.userData._id);

  useEffect(() => {

    setDeliveryDataStatus("loading");

    try {
      fetch('/api/order/courier/' + userId)
        .then(res => res.json())
        .then(json => {
          let availableHolder = [];
          let userDeliveryHolder = [];
          json.assigned.map(item => {
            if (item.status === "active" && item.courierId === "N/A") {
              availableHolder.push(item);
            }
            if (item.courierId === userId) {
              userDeliveryHolder.push(item);
            }
          })
          setUserDeliveries(userDeliveryHolder);
          setAvailableDeliveries(availableHolder);
          setDeliveryDataStatus("complete");
        })
        .catch(err => console.log(err));

    } catch (err) {
      console.log(err);
    }
  }, []);


  return (
    <Wrapper>
      {deliveryDataStatus === "idle" &&
        <h2>Loading...</h2>
      }

      {deliveryDataStatus === "complete" &&
        <>
          <h2>My Deliveries</h2>
          <table>
            <thead>
              <tr>
                <th>Departure Address</th>
                <th>Destination Address</th>
                <th># of items</th>
                <th>Delivery Date</th>
                <th>Bounty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userDeliveries.map(item => {
                return <AssignedItem data={item} />
              })}
            </tbody>
          </table>
          <h2>Available Deliveries</h2>

          <table>
            <thead>
              <tr>
                <th>Departure Postcode</th>
                <th>Destination Postcode</th>
                <th># of items</th>
                <th>Delivery Date</th>
                <th>Bounty</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {availableDeliveries.map(item => {
                return <DeliveryItem data={item} />
              })}
            </tbody>
          </table>
        </>
      }
    </Wrapper >
  );
};

export default CourierLanding;

const Wrapper = styled.div`
  margin: 30px;
`;