import React from 'react';
import Navbar from './components/Home/Navbar/Navbar';

const HomeLayout = ({ children }) => (
  <>
    <Navbar />
    <div>{children}</div>
  </>
);

export default HomeLayout;