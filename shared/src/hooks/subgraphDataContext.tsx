import { BigNumber } from "ethers";
import React, { ReactElement } from "react";
import { GovernanceTransaction } from "../models/governance";
import {
  defaultStakingAccountsData,
  defaultStakingSubgraphData,
  StakingPoolAccountsData,
  StakingPoolsSubgraphData,
} from "../models/staking";
import {
  ERC20TokenSubgraphData,
  RBNTokenAccountSubgraphData,
} from "../models/token";

import {
  BalanceUpdate,
  defaultV2VaultPriceHistoriesData,
  defaultVaultAccountsData,
  defaultVaultActivitiesData,
  VaultPriceHistoriesData,
  VaultAccountsData,
  VaultActivitiesData,
  VaultTransaction,
  VaultsSubgraphData,
  defaultVaultsData,
} from "../models/vault";
import useFetchGovernanceSubgraphData from "./useFetchGovernanceSubgraphData";
import useFetchVaultSubgraphData from "./useFetchVaultSubgraphData";

export type VaultSubgraphDataContextType = {
  vaults: VaultsSubgraphData;
  vaultAccounts: VaultAccountsData;
  vaultActivities: VaultActivitiesData;
  balances: BalanceUpdate[];
  transactions: VaultTransaction[];
  vaultPriceHistory: VaultPriceHistoriesData;
  stakingPools: StakingPoolsSubgraphData;
  stakingAccounts: StakingPoolAccountsData;
  loading: boolean;
};

export type GovernanceSubgraphDataContextType = {
  rbnToken?: ERC20TokenSubgraphData;
  rbnTokenAccount?: RBNTokenAccountSubgraphData;
  // Total amount of RBN distributed from LiquidityGaugev5 across all gauges
  rbnTokenDistributedLg5: BigNumber;
  transactions: GovernanceTransaction[];
  loading: boolean;
};

export type SubgraphDataContextType = {
  vaultSubgraphData: VaultSubgraphDataContextType;
  governanceSubgraphData: GovernanceSubgraphDataContextType;
};

export const defaultVaultSubgraphData: VaultSubgraphDataContextType = {
  vaults: defaultVaultsData,
  vaultAccounts: defaultVaultAccountsData,
  vaultActivities: defaultVaultActivitiesData,
  balances: [],
  transactions: [],
  vaultPriceHistory: defaultV2VaultPriceHistoriesData,
  stakingPools: defaultStakingSubgraphData,
  stakingAccounts: defaultStakingAccountsData,
  loading: true,
};

export const defaultGovernanceSubgraphData: GovernanceSubgraphDataContextType =
  {
    rbnTokenDistributedLg5: BigNumber.from(0),
    transactions: [],
    loading: true,
  };

export const SubgraphDataContext = React.createContext<SubgraphDataContextType>(
  {
    vaultSubgraphData: defaultVaultSubgraphData,
    governanceSubgraphData: defaultGovernanceSubgraphData,
  }
);

export const SubgraphDataContextProvider: React.FC<{
  children: ReactElement;
}> = ({ children }) => {
  const vaultSubgraphData = useFetchVaultSubgraphData();
  const governanceSubgraphData = useFetchGovernanceSubgraphData();

  return (
    <SubgraphDataContext.Provider
      value={{
        vaultSubgraphData,
        governanceSubgraphData,
      }}
    >
      {children}
    </SubgraphDataContext.Provider>
  );
};
