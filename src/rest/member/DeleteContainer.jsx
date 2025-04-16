import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const DeleteContainer = () => {
  const memberId = 48;

  const [member, setMember] = useState({});

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
    

  return (
    <div>
      <p>{member.memberName}</p>
      <p>{member.memberEmail}</p>
      <button onClick={() => {
        fetch(`http://localhost:10000/members/api/delete/${member.id}`, {
          method : "DELETE",
          headers : {
            "Content-Type" : "application/json"
          }
        })
        alert("bye bye ~");
      }}>회원 탈퇴</button>
    </div>
  );
};

export default DeleteContainer;