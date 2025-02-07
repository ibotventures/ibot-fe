import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import classNames from 'classnames';
import Image from 'next/image';
import axios from 'axios';

function Example(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [items,setitems] = useState([]);
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleAdvertise = async () => {
      // const userid = Cookies.get('userid');
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/advertise/`);
        if (response.status === 200) {
          setitems(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    handleAdvertise();
  }, []);

  return (
    <>
      {
        isMobile ? (
          <Carousel activeIndex={activeIndex} onSelect={handleSelect} {...args}>
            {items.map((item,idx) => (
              <Carousel.Item key={idx}>
                <div
                  style={{
                    position: 'relative',
                    height: '50vh',
                    overflow: 'hidden',
                    borderRadius: '10px',
                  }}
                  className='img-fluid'
                >
                  {/* Background Image */}
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${item.Ad_image}`} alt='image'
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                    />
                  </div>

                  {/* Glass Effect */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(255, 255, 255, 0.4)', // Glass-like effect with transparency
                      backdropFilter: 'blur(2px)', // Creates the frosted glass effect
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '20px',
                      zIndex: 2,
                      borderRadius: '10px',
                    }}
                  >
                    <h2 style={{ color: '#333', marginBottom: '10px' }}>{item.headline}</h2>
                    <p style={{ color: '#555', marginBottom: '20px', fontWeight: 'bold' }}>
                      {item.description}
                    </p>
                    <button className={classNames('btn', 'btn-primary', 'btn-block')} style={{ padding: '10px 20px'}} onClick={() => window.location.href = item.weburl} >
                      Get Started
                    </button>
                  </div>
                </div>
                {/* <Carousel.Caption>
                  <h3>{item.caption}</h3>
                </Carousel.Caption> */}
              </Carousel.Item>
            ))}
          </Carousel>

        ) : (
          <>
            <Carousel activeIndex={activeIndex} onSelect={handleSelect} {...args}>
              {items.map((item,idx) => (
                <Carousel.Item key={idx}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderRadius: "20px", backgroundColor: "white" }}>
                    <div style={{ width: "60vw", display: "flex", flexDirection: "column", justifyContent: "center", padding: "30px" }}>
                      <h2>{item.headline}</h2>
                      <p>{item.description}</p>
                      <button className={classNames("btn btn-primary btn-block")} style={{ width: "fit-content", padding: "0.7vw",zIndex:'2' }} onClick={() => window.location.href = item.weburl}>Get Started</button>
                    </div>
                    <img src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${item.Ad_image}`} alt='image' style={{ width: "40vw", borderRadius: "0vw 2vw 2vw 0vw", maxHeight: '500px' }} className='img-fluid'/>
                  </div>
                  {/* <Carousel.Caption>
                    <h3>{item.caption}</h3>
                  </Carousel.Caption> */}
                </Carousel.Item>
              ))}
            </Carousel>
          </>

        )
      }
    </>
  );
}

export default Example;
