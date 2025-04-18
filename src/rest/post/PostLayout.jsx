import React from 'react';
import { Outlet } from 'react-router-dom';

const PostLayout = () => {
  
  // 해당 부분에 로그인 처리를 하면 모든 자식에 일괄 적용된다!

  return (
    <div>
      레이아웃
      <Outlet></Outlet>
    </div>
  );
};

export default PostLayout;