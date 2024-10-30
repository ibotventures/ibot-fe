'use client'
import React, { useState, useEffect } from 'react';
import Cards from "@/component/Card";
import Cookies from 'js-cookie';
import {
  InputGroup,
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
export default function Products() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState('All Products'); 

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleDropdownClick = (value) => {
    setInputValue(value); // Update input field with selected dropdown value
  };

  const [isadmin, setisadmin] = useState('');
  useEffect(() => {
    setisadmin(Cookies.get('username'));
  }, []);
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px" }}>Our Products</h1>
      <br />
      <div style={{ display: "flex", justifyContent: 'space-evenly' }}>
        <InputGroup style={{ width: "80%", height: "50px" }}>
          <Input value={inputValue} readOnly /> {/* Input is readOnly */}
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>
              Filter
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleDropdownClick("All Products")}>
                All Products
              </DropdownItem>

              <DropdownItem onClick={() => handleDropdownClick("Age 3-5")}>
                Age 3-5
              </DropdownItem>
              <DropdownItem onClick={() => handleDropdownClick("Age 5-9")}>
                Age 5-9
              </DropdownItem>
              <DropdownItem onClick={() => handleDropdownClick("Age 9-15")}>
                Age 9-15
              </DropdownItem>

            </DropdownMenu>
          </ButtonDropdown>
        </InputGroup>
        {isadmin == 'Administrator' ? (
          <>
            <a href='/adminpages/addproduct'> <button className='btn btn-primary'>Add New Product</button></a>

          </>
        ) : null}
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", gap: "5px" }}>
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
      <br />
      <br />
      <br />
    </>

  );
}

