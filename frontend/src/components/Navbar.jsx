import React from 'react';

const Navbar = ({ onAddClick }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <a className="navbar-brand" href="#">Product Catalog</a>
        <button
          className="btn btn-primary"
          onClick={onAddClick}
        >
          Add Product
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
