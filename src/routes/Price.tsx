import React from "react";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistroy, fetchCoinTickers } from "../api";

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #fdcb6e;
`;

const Title = styled.div`
  font-size: 16px;
`;

const Time = styled.div`
  color: ${(props) => props.theme.accentColor};
`;

const Value = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Price = () => {
  const { coinId } = useOutletContext<PriceProps>();
  const { isLoading, data } = useQuery<PriceData>(["price", coinId], () =>
    fetchCoinTickers(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading Price"
      ) : (
        <Wrapper>
          <Item>
            <Title>Percent Change</Title>
            <Time>15 Minutes</Time>
            <Value>{data?.quotes.USD.percent_change_15m}</Value>
          </Item>
          <Item>
            <Title>Percent Change</Title>
            <Time>30 Minutes</Time>
            <Value>{data?.quotes.USD.percent_change_30m}</Value>
          </Item>
          <Item>
            <Title>Percent Change</Title>
            <Time>1 Hours</Time>
            <Value>{data?.quotes.USD.percent_change_1h}</Value>
          </Item>
          <Item>
            <Title>Percent Change</Title>
            <Time>6 Hours</Time>
            <Value>{data?.quotes.USD.percent_change_6h}</Value>
          </Item>
          <Item>
            <Title>Percent Change</Title>
            <Time>12 Hours</Time>
            <Value>{data?.quotes.USD.percent_change_12h}</Value>
          </Item>
          <Item>
            <Title>Percent Change</Title>
            <Time>24 Hours</Time>
            <Value>{data?.quotes.USD.percent_change_24h}</Value>
          </Item>
          <Item>
            <Title>Percent Change</Title>
            <Time>7 Days</Time>
            <Value>{data?.quotes.USD.percent_change_7d}</Value>
          </Item>
          <Item>
            <Title>Percent Change</Title>
            <Time>1 Years</Time>
            <Value>{data?.quotes.USD.percent_change_1y}</Value>
          </Item>
        </Wrapper>
      )}
    </div>
  );
};

export default Price;
