import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDelete = () => {

  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
      const getPost = async () => {
        const response = await fetch(`http://localhost:10000/posts/api/post/${id}`, {
          method : 'GET'
        });      
        if(!response.ok){
          window.location.href = "/"
          throw new Error("데이터를 삭제할 수 없습니다.");
        }
        const post = await response.json();
        console.log(post);
        return post;
      }
  
      getPost().then(setPost).catch(console.error);
    }, [])

  return (
    <div>
      <p>{post.postTitle}</p>
      <p>{post.postContent}</p>
      <button onClick={() => {
        fetch(`http://localhost:10000/posts/api/post/${id}`, {
          method : "DELETE"
        })
        alert("삭제되었습니다");
        window.location.href = "/"
        // navigate("/")
      }}>해당 게시물 삭제</button>
    </div>
  );
};

export default PostDelete;