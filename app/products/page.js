'use client'
import React, { useState } from 'react';
import Cards from "@/component/Card";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  InputGroup,
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
export default function Products() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState('All Products'); // Set default value to 'All Products'

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleDropdownClick = (value) => {
    setInputValue(value); // Update input field with selected dropdown value
  };
  return (
    <>
      {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Image src="/robot.png" width={200} height={250}></Image>
        <h2 style={{ textAlign: "center" }}>Inspire the future with our cutting-edge educational robots!"</h2>
      </div> */}
      <div>
        <Card inverse>
          <CardImg
            alt="Card image cap"
            src="https://static.wixstatic.com/media/b71048_0d46a26bbb3847c5a00208a508c072b5~mv2.gif"
            style={{
              height: 500
            }}
            width="100%"
          />
          <CardImgOverlay style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* <CardTitle tag="h5">
              Card Title
            </CardTitle> */}
            <div style={{ width: "95%", height: "50%", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "30px" }}>
              <CardText style={{ fontSize: "1.5em", color: "Black", padding: "10px", textAlign: "center" }}>
                Inspire the future with our cutting-edge educational robots!
              </CardText>
            </div>
            {/* <CardText>
              <small className="text-muted">
                Last updated 3 mins ago
              </small>
            </CardText> */}
          </CardImgOverlay>
        </Card>
      </div>
      <br />
      <br />
      <br />
      <h1 style={{ textAlign: "center" }}>Our Products</h1>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <InputGroup style={{ width: "80%" }}>
          <Input value={inputValue} readOnly /> {/* Input is readOnly */}
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>
              Button Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleDropdownClick("All Products")}>
                All Products
              </DropdownItem>
              <DropdownItem onClick={() => handleDropdownClick("3-6")}>
                3-6
              </DropdownItem>
              <DropdownItem onClick={() => handleDropdownClick("6-8")}>
                6-8
              </DropdownItem>
              <DropdownItem onClick={() => handleDropdownClick("8+")}>
                8+
              </DropdownItem>
              <DropdownItem onClick={() => handleDropdownClick("10+")}>
                10+
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </InputGroup>
      </div>
      <br />
      <br/>
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

