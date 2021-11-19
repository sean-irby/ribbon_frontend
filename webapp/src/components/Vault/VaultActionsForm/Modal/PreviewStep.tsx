import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { BigNumber } from "ethers";

import { SecondaryText, Title, PrimaryText } from "shared/lib/designSystem";
import { ActionButton } from "shared/lib/components/Common/buttons";
import { ACTIONS, ActionType, V2WithdrawOption } from "./types";
import { formatBigNumber } from "shared/lib/utils/math";
import { getAssetDecimals, getAssetDisplay } from "shared/lib/utils/asset";
import { Assets } from "shared/lib/store/types";
import {
  VaultOptions,
  VaultFees,
  VaultVersion,
} from "shared/lib/constants/constants";
import { productCopies } from "shared/lib/components/Product/productCopies";
import { getVaultColor } from "shared/lib/utils/vault";
import { capitalize } from "shared/lib/utils/text";
import {
  DepositIcon,
  MigrateIcon,
  TransferIcon,
  WithdrawIcon,
} from "shared/lib/assets/icons/icons";
import colors from "shared/lib/designSystem/colors";
import theme from "shared/lib/designSystem/theme";
import { useLatestAPY } from "shared/lib/hooks/useLatestOption";
import { useV2VaultData } from "shared/lib/hooks/web3DataContext";
import TooltipExplanation from "shared/lib/components/Common/TooltipExplanation";
import HelpInfo from "shared/lib/components/Common/HelpInfo";

const ActionLogoContainer = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 100px;
  background: ${(props) => props.color}14;
`;

const FormTitle = styled(Title)`
  font-size: 22px;
  line-height: 28px;
  letter-spacing: 1px;
`;

const Arrow = styled.i<{ color: string }>`
  font-size: 12px;
  color: ${(props) => props.color};
`;

const WithdrawalStepsCircle = styled.div<{ active: boolean; color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  background: ${(props) => props.color}14;

  ${(props) =>
    props.active
      ? `
          border: ${theme.border.width} ${theme.border.style} ${props.color};
        `
      : ``}
`;

const WithdrawalStepsDividerLine = styled.div<{ color: string }>`
  width: 40px;
  height: 1px;
  background: ${(props) => props.color}3D;
  margin-top: calc((32px - 1px) / 2);
`;

const WithdrawalWarningContainer = styled.div<{ color: string }>`
  padding: 8px;
  background: ${(props) => props.color}14;
  border-radius: ${theme.border.radiusSmall};
`;

const PreviewStep: React.FC<{
  actionType: ActionType;
  withdrawOption?: V2WithdrawOption;
  amount: BigNumber;
  positionAmount: BigNumber;
  onClickConfirmButton: () => Promise<void>;
  asset: Assets;
  vaultOption: VaultOptions;
  vaultVersion: VaultVersion;
  receiveVaultOption?: VaultOptions;
}> = ({
  actionType,
  withdrawOption,
  amount,
  positionAmount,
  onClickConfirmButton,
  asset,
  vaultOption,
  vaultVersion,
  receiveVaultOption,
}) => {
  const color = getVaultColor(vaultOption);
  const latestAPY = useLatestAPY(vaultOption, vaultVersion);
  const {
    data: { withdrawals: v2Withdrawals },
  } = useV2VaultData(vaultOption);

  interface ActionDetail {
    key: string;
    value: string;
  }
  const detailRows: ActionDetail[] = useMemo(() => {
    let actionDetails: ActionDetail = { key: "", value: "" };

    switch (actionType) {
      case ACTIONS.deposit:
        actionDetails = {
          key: "Approx. APY",
          value: `${
            latestAPY.fetched ? latestAPY.res.toFixed(2) : "0.00"
          }% APY`,
        };
        break;
      case ACTIONS.withdraw:
        // Since details row is only applicable to V1, we just leave value to 0% when the said vault does not have v1
        actionDetails = {
          key: "Withdrawal Fee",
          value: `${parseFloat(
            VaultFees[vaultOption].v1?.withdrawalFee ?? "0"
          ).toString()}%`,
        };
        break;
      case ACTIONS.transfer:
        actionDetails = {
          key: "Transfer Fee",
          value: "0.00%",
        };
    }

    if (actionType === ACTIONS.transfer) {
      return [
        {
          key: "Transfer To",
          value: productCopies[receiveVaultOption!].title,
        },
        {
          key: "Transfer From",
          value: productCopies[vaultOption].title,
        },
        actionDetails,
      ];
    }

    const details: ActionDetail[] = [
      { key: "Product", value: productCopies[vaultOption].title },
      withdrawOption === "instant" ? null : actionDetails,
    ].filter((x) => x !== null) as ActionDetail[];
    return details;
  }, [actionType, latestAPY, receiveVaultOption, vaultOption, withdrawOption]);

  const originalAmount = formatBigNumber(
    positionAmount,
    getAssetDecimals(asset)
  );

  const renderWithdrawalSteps = useCallback(
    (withdrawOption: V2WithdrawOption) => {
      if (withdrawOption === "instant") {
        return <></>;
      }

      return (
        <div className="d-flex mt-2">
          <div className="d-flex flex-column align-items-center">
            <WithdrawalStepsCircle
              active={withdrawOption === "standard"}
              color={color}
            >
              <Title
                fontSize={14}
                lineHeight={20}
                color={
                  withdrawOption === "standard" ? color : colors.quaternaryText
                }
              >
                1
              </Title>
            </WithdrawalStepsCircle>
            <PrimaryText
              fontSize={11}
              lineHeight={12}
              color={
                withdrawOption === "standard" ? color : colors.quaternaryText
              }
              className="mt-2 text-center"
              style={{ maxWidth: 60 }}
            >
              Initiate Withdrawal
            </PrimaryText>
          </div>
          <WithdrawalStepsDividerLine color={color} />
          <div className="d-flex flex-column align-items-center">
            <WithdrawalStepsCircle
              active={withdrawOption === "complete"}
              color={color}
            >
              <Title
                fontSize={14}
                lineHeight={20}
                color={
                  withdrawOption === "complete" ? color : colors.quaternaryText
                }
              >
                2
              </Title>
            </WithdrawalStepsCircle>
            <PrimaryText
              fontSize={11}
              lineHeight={12}
              color={
                withdrawOption === "complete" ? color : colors.quaternaryText
              }
              className="mt-2 text-center mb-4"
              style={{ maxWidth: 60 }}
            >
              Complete Withdrawal
            </PrimaryText>
          </div>
        </div>
      );
    },
    [color]
  );

  switch (actionType) {
    case ACTIONS.migrate:
      return (
        <div
          style={{ flex: 1 }}
          className="d-flex flex-column align-items-center"
        >
          {/* Logo */}
          <ActionLogoContainer color={color}>
            <MigrateIcon color={color} height={27} />
          </ActionLogoContainer>

          {/* Title */}
          <FormTitle className="mt-3">MIGRATE PREVIEW</FormTitle>

          {/* Info Preview */}
          <div className="d-flex w-100 flex-row align-items-center justify-content-between mt-4 mt-lg-auto">
            <SecondaryText>Amount</SecondaryText>
            <Title className="text-right">
              {originalAmount} {getAssetDisplay(asset)}
            </Title>
          </div>
          <div className="d-flex w-100 flex-row align-items-center justify-content-between mt-4">
            <SecondaryText>Product</SecondaryText>
            <Title className="text-right">
              {productCopies[vaultOption].title}
            </Title>
          </div>
          <div className="d-flex w-100 flex-row align-items-center justify-content-between mt-4 mb-4 mb-md-5 mb-lg-auto">
            <SecondaryText>Migration</SecondaryText>
            <Title className="d-flex align-items-center text-right">
              V1 <Arrow className="fas fa-arrow-right mx-2" color={color} /> V2
            </Title>
          </div>

          {/* Migrate Button */}
          <ActionButton
            onClick={onClickConfirmButton}
            className="btn py-3 mb-4"
            color={color}
          >
            CONFIRM MIGRATION TO V2
          </ActionButton>
        </div>
      );
    // @ts-ignore
    case ACTIONS.withdraw:
      switch (withdrawOption) {
        case "standard":
          return (
            <div className="d-flex flex-column align-items-center">
              {/* Title */}
              <FormTitle className="mt-4 mx-3 text-center">
                INITIATE WITHDRAWAL PREVIEW
              </FormTitle>

              {/* Info Preview */}
              <div className="d-flex w-100 flex-row align-items-center justify-content-between mt-4">
                <SecondaryText>Amount</SecondaryText>
                <Title className="text-right">
                  {formatBigNumber(amount, getAssetDecimals(asset))}{" "}
                  {getAssetDisplay(asset)}
                </Title>
              </div>
              <div className="d-flex w-100 flex-row align-items-center justify-content-between mt-4">
                <SecondaryText>Already Initiated</SecondaryText>
                <Title className="text-right">
                  {formatBigNumber(
                    v2Withdrawals.amount,
                    getAssetDecimals(asset)
                  )}{" "}
                  {getAssetDisplay(asset)}
                </Title>
              </div>
              <div className="d-flex w-100 flex-row align-items-center justify-content-between mt-4">
                <SecondaryText>Product</SecondaryText>
                <Title className="text-right">
                  {productCopies[vaultOption].title}
                </Title>
              </div>

              {/* Migrate Button */}
              <ActionButton
                onClick={onClickConfirmButton}
                className="btn py-3 mt-4 mb-3"
                color={color}
              >
                INITIATE WITHDRAWAL
              </ActionButton>
              {renderWithdrawalSteps("standard")}
              <WithdrawalWarningContainer
                className="mb-4 w-100 text-center"
                color={color}
              >
                <PrimaryText fontSize={14} lineHeight={20} color={color}>
                  You can complete your withdrawal any time after 10am UTC on
                  Friday when your ETH will be removed from the vault’s
                  investable pool of funds
                </PrimaryText>
              </WithdrawalWarningContainer>
            </div>
          );
        case "complete":
          let description = <></>;
          let slippage = <></>;

          switch (vaultOption) {
            case "rstETH-THETA":
              description = (
                <PrimaryText
                  color={colors.text}
                  fontSize={14}
                  lineHeight={20}
                  className="mt-3 text-center"
                >
                  To complete your withdrawal the vault will swap your stETH to
                  ETH on Curve{" "}
                </PrimaryText>
              );
              slippage = (
                <div className="d-flex w-100 flex-row align-items-center justify-content-between mt-4">
                  <SecondaryText>Max Slippage</SecondaryText>
                  <TooltipExplanation
                    title="SLIPPAGE"
                    explanation="Slippage refers to the difference between the expected price of a trade and the price at which the trade is executed."
                    learnMoreURL="https://www.investopedia.com/terms/s/slippage.asp"
                    renderContent={({ ref, ...triggerHandler }) => (
                      <HelpInfo
                        containerRef={ref}
                        {...triggerHandler}
                        className="mr-auto"
                      >
                        i
                      </HelpInfo>
                    )}
                  />

                  <Title className="text-right">1.00%</Title>
                </div>
              );
          }

          return (
            <div className="d-flex flex-column align-items-center">
              {/* Logo */}
              <ActionLogoContainer color={color}>
                <WithdrawIcon color={color} />
              </ActionLogoContainer>

              {/* Title */}
              <FormTitle className="mt-3 text-center">
                COMPLETE WITHDRAWAL
              </FormTitle>
              {description}

              {/* Info Preview */}
              <div className="d-flex w-100 flex-row align-items-center justify-content-between mt-4">
                <SecondaryText>Withdraw Amount</SecondaryText>
                <Title className="text-right">
                  {formatBigNumber(amount, getAssetDecimals(asset))}{" "}
                  {getAssetDisplay(asset)}
                </Title>
              </div>
              <div className="d-flex w-100 flex-row align-items-center justify-content-between mt-4">
                <SecondaryText>Product</SecondaryText>
                <Title className="text-right">
                  {productCopies[vaultOption].title}
                </Title>
              </div>
              {slippage}

              {/* Migrate Button */}
              <ActionButton
                onClick={onClickConfirmButton}
                className="btn py-3 mt-4 mb-3"
                color={color}
              >
                COMPLETE WITHDRAWAL
              </ActionButton>
              {renderWithdrawalSteps("complete")}
            </div>
          );
      }

    /**
     * IMPORTANT
     * Do note over here that the fallthrough case currently will only allow V1 withdraw to fall through.
     * Exercise great caution when introducing further fallthrough to avoid unintended consequences.
     */
    // eslint-disable-next-line no-fallthrough
    default:
      const actionWord = capitalize(actionType);
      let actionLogo = <></>;

      switch (actionType) {
        case ACTIONS.deposit:
          actionLogo = <DepositIcon color={color} width={32} />;
          break;
        case ACTIONS.withdraw:
          actionLogo = <WithdrawIcon color={color} width={32} />;
          break;
        case ACTIONS.transfer:
          actionLogo = <TransferIcon color={color} width={32} />;
      }

      return (
        <div className="d-flex flex-column align-items-center">
          {/* Logo */}
          <ActionLogoContainer color={color}>{actionLogo}</ActionLogoContainer>

          {/* Title */}
          <FormTitle className="mt-3 text-center">
            {actionWord} PREVIEW
          </FormTitle>

          {/* Info Preview */}
          <div className="d-flex w-100 flex-row align-items-center justify-content-between mt-4">
            <SecondaryText>{actionWord} Amount</SecondaryText>
            <Title className="text-right">
              {formatBigNumber(amount, getAssetDecimals(asset))}{" "}
              {getAssetDisplay(asset)}
            </Title>
          </div>
          {detailRows.map((detail, index) => (
            <div
              className="d-flex w-100 flex-row align-items-center justify-content-between mt-4"
              key={index}
            >
              <SecondaryText>{detail.key}</SecondaryText>
              <Title className="text-right">{detail.value}</Title>
            </div>
          ))}

          <ActionButton
            onClick={onClickConfirmButton}
            className="btn py-3 mt-4 mb-3"
            color={color}
          >
            {actionWord} Now
          </ActionButton>
        </div>
      );
  }
};

export default PreviewStep;
