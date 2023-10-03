import React from 'react';
import { Profile } from './profile/Profile';
import { Hint } from './profile/Hint';
import { Logo } from './Logo';

interface Props {}

const navbarItems = [
  'App',
  'Data',
  'Identities',
  'Alerts',
  'Investigation Center',
  'Configurations',
];

export const Navbar = (props: Props) => {
  const elements: JSX.Element[] = [];

  for (let i = 0; i < navbarItems.length; i++) {
    elements.push(<div key={i}>{navbarItems[i]}</div>);
  }
  return (
    <div className="flex flex-row justify-between w-full">
      <Logo />
      <div className="flex flex-row">{elements}</div>
      <div className="flex flex-row">
        <Hint />
        <Profile />
      </div>
    </div>
  );
};
