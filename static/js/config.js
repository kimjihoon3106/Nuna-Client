// API 설정
const API_CONFIG = {
    // 개발 환경: 로컬 Flask 서버
    development: {
        baseURL: 'http://localhost:5001'
    },
    // 프로덕션 환경: 배포된 백엔드 서버
    production: {
        baseURL: 'https://port-0-nuna-server-mjqch87za573b2ae.sel3.cloudtype.app'
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
