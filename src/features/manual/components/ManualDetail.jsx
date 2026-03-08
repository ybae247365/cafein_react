import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../lib/api";
import { isMockMode } from "../../../lib/supabase";

// 테스트 및 에러 발생 시를 위한 Mock 데이터
const MOCK_DATA = [
  {
    id: 1,
    item_name: "아메리카노 (Mock)",
    recipe:
      "1. 컵에 얼음 가득 채우기\n2. 찬물 250ml 붓기\n3. 에스프레소 2샷 추출 후 위에 붓기",
    equipment:
      "에스프레소 머신: 포터필터 물기 제거 필수\n그라인더: 원두량 18g 확인",
  },
  {
    id: 2,
    item_name: "카페라떼 (Mock)",
    recipe:
      "1. 우유 200ml 스팀 (벨벳 거품)\n2. 에스프레소 2샷 추출\n3. 스팀 우유를 에스프레소에 천천히 붓기",
    equipment: "스팀 완드: 사용 직후 반드시 젖은 행주로 닦고 스팀 분사 필수",
  },
];

const ManualDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [activeTab, setActiveTab] = useState("recipe");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const numericId = parseInt(id);

    if (isMockMode) {
      const mockItem = MOCK_DATA.find((m) => m.id === numericId);
      setItem(mockItem);
      setLoading(false);
    } else {
      // .env의 VITE_API_BASE_URL(8001포트)을 사용하는 api 인스턴스 호출
      api
        .get(`/api/manual/${numericId}`)
        .then((res) => {
          setItem(res.data);
        })
        .catch((err) => {
          console.error("데이터 로드 실패, Mock 데이터로 전환:", err);
          const mockItem = MOCK_DATA.find((m) => m.id === numericId);
          setItem(mockItem);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading)
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        매뉴얼 로딩 중...
      </div>
    );
  if (!item)
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        데이터를 찾을 수 없습니다.
      </div>
    );

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      {/* 상단 네비게이션 */}
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "10px 18px",
          marginBottom: "20px",
          borderRadius: "30px",
          border: "1px solid #ddd",
          backgroundColor: "#fff",
          cursor: "pointer",
          fontSize: "0.9rem",
          fontWeight: "bold",
          boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        }}
      >
        ← 목록으로
      </button>

      <h1 style={{ fontSize: "1.8rem", marginBottom: "25px", color: "#333" }}>
        {item.item_name}{" "}
        <span style={{ fontSize: "1rem", color: "#888", fontWeight: "normal" }}>
          상세 매뉴얼
        </span>
      </h1>

      {/* 탭 메뉴 영역 */}
      <div
        style={{
          display: "flex",
          backgroundColor: "#f1f1f1",
          borderRadius: "12px",
          padding: "5px",
          marginBottom: "25px",
        }}
      >
        <button
          onClick={() => setActiveTab("recipe")}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            background: activeTab === "recipe" ? "#6F4E37" : "transparent",
            color: activeTab === "recipe" ? "white" : "#666",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.2s ease",
          }}
        >
          📖 제조 레시피
        </button>
        <button
          onClick={() => setActiveTab("equipment")}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            background: activeTab === "equipment" ? "#6F4E37" : "transparent",
            color: activeTab === "equipment" ? "white" : "#666",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.2s ease",
          }}
        >
          ⚙️ 장비 가이드
        </button>
      </div>

      {/* 본문 내용 영역 */}
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          minHeight: "250px",
          borderLeft: `6px solid #6F4E37`,
        }}
      >
        {activeTab === "recipe" ? (
          <div>
            <h3 style={{ margin: "0 0 15px 0", color: "#6F4E37" }}>
              📝 레시피 단계
            </h3>
            <div
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "1.15rem",
                lineHeight: "1.8",
                color: "#444",
              }}
            >
              {item.recipe || "등록된 레시피 정보가 없습니다."}
            </div>
          </div>
        ) : (
          <div>
            <h3 style={{ margin: "0 0 15px 0", color: "#6F4E37" }}>
              🔧 장비 및 주의사항
            </h3>
            <div
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "1.1rem",
                lineHeight: "1.7",
                color: "#444",
              }}
            >
              {item.equipment || "등록된 장비 작동 가이드가 없습니다."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualDetail;
