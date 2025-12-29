// API 설정
const API_CONFIG = {
    // 개발 환경: 로컬 Flask 서버
    development: {
        baseURL: 'http://localhost:5001'
    },
    // 프로덕션 환경: ngrok 터널링된 로컬 백엔드
    production: {
        baseURL: 'https://reagan-unmodelled-tucker.ngrok-free.dev'
    }
};

// 현재 환경 감지
function getCurrentEnvironment() {
    // localhost나 127.0.0.1이면 개발 환경
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'development';
    }
    // 그 외에는 프로덕션 환경
    return 'production';
}

// 현재 환경의 설정 가져오기
const currentEnv = getCurrentEnvironment();
const API_BASE_URL = API_CONFIG[currentEnv].baseURL;

console.log(`현재 환경: ${currentEnv}, API URL: ${API_BASE_URL}`);
