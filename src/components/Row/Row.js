import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../images/Logo.png';

function Row({ sidebar, content }) {
  return (
    <>
      <div className="Page-wrapper">
        <main className="main">
          <div className="Logo-wrapper">
            <img src={Logo} alt="123" className="Logotype" />
          </div>
          <div className="Content-wrapper">
            {sidebar}
            {content}
          </div>
        </main>
      </div>
    </>
  );
}

Row.propTypes = {
  sidebar: PropTypes.node,
  content: PropTypes.node,
};

export default Row;
