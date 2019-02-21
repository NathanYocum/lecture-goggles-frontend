import React from 'react';
import PropTypes from 'prop-types';
import { TabBarStyle, TabBarTabStyle } from '../__styles__/styles';

const TabBar = props => {
  const { tabNames, onClickFunction, currentTab } = props;
  return (
    <TabBarStyle data-testid="tab-bar">
      {tabNames.map(item => (
        <TabBarTabStyle
          isActive={item === currentTab}
          onClick={() => onClickFunction(item)}
          key={item}
          data-testid={`${item}-tab`}
        >
          {item}
        </TabBarTabStyle>
      ))}
    </TabBarStyle>
  );
};

TabBar.propTypes = {
  tabNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickFunction: PropTypes.func.isRequired,
  currentTab: PropTypes.string
};

TabBar.defaultProps = {
  currentTab: ''
};

export default TabBar;
