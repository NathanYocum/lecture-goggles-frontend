import React from 'react';
import PropTypes from 'prop-types';
import { TabBarStyle, TabBarTabStyle } from '../__styles__/styles';

const TabBar = props => {
  const { tabNames } = props;
  return (
    <TabBarStyle data-testid="tab-bar">
      {tabNames.map(item => (
        <TabBarTabStyle key={item} data-testid={`${item}-tab`}>
          {item}
        </TabBarTabStyle>
      ))}
    </TabBarStyle>
  );
};

TabBar.propTypes = {
  tabNames: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default TabBar;
