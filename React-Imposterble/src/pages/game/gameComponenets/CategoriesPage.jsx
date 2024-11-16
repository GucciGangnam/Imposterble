// IMPORTS 
// Style 
import "./CategoriesPage.css"
import confetti from 'canvas-confetti';
import { useEffect, useState, useMemo } from 'react';

// COMPONENT 
export const CategoriesPage = ({clientGameOBJ}) => {
    const chosenCat = clientGameOBJ.state.currentCategory.name // clientGameOBJ.state.currentCategory
    const [looping, setLooping] = useState(true)
    const categories = useMemo(() => [
        "Famous Movies",
        "Animals",
        "Brands",
        "Famous Landmarks",
        "Fruits and Vegetables",
        "Celebrities",
        "Countries",
        "Popular Songs",
        "Sports",
        "Video Games",
        "Famous Paintings",
        "TV Shows",
        "Superheroes",
        "Historical Figures",
        "Genres of Music",
        "Books",
        "Occupations",
        "Colors",
        "Vehicles",
        "Questions",
        "Famous Movies",
        "Animals",
        "Brands",
        "Famous Landmarks",
        "Fruits and Vegetables",
        "Celebrities",
        "Countries",
        "Popular Songs",
        "Sports",
        "Video Games",
        "Famous Paintings",
        "TV Shows",
        "Superheroes",
        "Historical Figures",
        "Genres of Music",
        "Books",
        "Occupations",
        "Colors",
        "Vehicles",
        "Questions"
    ], []); // Empty array means it won't change on re-renders

    const [currentCategory, setCurrentCategory] = useState(categories[0]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Set an interval that updates the category
        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                // If the next index is greater than or equal to the number of categories, clear the interval
                if (nextIndex >= categories.length) {
                    clearInterval(interval);
                    setLooping(false)
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { x: 0.5, y: 0.5 }
                    });
                    return prevIndex; // Return the last index
                }
                return nextIndex; // Update to the next index
            });
        }, 100); // Change category every 300ms

        return () => clearInterval(interval); // Clean up on unmount
    }, [categories.length]);

    useEffect(() => {
        setCurrentCategory(categories[index]); // Update the current category based on the index
    }, [index, categories]);

    return (
        <div className="CategoriesPage">
            {looping ? (
                <h1>{currentCategory}</h1>
            ) : (
                <>
                    <div className="ChosenCat">{chosenCat}</div>
                </>
            )}

        </div>
    );
};