import { createAction, handleActions } from "redux-actions";

// 타입 생성
const SET_USER = "user/SET_USER";
const SET_USER_STATUS = "user/SET_USER_STATUS";


// 여기서 사용되는게 아니기 때문에 export 시킴 => 로그인 성공 시(MemberLogin.jsx) dispatch에서 발생시킴
export const setUser = createAction(SET_USER, (currentUser) => currentUser) 
export const setUserStatus = createAction(SET_USER_STATUS, (isLogin) => isLogin) // true, false에 따라 화면 처리

const userInitialValue = {
  currentUser : {},
  isLogin : false // 이전 경로로 돌아가기 추가하기 (수업 자료 참고)
}

// dispatcher (구분)
const user = handleActions({
  [SET_USER] : (state, action) => ({...state, currentUser : action.payload}), // currentUser에 받은 값 넣기
  [SET_USER_STATUS] : (state, action) => ({...state, isLogin : action.payload}) // isLogin : true로 고정시키면 로그아웃 로직 따로 만들어야 함 => payload로 재사용
}, userInitialValue)

export default user;