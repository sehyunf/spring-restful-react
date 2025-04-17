import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const DeleteContainer = () => {
  let memberId = 58;

  const [member, setMember] = useState({});

  useEffect(() => {
      const getMember = async () => {
        const response = await fetch(`http://localhost:10000/members/api/member/${memberId}`, {
          method : 'GET'
        });      
        if(!response.ok){
          throw new Error("데이터를 삭제할 수 없습니다.");
        }
        const member = await response.json();
        console.log(member);
        return member;
      }
  
      getMember().then(setMember).catch(console.error);
    }, [])
  
    const {register, handleSubmit, getValues, formState: { isSubmitting, isSubmitted, errors }} = useForm({mode:"onChange"})
    // const navigate = useNavigate();

  return (
    <div>
      <p>{member.memberName}</p>
      <p>{member.memberEmail}</p>
      <button onClick={() => {
        fetch(`http://localhost:10000/members/api/delete/${member.id}`, {
          method : "DELETE"
        })
        alert("bye bye ~");
        window.location.href = "/"
        // navigate("/")
      }}>회원 탈퇴</button>
    </div>
  );
};

export default DeleteContainer;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// // 회원탈퇴
// const DeleteContainer = () => {
//   // const navigate = useNavigate();
//   const id = 65;
  
//   const withdraw = async () => {
//     if(window.confirm("정말로 탈퇴하시겠어요?")){
//       await fetch(`http://localhost:10000/members/api/withdraw/${id}`, {
//         method : "DELETE"
//       })
//       .then((res) => {
//         if(!res.ok) throw new Error("회원 탈퇴 중 알 수 없는 오류 발생")
//           // 페이지 이동
//         // navigate("/")
//         window.location.href = "/"
//       })
//       .catch("알 수 없는 오류")
//     }else {
//       alert("휴 제가 더 잘해볼게요..😥")
//     }
//   }

//   return (
//     <div>
//       <button onClick={withdraw}>회원탈퇴</button>
//     </div>
//   );
// };

// export default DeleteContainer;