import React, { useState, useEffect } from 'react';
import MainContents from './MainContents';
// import axios from 'axios';

const MainOptions = () => {
  const [sortBy, setSortBy] = useState('id,DESC');

  const handleSortByLatest = () => {
    setSortBy('id,DESC');
  }

  const handleSortByOldest = () => {
    setSortBy('id,ASC');
  }

  return (
    <div className="main-Options">
      <button onClick={handleSortByLatest}>최신순</button>
      <button onClick={handleSortByOldest}>오래된순</button>

      <MainContents sortBy={sortBy} />
    </div>
  );
}

export default MainOptions