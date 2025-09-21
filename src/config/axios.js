import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const TOKEN_KEY = "accessToken";
const getAccessToken = () => localStorage.getItem(TOKEN_KEY);
const setAccessToken = (t) =>
  t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY);

export const apiMain = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // ส่ง cookie refresh ทุกครั้ง
});

// ---------- ใส่ Authorization ก่อนยิงทุกคำขอ ----------
apiMain.interceptors.request.use((config) => {
  const at = getAccessToken();
  if (at) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${at}`;
  }
  return config;
});

// ---------- 401 → refresh → rerun ----------
const REFRESH_PATH = "/user/refreshToken";
let refreshPromise = null;

async function doRefresh() {
  const res = await apiMain.post(REFRESH_PATH, {}, { withCredentials: true });
  const newToken = res?.data?.accessToken;
  if (!newToken) throw new Error("No accessToken from refresh");
  setAccessToken(newToken);
  return newToken;
}

apiMain.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.response?.status;
    const original = error.config || {};

    // ไม่จัดการถ้าไม่ใช่ 401, เคยรีทรายแล้ว, หรือเป็น call ไปที่ refresh เอง
    if (
      status !== 401 ||
      original._retry ||
      (original?.url || "").includes(REFRESH_PATH)
    ) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = doRefresh().finally(() => {
          refreshPromise = null;
        });
      }
      const newToken = await refreshPromise;

      original.headers = original.headers || {};
      original.headers.Authorization = `Bearer ${newToken}`;

      return apiMain(original);
    } catch (e) {
      setAccessToken(); // ล้าง access ใน localStorage
      return Promise.reject(e);
    }
  }
);

// สำหรับ public endpoint ที่ไม่ต้องแนบ auth
export const apiPublic = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// (ถ้าต้องใช้ข้างนอก)
export { getAccessToken, setAccessToken };
