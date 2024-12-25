
import React, { useState, useEffect } from "react";
import { Label, Input, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import styles from "@/app/page.module.css";
import { FaStar } from "react-icons/fa";
import axios from "axios";
export default function FilterCourse({ onFilterChange }) {
    const [categor, setcategor] = useState([]);
    useEffect(() => {
        const getcategory = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/app/getcategory`);
            const data = response.data.data;
            setcategor(data);
        }
        getcategory();

    }, []);
    const [filters, setFilters] = useState({
        category: "",
        rating: ""
    });

    const handleFilterChange = (category, value) => {
        setFilters(prev => {
            const updatedFilters = { ...prev, [category]: value };

            if (typeof onFilterChange === "function") {
                onFilterChange(updatedFilters);
            }

            return updatedFilters;
        });
    };

    const handleClearFilters = () => {
        const initialFilters = { category: "", rating: "" };
        setFilters(initialFilters);

        if (typeof onFilterChange === "function") {
            onFilterChange(initialFilters);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5vw" }}>

            <h2>Categories</h2>
            {categor.map(age => (
                <div key={age}>
                    <Input
                        type="radio"
                        id={`age-${age}`}
                        checked={filters.age === age}
                        onChange={() => handleFilterChange("age", age)}
                    />
                    <Label check htmlFor={`age-${age}`}>{age}</Label>
                </div>
            ))}

            <h2>Review</h2>
            {[5, 4, 3, 2, 1].map(star => (
                <div key={star}>
                    <Input
                        type="radio"
                        id={`rating-${star}`}
                        checked={filters.rating === star}
                        onChange={() => handleFilterChange("rating", star)}
                    />
                    <Label check htmlFor={`rating-${star}`}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <FaStar
                                key={index}
                                style={{
                                    color: index < star ? "gold" : "rgba(128, 128, 128, 0.5)"
                                }}
                            />
                        ))}
                    </Label>
                </div>
            ))}
            <Button color="secondary" onClick={handleClearFilters} style={{ marginTop: "1vw" }}>
                Clear Filters
            </Button>

        </div>
    );
}
