# 프로젝트 이름

- MBTI 무료 테스트 프로젝트!

## 프로젝트 개요

- 이 프로젝트는 사용자들이 MBTI 테스트를 무료로 진행하고 결과를 관리할 수 있는 웹 애플리케이션입니다.

## 기술 스택

- React
- json-server(데이터 베이스)
- JWT(인증)
- axios

## 필수 구현 사항

1. 회원가입 / 로그인 / 프로필 관리
2. MBTI 테스트 제공
3. 테스트 결과 계산 및 저장
4. 테스트 결과 관리

## 도전 구현 사항

1. 로그인 유지 기능
2. Props Drilling 개선
3. axios를 이용한 API 호출

# 페이지 별 기능

0. 헤더(모든 페이지 공통)

- 로그인 전: 홈과 로그인 버튼이 있음
- 로그인 후: 홈과 프로필 수정, 테스트 결과 목록, 로그아웃 버튼이 있음

1. Home Page

- 웹 사이트 타이틀 및 서비스 설명 표시
- 테스트 시작 버튼

2. Login Page / Signup Page

- 로그인과 회원가입 기능 구현

3. Profile Page

- 프로필 닉네임 수정 기능

4. Test Page

- MBTI 테스트 문항 20개 제공

5. TestResult Page

- MBTI 테스트 결과 목록 제공

## 프로젝트 구조

```
src/
├── components/
│ ├── Header.js
│ ├── AuthForm.js
│ └── ...
├── pages/
│ ├── Home.js
│ ├── Login.js
│ ├── Signup.js
│ ├── Profile.js
│ ├── Test.js
│ └── TestResult.js
├── api/
│ ├── auth.js
│ └── test.js
├── contexts/
│ └── AuthContext.js
└── App.js
```
