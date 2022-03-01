/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface SAVAXDepositHelperInterface extends ethers.utils.Interface {
  functions: {
    "deposit()": FunctionFragment;
    "sAVAX()": FunctionFragment;
    "sAVAXVault()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(functionFragment: "sAVAX", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "sAVAXVault",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sAVAX", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sAVAXVault", data: BytesLike): Result;

  events: {};
}

export class SAVAXDepositHelper extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: SAVAXDepositHelperInterface;

  functions: {
    deposit(overrides?: PayableOverrides): Promise<ContractTransaction>;

    "deposit()"(overrides?: PayableOverrides): Promise<ContractTransaction>;

    sAVAX(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "sAVAX()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    sAVAXVault(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "sAVAXVault()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;
  };

  deposit(overrides?: PayableOverrides): Promise<ContractTransaction>;

  "deposit()"(overrides?: PayableOverrides): Promise<ContractTransaction>;

  sAVAX(overrides?: CallOverrides): Promise<string>;

  "sAVAX()"(overrides?: CallOverrides): Promise<string>;

  sAVAXVault(overrides?: CallOverrides): Promise<string>;

  "sAVAXVault()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    deposit(overrides?: CallOverrides): Promise<void>;

    "deposit()"(overrides?: CallOverrides): Promise<void>;

    sAVAX(overrides?: CallOverrides): Promise<string>;

    "sAVAX()"(overrides?: CallOverrides): Promise<string>;

    sAVAXVault(overrides?: CallOverrides): Promise<string>;

    "sAVAXVault()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    deposit(overrides?: PayableOverrides): Promise<BigNumber>;

    "deposit()"(overrides?: PayableOverrides): Promise<BigNumber>;

    sAVAX(overrides?: CallOverrides): Promise<BigNumber>;

    "sAVAX()"(overrides?: CallOverrides): Promise<BigNumber>;

    sAVAXVault(overrides?: CallOverrides): Promise<BigNumber>;

    "sAVAXVault()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    deposit(overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    "deposit()"(overrides?: PayableOverrides): Promise<PopulatedTransaction>;

    sAVAX(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "sAVAX()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sAVAXVault(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "sAVAXVault()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
