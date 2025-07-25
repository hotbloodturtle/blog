# 개인 블로그 PRD (Product Requirements Document)

## 프로젝트 개요

### 목적

- 개인 생각 정리 및 웹앱 개발 기술 지식 공유
- SEO 최적화를 통한 검색 엔진 노출
- 마크다운 기반 콘텐츠 관리 시스템 구축

### 프로젝트 범위

- 정적 사이트 생성기를 활용한 개인 블로그 웹사이트
- Git 기반 콘텐츠 배포 워크플로우
- 반응형 웹 디자인 및 성능 최적화

## 기술 스택 상세

### 1. Frontend Framework: Next.js 15 (App Router)

**선택 이유:**

- **향상된 성능**: Turbopack 안정화로 더 빠른 개발 서버 및 빌드
- **React 19 지원**: 최신 React 기능 및 Concurrent Features 활용
- **개선된 캐싱**: 더 스마트한 캐싱 전략으로 성능 최적화
- **향상된 개발 경험**: 더 나은 에러 메시지와 디버깅 도구
- **Partial Prerendering**: 정적/동적 콘텐츠의 하이브리드 렌더링

**주요 기능:**

- **Turbopack 기본 활성화**: 더 빠른 번들링 및 HMR
- **향상된 App Router**: 안정화된 파일 기반 라우팅
- **React Server Components**: 서버 컴포넌트로 성능 최적화
- **개선된 메타데이터 API**: 더 유연한 SEO 설정
- **Form Actions**: 서버 액션을 통한 폼 처리 개선

### 2. Styling: Tailwind CSS

**선택 이유:**

- **유틸리티 퍼스트**: 빠른 개발과 일관된 디자인 시스템
- **반응형 디자인**: 모바일 우선 반응형 웹 구현
- **커스터마이징**: 블로그에 특화된 타이포그래피 설정 가능
- **번들 최적화**: 사용되지 않는 CSS 자동 제거

**주요 활용:**

- `@tailwindcss/typography`: 마크다운 콘텐츠 스타일링
- 커스텀 컴포넌트 스타일링
- 다크모드 지원 (선택적)

### 3. Markdown Processing: gray-matter + react-markdown

**gray-matter:**

- **Front Matter 파싱**: YAML 메타데이터 추출 (제목, 날짜, 태그 등)
- **콘텐츠 분리**: 메타데이터와 마크다운 콘텐츠 분리 처리

**react-markdown:**

- **마크다운 렌더링**: 마크다운을 React 컴포넌트로 변환
- **확장성**: 플러그인을 통한 기능 확장 가능
- **커스터마이징**: 특정 HTML 요소를 커스텀 React 컴포넌트로 렌더링

**지원 기능:**

- GitHub Flavored Markdown (GFM)
- 테이블, 체크리스트, 각주
- 커스텀 컴포넌트 삽입

### 4. Code Highlighting: prism-react-renderer

**선택 이유:**

- **React 컴포넌트**: React 생태계와 완벽 호환
- **테마 지원**: 다양한 색상 테마 제공
- **언어 지원**: 주요 프로그래밍 언어 하이라이팅
- **성능**: 클라이언트 사이드 하이라이팅으로 빠른 로딩

**주요 기능:**

- 문법 하이라이팅
- 줄 번호 표시
- 코드 복사 기능
- 언어별 아이콘 표시

### 5. 배포: Vercel

**선택 이유:**

- **Next.js 최적화**: Next.js 제작사의 플랫폼으로 완벽 호환
- **Git 연동**: GitHub/GitLab 연동으로 자동 배포
- **Edge Network**: 전 세계 CDN으로 빠른 로딩 속도
- **무료 계층**: 개인 프로젝트에 충분한 무료 사용량

**배포 워크플로우:**

1. 로컬에서 마크다운 파일 작성
2. Git 저장소에 push
3. Vercel 자동 빌드 및 배포
4. 실시간 사이트 업데이트

### 6. SEO: Next.js 내장 메타데이터 API

**주요 기능:**

- **메타데이터 관리**: `metadata` 객체를 통한 SEO 태그 설정
- **동적 메타데이터**: 블로그 포스트별 개별 SEO 설정
- **Open Graph**: 소셜 미디어 공유 최적화
- **사이트맵**: 자동 사이트맵 생성

## 아키텍처 설계

### 디렉토리 구조

```
blog/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 전역 레이아웃
│   │   ├── page.tsx            # 메인 페이지
│   │   ├── blog/
│   │   │   ├── page.tsx        # 블로그 목록
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # 개별 포스트
│   │   └── globals.css         # 전역 스타일
│   ├── components/
│   │   ├── BlogCard.tsx        # 블로그 카드 컴포넌트
│   │   ├── CodeBlock.tsx       # 코드 블록 컴포넌트
│   │   └── Header.tsx          # 헤더 컴포넌트
│   ├── lib/
│   │   └── markdown.ts         # 마크다운 처리 유틸리티
│   └── types/
│       └── blog.ts             # 타입 정의
├── posts/                      # 마크다운 포스트
│   ├── 2024-01-01-first-post.md
│   └── 2024-01-02-nextjs-tutorial.md
└── public/                     # 정적 자산
    └── images/
```

### 데이터 플로우

1. 빌드 타임에 `posts/` 디렉토리의 마크다운 파일 스캔
2. `gray-matter`로 Front Matter와 콘텐츠 파싱
3. 메타데이터를 기반으로 블로그 목록 생성
4. `react-markdown`으로 마크다운 콘텐츠 렌더링
5. `prism-react-renderer`로 코드 블록 하이라이팅

## 기능 요구사항

### 핵심 기능

- **블로그 포스트 목록**: 최신 순으로 정렬된 포스트 목록
- **개별 포스트 페이지**: 마크다운 렌더링 및 메타데이터 표시
- **태그 시스템**: 포스트 분류 및 필터링
- **검색 기능**: 제목 및 내용 기반 검색
- **반응형 디자인**: 모바일/태블릿/데스크톱 지원

### SEO 최적화

- **메타 태그**: 각 페이지별 title, description 설정
- **구조화 데이터**: JSON-LD 스키마 마크업
- **사이트맵**: XML 사이트맵 자동 생성
- **RSS 피드**: 블로그 구독을 위한 RSS 제공

### 성능 최적화

- **이미지 최적화**: Next.js Image 컴포넌트 활용
- **코드 스플리팅**: 페이지별 번들 분리
- **정적 생성**: SSG를 통한 빠른 로딩
- **CDN 활용**: Vercel Edge Network 활용

### 개발 워크플로우

### 1. 로컬 개발

```bash
# 의존성 설치
npm install

# Turbopack을 사용한 개발 서버 실행 (Next.js 15 기본)
npm run dev

# 프로덕션 빌드 테스트
npm run build
```

### 2. 콘텐츠 작성

```markdown
---
title: "Next.js로 블로그 만들기"
date: "2024-01-15"
tags: ["Next.js", "React", "블로그"]
description: "Next.js를 사용해서 개인 블로그를 만드는 방법"
---

# Next.js로 블로그 만들기

내용...
```

### 3. 배포

1. GitHub 저장소에 커밋 및 푸시
2. Vercel 자동 빌드 트리거
3. 배포 완료 및 사이트 업데이트

### Next.js 15 추가 장점

**성능 향상:**

- **Turbopack**: Webpack 대비 최대 10배 빠른 번들링
- **향상된 HMR**: 더 빠른 핫 모듈 교체로 개발 생산성 향상
- **최적화된 이미지**: 개선된 Image 컴포넌트로 더 나은 성능

**개발 경험:**

- **향상된 에러 처리**: 더 명확한 에러 메시지와 스택 트레이스
- **개선된 TypeScript 지원**: 더 나은 타입 추론과 에러 감지
- **React 19 기능**: 새로운 훅과 Concurrent Features 활용

**배포 최적화:**

- **Partial Prerendering**: 정적 부분과 동적 부분의 효율적 결합
- **향상된 캐싱**: 더 스마트한 캐싱 전략으로 성능 최적화
- **서버 컴포넌트**: 번들 크기 감소 및 초기 로딩 시간 단축

### 단기 확장

- **댓글 시스템**: Giscus 또는 Utterances 연동
- **다크모드**: 테마 전환 기능
- **목차**: 포스트 내 목차 자동 생성

### 장기 확장

- **카테고리 시스템**: 계층적 분류 시스템
- **관련 포스트**: 유사한 주제의 포스트 추천
- **Analytics**: Google Analytics 연동
- **Newsletter**: 이메일 구독 시스템

## 성공 지표

- **페이지 로딩 속도**: Core Web Vitals 최적화
- **SEO 점수**: 90점 이상 목표
- **검색 엔진 인덱싱**: 주요 검색 엔진에서 노출
- **사용자 경험**: 모바일 친화적 점수 최적화
