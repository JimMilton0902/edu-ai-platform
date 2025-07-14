import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const Favorites = () => {
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách yêu thích từ localStorage (hoặc API thực tế)
  useEffect(() => {
    const fetchFavorites = () => {
      try {
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteCourses')) || [];
        setFavoriteCourses(storedFavorites);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu thích:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);


  // Hàm xóa khóa học khỏi danh sách yêu thích
  const removeFromFavorites = (courseId) => {
    const updatedFavorites = favoriteCourses.filter(course => course.id !== courseId);
    setFavoriteCourses(updatedFavorites);
    localStorage.setItem('favoriteCourses', JSON.stringify(updatedFavorites));
    
    // Có thể thêm dispatch action nếu dùng Redux hoặc Context API
  };

  if (loading) {
    return <div className="loading">Đang tải danh sách yêu thích...</div>;
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>
          <AiFillHeart color="red" /> Khóa học yêu thích của bạn
        </h1>
        <p>Danh sách các khóa học bạn đã lưu</p>
      </div>

      {favoriteCourses.length > 0 ? (
        <div className="favorites-list">
          {favoriteCourses.map(course => (
            <div key={course.id} className="favorite-item">
              <Link to={`/course/${course.id}`} className="course-link">
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
              </Link>
              <button 
                className="remove-favorite-btn"
                onClick={() => removeFromFavorites(course.id)}
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
          <Link to="/" className="explore-btn">
            Khám phá khóa học
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;