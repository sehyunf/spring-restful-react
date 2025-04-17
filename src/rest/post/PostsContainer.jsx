import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PostsContainer = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("http://localhost:10000/posts/api/posts");
      const posts = await response.json();
      console.log(posts);
      
      return posts;
    }

    getPosts().then(setPosts,console.log).catch(console.error);
  }, [])

  const postLists = posts.map(({id, postTitle, postContent}, i) => (
    <li key={i}>
      <Link to={`/read/${id}`} >
        {postTitle}
      </Link>
    </li>
  ))

  return (
    <div>
      {postLists}
    </div>
  );
};

export default PostsContainer;