import React, {useState, useEffect} from 'react';
// import '../../style.css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';


const CourseDetailModal = ({ course, onClose }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Kiểm tra xem khóa học đã có trong danh sách yêu thích chưa
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteCourses')) || [];
    const found = favorites.some(fav => fav.id === course.id);
    setIsFavorite(found);
  }, [course.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteCourses')) || [];

    if (isFavorite) {
      const updated = favorites.filter(fav => fav.id !== course.id);
      localStorage.setItem('favoriteCourses', JSON.stringify(updated));
    } else {
      const newFavorite = { ...course, isFavorite: true };
      localStorage.setItem('favoriteCourses', JSON.stringify([...favorites, newFavorite]));
    }

    setIsFavorite(!isFavorite);
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <img src={course.thumbnail} alt={course.title} className="modal-image" />
        <h2>{course.title}</h2>
        <p><strong>Giảng viên:</strong> {course.instructor}</p>
        <p><strong>Mô tả:</strong> {course.description}</p>
        <p><strong>Giá:</strong> {course.price.toLocaleString()} VND</p>
        <p><strong>Đánh giá:</strong> {course.rating} ★</p>

        {/* Nút Yêu thích */}
        <button className="favorite-btn" onClick={toggleFavorite}>
          {isFavorite ? (
            <AiFillHeart color="red" size={24} />
          ) : (
            <AiOutlineHeart size={24} />
          )}
        </button>

      </div>
    </div>
  );
};

export default CourseDetailModal;
