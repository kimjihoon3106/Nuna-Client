# Nuna Frontend

학교 출신 유명인 검색 서비스의 프론트엔드입니다.

## 프로젝트 구조

```
Nuna-Client/
├── index.html          # 메인 페이지
├── results.html        # 결과 페이지
├── static/
│   ├── css/
│   │   └── style.css   # 스타일시트
│   └── js/
│       ├── config.js   # API URL 설정
│       ├── main.js     # 메인 페이지 로직
│       └── results.js  # 결과 페이지 로직
└── README.md
```

## 설정

### 백엔드 API URL 설정

`static/js/config.js` 파일에서 백엔드 URL을 설정하세요:

```javascript
const API_CONFIG = {
    development: {
        baseURL: 'http://localhost:5001'  // 로컬 개발 환경
    },
    production: {
        baseURL: 'https://your-backend-url.com'  // 프로덕션 백엔드 URL
    }
};
```

## 로컬 실행

### 방법 1: Python 서버
```bash
python -m http.server 8000
```
http://localhost:8000 에서 확인

### 방법 2: VS Code Live Server
1. VS Code에서 `index.html` 열기
2. 우클릭 → "Open with Live Server"

### 방법 3: Node.js 서버
```bash
npx serve .
```

## 배포

### Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
cd Nuna-Client
vercel
```

### Netlify 배포
1. Netlify에 로그인
2. "New site from Git" 클릭
3. GitHub 저장소 선택
4. 자동 배포 완료

### GitHub Pages 배포
1. GitHub 저장소 설정 → Pages
2. Source: main 브랜치
3. Save
4. `https://username.github.io/Nuna-Client/` 에서 확인

## 주요 기능

- 🔍 학교 이름 검색
- 📱 반응형 디자인
- 🎨 유명인 프로필 카드 UI
- 🖼️ 배경 이미지 자동 설정
- ⚡ 빠른 검색 결과 표시

## 기술 스택

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Fetch API

## 백엔드 레포지토리

- Backend: [Nuna-Server](https://github.com/kimjihoon3106/Nuna-Server)

## 라이센스

MIT License
