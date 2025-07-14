import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import '../../style.css';

const CourseCard = ({ course, onViewDetail }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteCourses')) || [];
    const isCourseFavorite = favorites.some(fav => fav.id === course.id);
    setIsFavorite(isCourseFavorite);
  }, [course.id]);

  const toggleFavorite = (e) => { 
    e.preventDefault();
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem('favoriteCourses')) || [];
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== course.id);
      localStorage.setItem('favoriteCourses', JSON.stringify(updatedFavorites));
    } else {
      const newFavorite = { ...course, isFavorite: true };
      localStorage.setItem('favoriteCourses', JSON.stringify([...favorites, newFavorite]));
    }
    
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className="course-card"
      onClick={() => {
        if (typeof onViewDetail === 'function') {
          onViewDetail(course);
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      <div className="course-thumbnail">
        <img src={course.thumbnail} alt={course.title} />
        <button 
          className="favorite-btn" 
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
        >
          {isFavorite ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
        </button>
      </div>
      <div className="course-info">
        <h3>{course.title}</h3>
        <p className="instructor">{course.instructor}</p>
        <div className="rating-price">
          <span className="rating">{course.rating} ★</span>
          <span className="price">{course.price}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
