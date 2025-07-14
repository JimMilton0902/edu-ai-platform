import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import '../../style.css';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Giả lập API call - thực tế sẽ fetch dữ liệu từ API
    const fetchCourse = async () => {
      // Dữ liệu giả lập
      const fakeCourse = {
        id: 1,
        title: "Lập trình Python AI",
        description: "Khóa học toàn diện về Python và ứng dụng AI...",
        instructor: {
          name: "TS. Nguyễn Văn A",
          bio: "Chuyên gia AI với 10 năm kinh nghiệm...",
          avatar: "./images.jpg"
        },
        price: "499,000đ",
        rating: 4.8,
        students: 1250,
        duration: "32 giờ",
        lessons: 45,
        thumbnail: "/python-course.jpg",
        curriculum: [
          { title: "Giới thiệu Python", duration: "2 giờ" },
          { title: "Các thư viện AI cơ bản", duration: "4 giờ" },
        ]
      };
      setCourse(fakeCourse);
    };

    fetchCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="course-detail">
      <div className="course-header">
        <div className="course-thumbnail">
          <img src="/images.jpg" alt="Lập trình Python AI"></img>
        </div>
        <div className="course-meta">
          <h1>{course.title}</h1>
          <p className="instructor">Giảng viên: {course.instructor.name}</p>
          <div className="stats">
            <span>{course.rating} ★ ({course.students}+ học viên)</span>
            <span>{course.duration} • {course.lessons} bài học</span>
          </div>
          <div className="actions">
            <button className="enroll-btn">Đăng ký ngay</button>
            <button 
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
              {isFavorite ? "Đã yêu thích" : "Yêu thích"}
            </button>
          </div>
        </div>
      </div>
      
      <div className="course-content">
        <div className="description-section">
          <h2>Mô tả khóa học</h2>
          <p>{course.description}</p>
        </div>
        
        <div className="curriculum-section">
          <h2>Nội dung khóa học</h2>
          {course.curriculum.map((item, index) => (
            <div key={index} className="curriculum-item">
              <div className="item-number">{index + 1}</div>
              <div className="item-content">
                <h3>{item.title}</h3>
                <span>{item.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;