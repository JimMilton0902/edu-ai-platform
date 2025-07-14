import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import CourseDetailModal from '../../components/CourseDetailModal/CourseDetailModal';

const Favorites = () => {
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null); // ✅ Modal state

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCourses')) || [];
    setFavoriteCourses(storedFavorites);
    setLoading(false);
  }, []);

  const removeFromFavorites = (courseId) => {
    const updated = favoriteCourses.filter(course => course.id !== courseId);
    setFavoriteCourses(updated);
    localStorage.setItem('favoriteCourses', JSON.stringify(updated));
  };

  if (loading) return <div className="loading">Đang tải danh sách yêu thích...</div>;

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1><AiFillHeart color="red" /> Khóa học yêu thích của bạn</h1>
        <p>Danh sách các khóa học bạn đã lưu</p>
      </div>

      {favoriteCourses.length > 0 ? (
        <div className="favorites-list">
          {favoriteCourses.map(course => (
            <div key={course.id} className="favorite-item" onClick={() => setSelectedCourse(course)} style={{ cursor: 'pointer' }}>
              <div className="course-thumbnail">
                <img src={course.thumbnail} alt={course.title} />
              </div>
              <div className="course-info">
                <h3>{course.title}</h3>
                <p className="instructor">{course.instructor}</p>
                <div className="course-meta">
                  <span className="rating">{course.rating} ★</span>
                  <span className="price">{course.price}</span>
                </div>
              </div>
              <button
                className="remove-favorite-btn"
                onClick={(e) => {
                  e.stopPropagation(); // ✅ Ngăn mở modal khi bấm nút xóa
                  removeFromFavorites(course.id);
                }}
                aria-label="Xóa khỏi danh sách yêu thích"
              >
                <AiFillHeart color="red" /> Xóa
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-favorites">
          <AiOutlineHeart size={50} />
          <h2>Bạn chưa có khóa học yêu thích nào</h2>
          <p>Hãy khám phá các khóa học và thêm vào danh sách yêu thích của bạn</p>
          <a href="/" className="explore-btn">Khám phá khóa học</a>
        </div>
      )}

      {/* Modal chi tiết */}
      {selectedCourse && (
        <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
  );
};

export default Favorites;
