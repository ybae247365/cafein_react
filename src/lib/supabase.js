import { createClient } from "@supabase/supabase-js";

// 1. .env에서 설정값 가져오기
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * 2. isMockMode 판별 (plan.md 규칙)
 * URL이나 키가 하나라도 없으면 '오프라인(Mock) 모드'로 작동
 */
export const isMockMode = !supabaseUrl || !supabaseAnonKey;

// 3. Supabase 클라이언트 초기화 (Mock 모드가 아닐 때만)
export const supabase = isMockMode
  ? null
  : createClient(supabaseUrl, supabaseAnonKey);

// 디버깅을 위해 현재 모드를 콘솔에 출력
if (isMockMode) {
  console.warn(
    "⚠️ Supabase 설정이 없어서 'Mock 모드'로 작동합니다. 실제 DB와 연결되지 않습니다.",
  );
} else {
  console.log("✅ Supabase가 정상적으로 연결되었습니다.");
}
