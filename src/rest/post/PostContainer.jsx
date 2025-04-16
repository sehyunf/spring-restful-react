import React, { useEffect, useState } from 'react';

const PostContainer = () => {
  const postId = 4;

  const [post, setPost] = useState({});

  // 게시글 1개 조회 후 데이터의 제목과 내용을 화면에 출력하기
  useEffect(() => {
    const getPost = async () => {
      const response = await fetch("http://localhost:10000/posts/api/post/" + postId, {method : 'GET'});      
      const post = await response.json();      
      console.log(post);
      return post;
    }

    getPost().then(setPost).catch(console.error);
  }, [])

  const content = (
    <div>
      <h1>
        제목 : {post.postTitle}
      </h1>
      <h2>
        내용 : {post.postContent}
      </h2>
    </div>
  );

  return (
    <div>
      {content}
    </div>
  );
};

export default PostContainer;