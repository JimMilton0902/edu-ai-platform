import React, { useState, useEffect } from 'react';
import CourseList from '../../components/CourseList/CourseList';
import '../../style.css';

const HomePage = () => {
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Dữ liệu giả lập - thực tế sẽ gọi API
    setRecommendedCourses([
      { 
        id: 1, 
        title: "Lập trình Python AI", 
        instructor: "TS. Nguyễn Văn A", 
        price: "499000", 
        rating: 4.8, 
        thumbnail: "/images.jpg" 
      },
      // Thêm các khóa học khác...
    ]);
    
    setPopularCourses([
      { 
        id: 3, 
        title: "Tiếng Anh giao tiếp", 
        instructor: "Cô Sarah Johnson", 
        price: "599000", 
        rating: 4.9, 
        thumbnail: "/english.jpg" 
      },
      // Thêm các khóa học khác...
    ]);
    
    setCategories([
      { id: 1, name: "Công nghệ thông tin", icon: "/it-icon.png" },
      { id: 2, name: "Ngoại ngữ", icon: "/language-icon.png" },
    ]);
  }, []);

  return (
    <div className="home-page">
      <section className="hero-banner">
        <h1>Học tập thông minh cùng AI</h1>
        <p>Khám phá các khóa học chất lượng được cá nhân hóa cho bạn</p>
      </section>
      
      <section className="section">
        <h2>Đề xuất dành cho bạn</h2>
        <CourseList courses={recommendedCourses} />
      </section>
      
      <section className="section">
        <h2>Khóa học phổ biến</h2>
        <CourseList courses={popularCourses} />
      </section>
    </div>
  );
};

export default HomePage;