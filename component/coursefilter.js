import { useState } from "react";
import debounce from "lodash.debounce";
import FilterCourse from "./filtercourse";

export default function CourseFilter({ setFilters }) {
    const [filters, setLocalFilters] = useState({});

    // Debounced function to update filters
    const updateFilters = debounce((updatedFilters) => {
        setLocalFilters(updatedFilters);
        if (typeof setFilters === 'function') {
            setFilters(updatedFilters);
        }
    }, 200);

    const handleFiltersUpdate = (updatedFilters) => {
        // Call the debounced update function
        updateFilters(updatedFilters);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column",marginBottom:'20px' }}>
            <FilterCourse onFilterChange={handleFiltersUpdate} />
        </div>
    );
}
