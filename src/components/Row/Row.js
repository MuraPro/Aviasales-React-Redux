import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../images/Logo.png';

function Row({ sidebar, content }) {
  return (
    <div className="App">
      <div className="Page-wrapper">
        <main>
          <div className="Logo-wrapper">
            <img src={Logo} alt="123" className="Logo" />
          </div>
          <div className="Content-wrapper">
            {sidebar}
            {content}
          </div>
        </main>
      </div>
    </div>
  );
}

Row.propTypes = {
  sidebar: PropTypes.node,
  content: PropTypes.node,
};

export default Row;
