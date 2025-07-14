import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const timer = setTimeout(() => {
        setSuggestions([
          `${searchQuery} cơ bản`,
          `${searchQuery} nâng cao`,
          `Khóa học ${searchQuery} online`
        ]);
        setShowSuggestions(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  return (
    <header className="header">
      <Link to="/" className="logo">EduAI</Link>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm khóa học, tài liệu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button">
          <AiOutlineSearch />
        </button>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-item">
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <nav className="user-nav">
        <Link to="/favorites" className="favorites-btn">
          <AiOutlineHeart /> Yêu thích
        </Link>
        <button className="login-btn">Đăng nhập</button>
      </nav>
    </header>
  );
};

export default Header;