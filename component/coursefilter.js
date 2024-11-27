
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "@/app/page.module.css";
import debounce from "lodash.debounce";
import FilterCourse from "./filtercourse";

export default function CourseFilter({ setFilters }) {
    const [isAdmin, setIsAdmin] = useState('');
    const [filters, setLocalFilters] = useState({});

    useEffect(() => {
        setIsAdmin(Cookies.get('username'));
    }, []);

    // Debounced function to update filters
    const updateFilters = debounce((updatedFilters) => {
        setLocalFilters(updatedFilters);
        // console.log("Updated Filters (debounced):", updatedFilters);
        // Pass the updated filters to the parent
        if (typeof setFilters === 'function') {
            setFilters(updatedFilters);
        }
        
    }, 200);

    const handleFiltersUpdate = (updatedFilters) => {
        // Call the debounced update function
        updateFilters(updatedFilters);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5vw" }} className={styles.fontp}>
            {isAdmin === 'Administrator' ? (
                <>
                    <a href='/adminpages/addcourse'>
                        <button className='btn btn-primary'>Create new Course</button>
                    </a>
                    <FilterCourse onFilterChange={handleFiltersUpdate} />
                </>
            ) : (
                <>
                    <FilterCourse onFilterChange={handleFiltersUpdate} />
                </>
            )}
        </div>
    );
}
