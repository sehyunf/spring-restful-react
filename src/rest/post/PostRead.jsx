import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

const PostRead = () => {
  // 쿼리스트링
  // const [searchParams] = useSearchParams();
  // console.log(searchParams.get("id"));
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch("http://localhost:10000/posts/api/post/" + id, {method : 'GET'});      
      const post = await response.json();      
      console.log(post);
      return post;
    }

    getPost().then(setPost).catch(console.error);
  }, [])
  console.log(post);
  return (
    <div>
      <h1>제목 : {post.postTitle}</h1>
      <h1>내용 : {post.postContent}</h1>
      <h1>게시자 : {post.memberName}</h1>
      <h1>조회수 : {post.postReadCount}</h1>
      <Link to={`/update/${post.id}`}>수정</Link>
      <Link to={`/delete/${post.id}`}>삭제</Link>
    </div>
  );
};

export default PostRead;