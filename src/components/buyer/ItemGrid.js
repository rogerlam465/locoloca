import React from 'react';
import styled from 'styled-components';

import Item from './Item';

// this component should show a grid of things to buy. ideally, like. 50 of them.

const ItemGrid = (props) => {

  let itemData = props.itemData.slice(0, 24);

  return (
    <Wrapper>

      {itemData.map(item => {
        return <Item itemData={item} />
      })}

    </Wrapper>
  )
};

export default ItemGrid;

const Wrapper = styled.div`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
`;