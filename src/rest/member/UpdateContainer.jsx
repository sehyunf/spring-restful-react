import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const UpdateContainer = () => {

  // 회원 정보
  const id = 84;
  const [member, setMember] = useState({})
  const [isUpdate, setIsUpdate] = useState(false);

  // useForm
  const {register, handleSubmit, getValues, reset, formState: { isSubmitting, isSubmitted, errors }} = useForm({mode:"onChange"})
  // 이메일 형식을 맞춘 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 소문자, 특수문자, 숫자를 포함한 8자리 이상의 정규식
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  useEffect(() => {
    const getMember = async () => {
      const response = await fetch(`http://localhost:10000/members/api/member/${id}`, {
        method : "GET",
      })
      const user = response.json()
      return user
    }

    getMember().then((member) => {
      const {memberEmail, memberName} = member;
      // // 초기값
      reset({
        memberEmail,
        memberName
      })
      setMember(member)
    }).catch(console.error)

  }, [isUpdate])

  return (
    <form onSubmit={handleSubmit(async (data) => {
      
      const {passwordConfirm, ...others} = data;
      const memberVO = {id, ...others}

      await fetch("http://localhost:10000/members/api/modify", {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(memberVO)
      }).then((res) => {
        if(!res.ok) throw new Error(`member modify response 에러`)
        setIsUpdate(!isUpdate)
      }).catch(console.error)

    })}>
      
      <label>
        <p>이메일</p>
        <input 
          type="text" placeholder='이메일 입력하세요'
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
          type="text" placeholder="비밀번호를 입력하세요."
          {...register("memberName", {
            required : true,
          })}
        />
        {errors && errors?.memberName?.type === "required" && (
          <p>이름을 입력하세요</p>
        )}
      </label>

      <button disabled={isSubmitting}>정보 수정</button>
    </form>
  );
};

export default UpdateContainer;