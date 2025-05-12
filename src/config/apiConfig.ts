// API URL 설정
export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://eum.o-r.kr/api/v1"
    : "http://localhost:8080/api/v1");

console.log("Current API URL:", API_BASE_URL);
console.log("Current NODE_ENV:", process.env.NODE_ENV);

// API 호출을 위한 기본 함수 (인증 토큰 자동 포함)
export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  return fetch(url, {
    ...options,
    headers,
  });
};
