import React from 'react';

import { createBrowserRouter } from 'react-router-dom';
import PostsContainer from '../rest/post/PostsContainer';
import PostRead from '../rest/post/PostRead';
import PostUpdate from '../rest/post/PostUpdate';
import PostDelete from '../rest/post/PostDelete';
import LoginContainerSolution from '../rest/member/LoginContainerSolution';
import UpdateContainer from '../rest/member/UpdateContainer';
import DeleteContainer from '../rest/member/DeleteContainer';
import JoinContainer from '../rest/member/JoinContainer';
import Mypage from '../rest/mypage/Mypage';
import PostLayout from '../rest/post/PostLayout';

const router = createBrowserRouter([
  {
    path : "/post",
    element : <PostLayout />,
    children : [
      {
        index : true,
        element : <PostsContainer />
      },
      {
        path : "read",
        element : <PostRead />,
        children : [
          {
            path : ":id",
            element : <PostRead />,
          }
        ]
      },
      {
        path : "update",
        element : <PostUpdate />,
        children : [
          {
            path : ":id",
            element : <PostUpdate />,
          }
        ]
      },
      {
        path : "delete",
        element : <PostDelete />,
        children : [
          {
            path : ":id",
            element : <PostDelete />,
          }
        ]
      }
    ]
  },
  ,
  {
    path : "member/login",
    element : <LoginContainerSolution />,
  },
  {
    path : "member/join",
    element : <JoinContainer />,
  },
  {
    path : "member/update",
    element : <UpdateContainer />,
  },
  {
    path : "member/delete",
    element : <DeleteContainer />,
  },
  {
    path : "/mypage",
    element : <Mypage />,
  }

])

export default router;