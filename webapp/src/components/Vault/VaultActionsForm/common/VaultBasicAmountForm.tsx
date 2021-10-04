import React, { useCallback, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";

import {
  BaseInput,
  BaseInputButton,
  BaseInputContainer,
  BaseInputLabel,
  SecondaryText,
  Title,
} from "shared/lib/designSystem";
import {
  ActionButton,
  ConnectWalletButton,
} from "shared/lib/components/Common/buttons";
import { getAssetDecimals, getAssetDisplay } from "shared/lib/utils/asset";
import useVaultActionForm from "../../../../hooks/useVaultActionForm";
import {
  getAssets,
  VaultMaxDeposit,
  VaultOptions,
} from "shared/lib/constants/constants";
import { getVaultColor } from "shared/lib/utils/vault";
import useConnectWalletModal from "shared/lib/hooks/useConnectWalletModal";
import { VaultInputValidationErrorList, VaultValidationErrors } from "../types";
import colors from "shared/lib/designSystem/colors";
import { formatBigNumber } from "shared/lib/utils/math";

interface VaultBasicAmountFormProps {
  vaultOption: VaultOptions;
  error?: VaultValidationErrors;
  formExtra?: {
    label: string;
    amount: BigNumber;
    error: boolean;
  };
  onFormSubmit: () => void;
  actionButtonText: string;
}

const VaultBasicAmountForm: React.FC<VaultBasicAmountFormProps> = ({
  vaultOption,
  error,
  formExtra,
  onFormSubmit,
  actionButtonText,
}) => {
  const asset = getAssets(vaultOption);
  const color = getVaultColor(vaultOption);

  const { handleInputChange, handleMaxClick, vaultActionForm } =
    useVaultActionForm(vaultOption);
  const { active } = useWeb3React();
  const [, setShowConnectModal] = useConnectWalletModal();

  const isInputNonZero = parseFloat(vaultActionForm.inputAmount) > 0;

  const renderErrorText = useCallback(
    (_error: VaultValidationErrors) => {
      if (VaultInputValidationErrorList.includes(_error)) {
        switch (_error) {
          case "insufficientBalance":
            return "Insufficient balance";
          case "maxExceeded":
            const vaultMaxDepositAmount = VaultMaxDeposit[vaultOption];
            return `Maximum ${formatBigNumber(
              vaultMaxDepositAmount,
              getAssetDecimals(asset)
            )} ${getAssetDisplay(asset)} Exceeded`;
          case "capacityOverflow":
            return "Vault capacity exceeded";
          case "withdrawLimitExceeded":
            return "Withdraw limit exceeded";
          case "withdrawAmountStaked":
            return "Withdrawal amount staked";
        }
      }

      return "";
    },
    [asset, vaultOption]
  );

  const formExtraInfo = useMemo(
    () =>
      formExtra ? (
        <div className="d-flex align-items-center mt-3 mb-1">
          <SecondaryText>{formExtra.label}</SecondaryText>
          <Title
            fontSize={14}
            lineHeight={24}
            className="ml-auto"
            color={formExtra.error ? colors.red : undefined}
          >
            {formatBigNumber(formExtra.amount, getAssetDecimals(asset))}{" "}
            {getAssetDisplay(asset)}
          </Title>
        </div>
      ) : (
        <></>
      ),
    [asset, formExtra]
  );

  const renderButton = useCallback(() => {
    if (active) {
      return (
        <ActionButton
          disabled={Boolean(error) || !isInputNonZero}
          onClick={onFormSubmit}
          className={`mt-4 py-3 mb-4`}
          color={color}
        >
          {actionButtonText}
        </ActionButton>
      );
    }

    return (
      <ConnectWalletButton
        onClick={() => setShowConnectModal(true)}
        type="button"
        className="btn mt-4 py-3 mb-4"
      >
        Connect Wallet
      </ConnectWalletButton>
    );
  }, [
    active,
    actionButtonText,
    color,
    error,
    isInputNonZero,
    onFormSubmit,
    setShowConnectModal,
  ]);

  return (
    <>
      <BaseInputLabel>AMOUNT ({getAssetDisplay(asset)})</BaseInputLabel>
      <BaseInputContainer
        className="position-relative mb-2"
        error={error ? VaultInputValidationErrorList.includes(error) : false}
      >
        <BaseInput
          type="number"
          className="form-control"
          aria-label="ETH"
          placeholder="0"
          value={vaultActionForm.inputAmount}
          onChange={handleInputChange}
        />
        {active && (
          <BaseInputButton onClick={handleMaxClick}>MAX</BaseInputButton>
        )}
      </BaseInputContainer>
      {error && (
        <SecondaryText color={colors.red}>
          {renderErrorText(error)}
        </SecondaryText>
      )}
      {formExtraInfo}
      {renderButton()}
    </>
  );
};

export default VaultBasicAmountForm;