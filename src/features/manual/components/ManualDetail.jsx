import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ManualDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [activeTab, setActiveTab] = useState("recipe"); // 'recipe' 또는 'equipment'

  useEffect(() => {
    // 백엔드 API 호출 (아까 만든 상세 보기 엔드포인트)
    fetch(`http://localhost:8001/api/manual/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
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
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)", // 살짝 입체감을 줬어요!
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
