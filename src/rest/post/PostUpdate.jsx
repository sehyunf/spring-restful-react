import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const PostUpdate = () => {
  
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  // useForm
  const {register, handleSubmit, getValues, reset, formState: { isSubmitting, isSubmitted, errors }} = useForm({mode:"onChange"})

  useEffect(() => {
    const getMember = async () => {
      const response = await fetch(`http://localhost:10000/posts/api/post/${id}`, {
        method : "GET",
      })
      const post = response.json()
      return post
    }

    getMember().then((post) => {
      const {postTitle, postContent} = post;
      // // 초기값
      reset({
        postTitle,
        postContent
      })
      setPost(post)
    }).catch(console.error)

  }, [isUpdate])

  return (
    <form onSubmit={handleSubmit(async (data) => {
      
      const postVO = {id, ...data}

      await fetch(`http://localhost:10000/posts/api/post/${id}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(postVO)
      }).then((res) => {
        if(!res.ok) {
          throw new Error(`member modify response 에러`)
        setIsUpdate(!isUpdate)
        } else {
          alert("업데이트 완료!")
          window.location.href = `/read/${id}`
        }
      }).catch(console.error)

    })}>
      
      <label>
        <p>제목</p>
        <input 
          type="text" placeholder='제목을 입력하세요'
          {...register("postTitle", {
            required : true,
          })}
        />
      </label>

      <label>
        <p>내용</p>
        <input 
          type="text" placeholder="내용을 입력하세요."
          {...register("postContent", {
            required : true,
          })}
        />
      </label>

      <button disabled={isSubmitting}>수정</button>
    </form>
  );
};

export default PostUpdate;