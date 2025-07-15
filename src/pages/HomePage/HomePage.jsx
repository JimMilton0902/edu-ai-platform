import React, { useState, useEffect } from 'react';
import CourseList from '../../components/CourseList/CourseList';
import '../../style.css';

const HomePage = () => {
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const filterCourses = (courses) => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesPrice = true;
      const price = Number(course.price);

      if (priceFilter === 'under500') {
        matchesPrice = price < 500000;
      } else if (priceFilter === '500to1000') {
        matchesPrice = price >= 500000 && price <= 1000000;
      } else if (priceFilter === 'above1000') {
        matchesPrice = price > 1000000;
      }

      return matchesSearch && matchesPrice;
    });
  };


  useEffect(() => {
    // Dữ liệu giả lập - thực tế sẽ gọi API
    setRecommendedCourses([
      { 
        id: 1, 
        title: "Lập trình Python AI", 
        instructor: "TS. Nguyễn Văn A", 
        price: 499000, 
        rating: 4.8, 
        thumbnail: "/images.jpg",
        description: "Khóa học Python AI giúp bạn làm quen với lập trình trí tuệ nhân tạo, từ cơ bản đến nâng cao."
      },
      {
        id: 2,
        title: "Thiết kế Web cơ bản với HTML & CSS",
        instructor: "Thầy Lê Văn B",
        price: 1000000,
        rating: 4.5,
        thumbnail: "/html1.jpeg",
        description: "Học cách xây dựng giao diện website đẹp và chuẩn responsive với HTML và CSS."
      },
      {
        id: 4,
        title: "Kỹ năng mềm trong môi trường công sở",
        instructor: "Chị Trần Mai Linh",
        price: 2000000,
        rating: 4.2,
        thumbnail: "/softskill.jpeg",
        description: "Cải thiện kỹ năng giao tiếp, làm việc nhóm và tư duy phản biện trong công việc."
      },
      // Có thể thêm nhiều khóa học khác
    ]);

    setPopularCourses([
      { 
        id: 3, 
        title: "Tiếng Anh giao tiếp", 
        instructor: "Cô Sarah Johnson", 
        price: 599000, 
        rating: 4.9, 
        thumbnail: "/english.jpg",
        description: "Nâng cao kỹ năng nói và phản xạ tiếng Anh với các tình huống thực tế hàng ngày."
      },
      {
        id: 5,
        title: "Khóa học JavaScript nâng cao",
        instructor: "Mr. David Phạm",
        price: 649000,
        rating: 4.7,
        thumbnail: "/JS1.jpeg",
        description: "Tăng tốc kỹ năng lập trình JavaScript qua các dự án và kỹ thuật chuyên sâu."
      },
      {
        id: 6,
        title: "Marketing số từ A đến Z",
        instructor: "Nguyễn Hoàng Minh",
        price: 729000,
        rating: 4.6,
        thumbnail: "/marketing.png",
        description: "Tìm hiểu chiến lược Digital Marketing hiện đại: SEO, quảng cáo, nội dung và hơn thế nữa."
      },
      // Các khóa học khác nếu có
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

        <div className="filter-bar">
          <input 
            type="text"
            placeholder="Tìm kiếm theo tên khóa học"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
            <option value="">Tất cả giá</option>
            <option value="under500">Dưới 500K</option>
            <option value="500to1000">500K – 1 triệu</option>
            <option value="above1000">Trên 1 triệu</option>
          </select>
        </div>
      
      <section className="section">
        <h2>Đề xuất dành cho bạn</h2>
        <CourseList courses={filterCourses(recommendedCourses)} />
      </section>
      
      <section className="section">
        <h2>Khóa học phổ biến</h2>
        <CourseList courses={popularCourses} />
      </section>
    </div>
  );
};

export default HomePage;