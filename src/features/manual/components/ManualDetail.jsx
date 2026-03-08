import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 1. 공용 axios 인스턴스 불러오기 (plan.md 규칙)
import api from "../../../lib/api";

const ManualDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [activeTab, setActiveTab] = useState("recipe");

  useEffect(() => {
    // 2. fetch 대신 api(axios) 사용
    // api.get()은 VITE_API_BASE_URL이 기본으로 잡혀 있어 경로만 적음
    api
      .get(`/api/manual/${id}`)
      .then((response) => {
        // axios는 데이터가 response.data 안에 들어있음
        setItem(response.data);
      })
      .catch((err) => console.error("상세 데이터 로드 실패:", err));
  }, [id]);

  if (!item) return <div style={{ padding: "20px" }}>불러오는 중...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "white",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)", // 입체감
        }}
      >
        ← 목록으로 돌아가기
      </button>

      <h1>{item.item_name} 상세 매뉴얼</h1>

      {/* 탭 버튼 영역 */}
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid #ddd",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setActiveTab("recipe")}
          style={{
            flex: 1,
            padding: "10px",
            background: activeTab === "recipe" ? "#6F4E37" : "white",
            color: activeTab === "recipe" ? "white" : "black",
            border: "none",
            cursor: "pointer",
          }}
        >
          📖 레시피
        </button>
        <button
          onClick={() => setActiveTab("equipment")}
          style={{
            flex: 1,
            padding: "10px",
            background: activeTab === "equipment" ? "#6F4E37" : "white",
            color: activeTab === "equipment" ? "white" : "black",
            border: "none",
            cursor: "pointer",
          }}
        >
          ⚙️ 장비 작동법
        </button>
      </div>

      {/* 탭 내용 영역 */}
      <div
        style={{
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "10px",
          minHeight: "200px",
          whiteSpace: "pre-wrap",
        }}
      >
        {activeTab === "recipe" ? (
          <div>
            <h3>📝 제조법</h3>
            <div
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "1.2rem",
                lineHeight: "1.8",
                color: "#333",
                marginTop: "15px",
              }}
            >
              {item.recipe || "등록된 레시피가 없습니다."}
            </div>
          </div>
        ) : (
          <div>
            <h3>🔧 사용 장비 가이드</h3>
            <p>{item.equipment || "등록된 장비 가이드가 없습니다."}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualDetail;
