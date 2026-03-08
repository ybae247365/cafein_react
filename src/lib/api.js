import axios from "axios";

// 1. .env에 설정한 백엔드 주소를 가져옴
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8001";

// 2. 공용 axios 인스턴스 생성
const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// 3. 요청 인터셉터 (로그인 기능구현 시 토큰을 자동으로 실어줌)
api.interceptors.request.use(
  (config) => {
    // 예: const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
