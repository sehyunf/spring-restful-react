import React from 'react';
import { useForm } from 'react-hook-form';

const LoginContainer = () => {
  
  // useForm
  const {register, handleSubmit, getValues, reset, formState: { isSubmitting, isSubmitted, errors }} = useForm({mode:"onChange"})
    
  return (
    <form onSubmit={handleSubmit(async (data) => {

      await fetch("http://localhost:10000/members/api/login", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
      }).then((res) => {
        console.log(res.body);
      })

    })}>
      <h1>로그인</h1>
      
      <label>
        <p>이메일</p>
        <input 
          type="text" placeholder='이메일 입력하세요'
          {...register("memberEmail", {
            required : true
          })}
        />
      </label>

      <label>
        <p>비밀번호</p>
        <input 
          type="password" placeholder="비밀번호를 입력하세요."
          {...register("memberPassword", {
            required : true
          })}
        />
      </label>
      <div>
        <button disabled={isSubmitting}>로그인</button>
      </div>
    </form>
  );
};

export default LoginContainer;