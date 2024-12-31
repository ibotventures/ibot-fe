import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import classNames from 'classnames';
import Image from 'next/image';

const items = [
  {
    src: '/robots.png',
    altText: 'Slide 1',
    caption: 'Slide 1',
    key: 1,
  },
  {
    src: 'https://thumbs.dreamstime.com/z/imagination-work-close-up-shot-yellow-robot-vehicle-made-children-stem-robotics-class-inventions-creativity-184010240.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2',
    key: 2,
  },
  {
    src: 'https://cdn.mos.cms.futurecdn.net/BjQjQxjUpo6jRubZVBtt5W-1200-80.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3',
    key: 3,
  },
];

function Example(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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

  return (
    <>
      {
        isMobile ? (
          <Carousel activeIndex={activeIndex} onSelect={handleSelect} {...args}>
            {items.map((item) => (
              <Carousel.Item key={item.key}>
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
                      src={item.src} alt={item.altText}
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
                    <h2 style={{ color: '#333', marginBottom: '10px' }}>Build your own robots</h2>
                    <p style={{ color: '#555', marginBottom: '20px', fontWeight: 'bold' }}>
                      Unleash the power of robotics with hands-on learning. Build, code, and innovate for the future of automation!
                    </p>
                    <button className={classNames('btn', 'btn-primary', 'btn-block')} style={{ padding: '10px 20px' }}>
                      Get Started
                    </button>
                  </div>
                </div>
                <Carousel.Caption>
                  <h3>{item.caption}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>

        ) : (
          <>
            <Carousel activeIndex={activeIndex} onSelect={handleSelect} {...args}>
              {items.map((item) => (
                <Carousel.Item key={item.key}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderRadius: "20px", backgroundColor: "white" }}>
                    <div style={{ width: "60vw", display: "flex", flexDirection: "column", justifyContent: "center", padding: "30px" }}>
                      <h2>Build your own robots</h2>
                      <p>Unleash the power of robotics with hands-on learning. Build, code, and innovate for the future of automation!</p>
                      <button className={classNames("btn btn-primary btn-block")} style={{ width: "fit-content", padding: "0.7vw" }}>Get Started</button>
                    </div>
                    <img src={item.src} alt={item.altText} style={{ width: "40vw", borderRadius: "0vw 2vw 2vw 0vw", maxHeight: '500px' }} className='img-fluid' />
                  </div>
                  <Carousel.Caption>
                    <h3>{item.caption}</h3>
                  </Carousel.Caption>
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







