import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Header, Icon, Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';

const LokkiHeader = styled(Header)`
  font-family: serif;
`;

export const MenuNavLink: React.FC<NavLinkProps> = (props) => (
  <NavLink exact {...props} />
);

const MenuBar: React.FC = () => (
  <Menu pointing fixed="top">
    <Menu.Item>
      <LokkiHeader>
        <Icon name="key" /> Lokki
      </LokkiHeader>
    </Menu.Item>
    <Menu.Item as={MenuNavLink} to="/" name="home" />
    <Menu.Item as={MenuNavLink} to="/keys" name="keys" />
    <Menu.Item as={MenuNavLink} to="/settings" name="settings" />
  </Menu>
);

export default MenuBar;
