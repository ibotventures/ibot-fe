
import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap'; // Update import
import styles from '@/app/page.module.css';
import classNames from 'classnames';

const items = [
  {
    src: '/banner1.png',
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

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={activeIndex} onSelect={handleSelect} {...args}>
      {items.map((item) => (
        <Carousel.Item key={item.key}>
          <div style={{ display: "flex", justifyContent: "space-between", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", borderRadius: "2vw", backgroundColor: "white" }}>
            <div style={{ width: "60vw", display: "flex", flexDirection: "column", justifyContent: "center", padding: "2vw" }}>
              <h2 style={{ fontSize: "3vw" }}>Build your own robots</h2>
              <p className={styles.fontp}>Unleash the power of robotics with hands-on learning. Build, code, and innovate for the future of automation!</p>
              <button className={classNames("btn btn-primary btn-block")} style={{ width: "fit-content", padding: "0.7vw", fontSize: "1.4vw" }}>Get Started</button>
            </div>
            <img src={item.src} alt={item.altText} style={{ width: "40vw", borderRadius: "0vw 2vw 2vw 0vw", height: "40vh" }} className='img-fluid' />
          </div>
          <Carousel.Caption>
            <h3>{item.caption}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Example;
