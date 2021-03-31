import { useState } from "react";
import styled from "styled-components";

import Logo from "./Logo";
import colors from "../../designSystem/colors";
import sizes from "../../designSystem/sizes";
import { Title, BaseLink } from "../../designSystem";
import MenuButton from "./MenuButton";
import { NavItemProps, MobileMenuOpenProps } from "./types";
import AccountStatus from "../Wallet/AccountStatus";
import theme from "../../designSystem/theme";
import MobileOverlayMenu from "../Common/MobileOverlayMenu";

const HeaderContainer = styled.div<MobileMenuOpenProps>`
  height: ${theme.header.height}px;
  border-bottom: 1px solid ${colors.border};
  position: relative;

  @media (max-width: ${sizes.md}px) {
    padding: 16px 24px;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: none;
    background-color: ${colors.background};
  }

  z-index: ${(props) => (props.isMenuOpen ? 50 : 10)};
`;

const LogoContainer = styled.div`
  padding-left: 40px;
  z-index: 1000;

  @media (max-width: ${sizes.md}px) {
    padding-left: 0;
  }
`;

const HeaderAbsoluteContainer = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;

  @media (max-width: ${sizes.md}px) {
    display: none;
  }
`;

const LinksContainer = styled.div`
  display: flex;
`;

const NavItem = styled.div<NavItemProps>`
  display: flex;
  align-items: center;
  padding: 0px 28px;
  height: 100%;
  opacity: ${(props) => (props.isSelected ? "1" : "0.48")};

  &:hover {
    opacity: ${(props) => (props.isSelected ? theme.hover.opacity : "1")};
  }

  @media (max-width: ${sizes.md}px) {
    padding: 0px 0px 40px 48px;
  }
`;

const NavLinkText = styled(Title)`
  letter-spacing: 1.5px;
  font-size: 14px;
  line-height: 20px;

  @media (max-width: ${sizes.md}px) {
    font-size: 24px;
  }
`;

const SecondaryMobileNavItem = styled.div`
  display: none;

  @media (max-width: ${sizes.md}px) {
    display: flex;
    padding: 0px 0px 24px 48px;
  }
`;

const SecondaryMobileNavLinktext = styled(Title)`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.48);
`;

const MobileOnly = styled.div`
  display: none;

  @media (max-width: ${sizes.md}px) {
    display: flex;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderLinkItem = (
    title: string,
    to: string,
    isSelected: boolean,
    primary: boolean = true,
    external: boolean = false
  ) => {
    return (
      <BaseLink
        to={to}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
      >
        {primary ? (
          <NavItem isSelected={isSelected}>
            <NavLinkText>{title}</NavLinkText>
          </NavItem>
        ) : (
          <SecondaryMobileNavItem>
            <SecondaryMobileNavLinktext>{title}</SecondaryMobileNavLinktext>
          </SecondaryMobileNavItem>
        )}
      </BaseLink>
    );
  };

  return (
    <HeaderContainer
      isMenuOpen={isMenuOpen}
      className="d-flex align-items-center justify-content-between"
    >
      {/* LOGO */}
      <LogoContainer>
        <Logo></Logo>
      </LogoContainer>

      {/* LINKS */}
      <HeaderAbsoluteContainer>
        <LinksContainer>
          {renderLinkItem("PRODUCTS", "/", true)}
          {/* {renderLinkItem("PORTFOLIO", "/portfolio", false)} */}
        </LinksContainer>
      </HeaderAbsoluteContainer>

      <AccountStatus variant="desktop" />

      {/* MOBILE MENU */}
      <MobileOnly>
        <MenuButton onToggle={onToggleMenu} isOpen={isMenuOpen} />
        <MobileOverlayMenu
          className="flex-column align-items-center justify-content-center"
          isMenuOpen={isMenuOpen}
          onOverlayClick={onToggleMenu}
          boundingDivProps={{
            style: {
              marginRight: "auto",
            },
          }}
        >
          {renderLinkItem("PRODUCTS", "/", true)}
          {/* {renderLinkItem("PORTFOLIO", "/portfolio", false)} */}
          {renderLinkItem(
            "DISCORD",
            "http://tiny.cc/ribbon-discord",
            false,
            false,
            true
          )}
          {renderLinkItem(
            "TWITTER",
            "https://twitter.com/ribbonfinance",
            false,
            false,
            true
          )}
          {renderLinkItem(
            "GITHUB",
            "https://github.com/ribbon-finance",
            false,
            false,
            true
          )}
          {/* {renderLinkItem("FAQS", "/faq", false, false)} */}
          {renderLinkItem(
            "BLOG",
            "https://medium.com/@ribbonfinance",
            false,
            false,
            true
          )}
          {/* {renderLinkItem("TERMS", "/terms", false, false)} */}
          {renderLinkItem("POLICY", "/policy", false, false)}
        </MobileOverlayMenu>
      </MobileOnly>
    </HeaderContainer>
  );
};

export default Header;