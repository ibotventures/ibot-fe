'use client'
import React, { useState, useEffect } from 'react';
import Cards from "@/component/Card";
import axios from 'axios';
import styles from "@/app/page.module.css";
import Sidebar from '@/component/coursefilter';
import { Button, Offcanvas, OffcanvasBody,Spinner } from 'reactstrap';
import classNames from 'classnames';
import debounce from "lodash.debounce";
import { toast } from 'react-toastify';
export default function Products() {
  const [productData, setproductData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const updateFilter = debounce(async (updatedFilter) => {
    try {
      console.log("Updated Filters (debounced):", updatedFilter);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/productfilter/`, {
        params: {
          category: updatedFilter.age,
          rating: updatedFilter.rating,
        }
      });

      if (res.status === 200) {
        setproductData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  }, 200);

  const setFilters = (updatedFilter) => {
    // Call the debounced update function
    updateFilter(updatedFilter);
  };

  useEffect(() => {
    const handledata = async (e) => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/addproduct/`);
        if (res.status == 200) {
          setproductData(res.data.data);
        }
      } catch {
        toast.error('something went wrong');
      }
    }
    handledata();
  }, []);

  return (
    <>
      {
        !isMobile && (
          <h1 style={{ textAlign: "center", margin: "20px" }}>Our Products</h1>
        )
      }

      {isMobile && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
          <h1 style={{ textAlign: "center", margin: "20px" }}>Our Products</h1>
          <Button onClick={toggleSidebar} className={styles.sidebartoggle}>
            Filter
          </Button>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", padding: "3.5vw" }}>
        <div className={classNames(styles.sidebar)}>
          {isMobile ? (
            <Offcanvas isOpen={isOpen} toggle={toggleSidebar} direction="right" style={{ height: "100%" }}>
              <OffcanvasBody className={classNames(styles.sidebar)} style={{ width: "80vw" }}>
                <Sidebar setFilters={setFilters} />
              </OffcanvasBody>
            </Offcanvas>
          ) : (
            <>
              <Sidebar setFilters={setFilters} />
            </>

          )}
        </div>
        <div className={classNames(styles.occupy, 'container-fluid')}>
          <div className={styles.productwrap}>
            {productData.length ? (
              productData.map((product) => (
                <Cards key={product.id} product={product} className='container-fluid' />
              ))
            ) : (
              <div style={{ marginBottom: "2rem", paddingLeft: '20px' }}>
                {/* No data available */}
                <h4 style={{ textAlign: 'center' }}>"Almost there! Our course data is on its way..."</h4>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Spinner>
                    Loading...
                  </Spinner>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
    </>

  );
}

