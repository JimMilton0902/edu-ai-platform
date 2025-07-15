import React, { useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import CourseDetailModal from '../CourseDetailModal/CourseDetailModal';
import '../../style.css';

const CourseList = ({ courses, isLoading }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

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
      {/* ✅ Đã bỏ thanh tìm kiếm và bộ lọc */}

      <div className="course-list">
        {courses.length > 0 ? (
          courses.map(course => (
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
