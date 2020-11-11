import React from 'react';
import styled from 'styled-components';

const Item = (props) => {
  const data = props.itemData;

  let heading;

  data.itemName.length >= 60 ?
    heading = data.itemName.slice(0, 59) + "..."
    : heading = data.itemName;

  let newPrice = parseFloat(data.price).toFixed(2);

  const handleClick = () => {
    // need a dispatch to add and remove items from the cart, I guess

  };

  return (
    <Wrapper>

      <ItemData>
        <ProductHeading>{heading}</ProductHeading>
        <CenterImg>
          <ProductImg src={process.env.PUBLIC_URL + '/placeholder.jpeg'} />
        </CenterImg>
        <p>{data.itemDesc}</p>
      </ItemData>
      <ItemPriceWrapper>
        <ItemPrice>
          <span>${newPrice}</span>
          <span>In stock: {data.numInStock}</span>
        </ItemPrice>
        <ButtonWrapper>
          {data.numInStock > 0 &&
            <AddToCart>Add to cart</AddToCart>
          }
          {data.numInStock === 0 &&
            <SoldOut disabled>Add to cart</SoldOut>
          }
        </ButtonWrapper>
      </ItemPriceWrapper>


    </Wrapper >
  );

};

export default Item;

const Wrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0 20px 20px 0;
  justify-content: space-between;
  padding: 10px;
`;

const ProductHeading = styled.h2`
  height: 90px;
`;

const CenterImg = styled.div`
  display: flex;
  justify-content: center;
  align-items; center;
`;

const ProductImg = styled.img`
  width: 150px;
  border-radius: 10px;
`;

const ItemData = styled.div`

`;

const ItemPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const AddToCart = styled.button`
  background: #009914;
  color: white;
  width: 100px;
  border: 2px white solid;
  border-radius: 5px;
  height: 30px;
`;

const SoldOut = styled(AddToCart)`
  background: #a3b5a5;
`;