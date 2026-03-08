// cafein_react\src\features\manual\pages\ManualPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//공용 api 도구 임포트 (규칙 준수)
import api from "../../../lib/api";
import { isMockMode } from "../../../lib/supabase";
import "../ManualList.css";

//서버가 없을 때 보여줄 가짜 데이터 (Mock Data)
const MOCK_MENUS = [
  {
    id: 1,
    item_name: "아메리카노 (Mock)",
    price: 4500,
    recipe: "에스프레소 2샷 + 물 300ml",
  },
  {
    id: 2,
    item_name: "카페라떼 (Mock)",
    price: 5000,
    recipe: "에스프레소 2샷 + 우유 250ml",
  },
  {
    id: 3,
    item_name: "바닐라라떼 (Mock)",
    price: 5500,
    recipe: "바닐라 시럽 3펌프 + 우유 + 샷",
  },
];

const ManualList = () => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // plan.md 규칙: isMockMode 체크
    if (isMockMode) {
      setMenus(MOCK_DATA); // 기존에 있던 가짜 데이터 그대로 사용
    } else {
      api
        .get("/api/manual/list")
        .then((res) => setMenus(res.data))
        .catch((err) => {
          console.error("서버 연결 실패, Mock 데이터로 전환:", err);
          setMenus(MOCK_DATA); // 서버 에러 시에도 서비스가 굴러가게 Mock 사용
        });
    }
  }, []);

  return (
    <div className="manual-container">
      <h1 style={{ fontWeight: 900, marginBottom: "20px" }}>☕ 메뉴 매뉴얼</h1>

      {/* 현재 모드 표시 (개발용 안내) */}
      {isMockMode && (
        <div style={{ color: "orange", marginBottom: "10px" }}>
          * 현재 오프라인 모드입니다. (가짜 데이터 표시 중)
        </div>
      )}

      <div className="manual-grid">
        {menus.map((item) => (
          <div
            key={item.id}
            className="manual-card"
            onClick={() => navigate(`/manual/${item.id}`)}
          >
            <div className="menu-name">{item.item_name}</div>
            <div className="menu-price">{item.price?.toLocaleString()}원</div>
            <div className="recipe-preview">
              📍 {item.recipe ? item.recipe.substring(0, 30) : "레시피 준비 중"}
              ...
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/faq")}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          padding: "15px 25px",
          backgroundColor: "#d32f2f",
          color: "white",
          borderRadius: "50px",
          fontSize: "18px",
          fontWeight: "bold",
          border: "none",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          cursor: "pointer",
        }}
      >
        🚨 긴급 상황 대처
      </button>
    </div>
  );
};

export default ManualList;
