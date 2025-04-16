import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// react-hook-form
const UpdateContainer = () => {

  const [member, setMember] = useState({});

  const memberId = 49;

  useEffect(() => {
    const getMember = async () => {
      const response = await fetch(`http://localhost:10000/members/api/member/${memberId}`, {
        method : 'GET'
      });      
      const member = await response.json();      
      console.log(member);
      return member;
    }

    getMember().then(setMember).catch(console.error);
  }, [])

  const {register, handleSubmit, getValues, formState: { isSubmitting, isSubmitted, errors }} = useForm({mode:"onChange"})
  // 이메일 형식을 맞춘 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 소문자, 특수문자, 숫자를 포함한 8자리 이상의 정규식
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  return (
    <form onSubmit={handleSubmit(async (data) => {

      
      console.log(data)
      const {hobbies, passwordConfirm, ...memberVO} = data;
      // const {memberEmail, memberName, memberPassword } = data;
      // const memberVO = {
      //   memberEmail,
      //   memberName,
      //   memberPassword
      // }
      console.log(memberVO)

      fetch(`http://localhost:10000/members/api/update/${member.id}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(memberVO)
      })


    })}>
      <input type='hidden' value={member.id}></input>
      
      <label>
        <p>이메일</p>
        <input 
          type="text" placeholder={member.memberEmail}
          {...register("memberEmail", {
            required : true,
            pattern : {
              value : emailRegex
            }
          })}
        />
        {errors && errors?.memberEmail?.type === "required" && (
          <p>이메일을 입력하세요</p>
        )}
        {errors && errors?.memberEmail?.type === "pattern" && (
          <p>이메일 양식을 지켜주세요</p>
        )}
      </label>

      <label>
        <p>비밀번호</p>
        <input 
          type="password" placeholder="비밀번호를 입력하세요."
          {...register("memberPassword", {
            required : true,
            pattern : {
              value : passwordRegex
            }
          })}
        />
        {errors && errors?.memberPassword?.type === "required" && (
          <p>비밀번호를 입력하세요</p>
        )}
        {errors && errors?.memberPassword?.type === "pattern" && (
          <p>소문자, 숫자, 특수문자(!@#)을 포함한 8자리 이상의 비밀번호를 사용하세요.</p>
        )}
      </label>

      <label>
        <p>비밀번호 확인</p>
        <input 
          type="password" placeholder="비밀번호를 입력하세요."
          {...register("passwordConfirm", {
            required : true,
            validate : {
              matchPassword : (passwordConfirm) => {
                const { memberPassword } = getValues();
                console.log(memberPassword === passwordConfirm)
                return memberPassword === passwordConfirm
              }
            }
          })}
        />
        {errors && errors?.passwordConfirm === "required" && (
          <p>비밀번호가 일치하지 않습니다</p>
        )}
      </label>

      <label>
        <p>이름</p>
        <input 
          type="text" placeholder={member.memberName}
          {...register("memberName", {
            required : true,
          })}
        />
        {errors && errors?.memberName?.type === "required" && (
          <p>이름을 입력하세요</p>
        )}
      </label>

      {/* 체크박스 */}
      {/* <p>취미</p>
      <label>
        <span>축구</span><input name="hobby" type="checkbox" {...register("hobbies")}/>
      </label>
      <label>
        <span>야구</span><input name="hobby" type="checkbox" {...register("hobbies")}/>
      </label> */}

      <button disabled={isSubmitting} onClick={() => {
        alert("수정완료")
      }}>수정하기</button>
    </form>
  );
};

export default UpdateContainer;