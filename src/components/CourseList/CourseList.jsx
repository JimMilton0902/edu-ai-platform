import React, { useState, useEffect } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import CourseDetailModal from '../CourseDetailModal/CourseDetailModal'; // hoặc chỉnh lại đúng path nếu cần


import '../../style.css';

const CourseList = ({ courses, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [selectedCourse, setSelectedCourse] = useState(null);


  useEffect(() => {
    let results = courses;

    // Lọc theo từ khóa
    if (searchQuery.trim() !== '') {
      results = results.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Lọc theo mức giá
    if (priceFilter) {
      results = results.filter(course => {
        if (priceFilter === '<500') return course.price < 500000;
        if (priceFilter === '500-1000') return course.price >= 500000 && course.price <= 1000000;
        if (priceFilter === '>1000') return course.price > 1000000;
        return true;
      });
    }

    setFilteredCourses(results);
  }, [searchQuery, priceFilter, courses]);

  if (isLoading) {
    return (
      <div className="course-list loading">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="course-skeleton" />
        ))}
      </div>
    );
  }

  return (
    <div className="course-list-wrapper">
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Tìm kiếm khóa học..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="">Tất cả mức giá</option>
          <option value="<500">Dưới 500K</option>
          <option value="500-1000">500K - 1 triệu</option>
          <option value=">1000">Trên 1 triệu</option>
        </select>
      </div>

      <div className="course-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course}
              onViewDetail={(course) => setSelectedCourse(course)}
            />
          ))
        ) : (
          <p>Không tìm thấy khóa học phù hợp.</p>
        )}
      </div>

      {/* ✅ Hiển thị modal nếu có khóa học được chọn */}
      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );

};

export default CourseList;
