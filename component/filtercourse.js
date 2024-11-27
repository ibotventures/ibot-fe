
import React, { useState } from "react";
import { Label, Input, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/app/page.module.css";
import { FaStar } from "react-icons/fa";

export default function FilterCourse({ onFilterChange }) {
    const [filters, setFilters] = useState({
        age: "",
        rating: "",
        level: ""
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
        const initialFilters = { age: "", rating: "", level: "" };
        setFilters(initialFilters);

        if (typeof onFilterChange === "function") {
            onFilterChange(initialFilters);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5vw" }} className={styles.fontp}>
            <h2>Course Categories</h2>
            {["Age 3-5", "Age 5-9", "Age 9-15"].map(age => (
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

            <h2>All Levels</h2>
            {["Beginner", "Intermediate", "Expert"].map(level => (
                <div key={level}>
                    <Input
                        type="radio"
                        id={`level-${level}`}
                        checked={filters.level === level}
                        onChange={() => handleFilterChange("level", level)}
                    />
                    <Label check htmlFor={`level-${level}`}>{level}</Label>
                </div>
            ))}

            {/* Clear Filters Button */}
            <Button color="secondary" onClick={handleClearFilters} style={{ marginTop: "1vw" }}>
                Clear Filters
            </Button>
        </div>
    );
}
