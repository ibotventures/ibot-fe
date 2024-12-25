import { useState } from "react";
// import styles from "@/app/page.module.css";
import debounce from "lodash.debounce";
import FilterCourse from "./filtercourse";

export default function CourseFilter({ setFilters }) {
    const [filters, setLocalFilters] = useState({});

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
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5vw" }}>
            <FilterCourse onFilterChange={handleFiltersUpdate} />
        </div>
    );
}
