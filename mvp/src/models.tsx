import { BigNumber } from "ethers";

export type Instrument = {
  symbol: string;
  instrumentAddress: string;
  strikePrice: number;
  balancerPool: string;
  instrumentSpotPrice: BigNumber;
  swapFee: BigNumber;
  targetSpotPrice: number;
  expiryTimestamp: number;
  dTokenAddress: string;
  paymentCurrencyAddress: string;
};

export type OldProduct = {
  name: string;
  targetCurrency: string;
  paymentCurrency: string;
  expiryTimestamp: number;
  instruments: Instrument[];
};

export type BasicStraddle = {
  address: string;
  symbol: string;
  expiryTimestamp: number;
};

export type Straddle = BasicStraddle & {
  underlying: string;
};

export const PUT_OPTION_TYPE = 1;
export const CALL_OPTION_TYPE = 2;

export type StraddleTrade = {
  venues: string[];
  amounts: BigNumber[];
  totalPremium: BigNumber;
  callPremium: BigNumber;
  callStrikePrice: BigNumber;
  putPremium: BigNumber;
  putStrikePrice: BigNumber;
  buyData: string[];
  gasPrice: BigNumber;
  strikePrices: BigNumber[];
  optionTypes: number[];
};

export type Product = {
  name: string;
  emoji: string;
  instruments: Straddle[];
};

export type TradeResponse = {
  venues: string[];
  optionTypes: number[];
  amounts: string[];
  strikePrices: string[];
  buyData: string[];
  gasPrice: string;
  totalPremium: string;
  premiums: string[];
};
