import React from 'react';

import { createBrowserRouter } from 'react-router-dom';
import PostsContainer from '../rest/post/PostsContainer';
import PostRead from '../rest/post/PostRead';
import PostUpdate from '../rest/post/PostUpdate';
import PostDelete from '../rest/post/PostDelete';
import LoginContainer from '../rest/member/LoginContainer';

const router = createBrowserRouter([
  {
    path : "/",
    element : <PostsContainer />
  },
  {
    path : "/read",
    element : <PostRead />,
    children : [
      {
        path : ":id",
        element : <PostRead />,
      }
    ]
  },
  {
    path : "/update",
    element : <PostUpdate />,
    children : [
      {
        path : ":id",
        element : <PostUpdate />,
      }
    ]
  },
  {
    path : "/delete",
    element : <PostDelete />,
    children : [
      {
        path : ":id",
        element : <PostDelete />,
      }
    ]
  },
  {
    path : "/login",
    element : <LoginContainer />,
  }
])

export default router;