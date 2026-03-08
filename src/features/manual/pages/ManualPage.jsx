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
    // 모드에 따른 분기 처리
    if (isMockMode) {
      console.log("⚠️ Mock 모드: 가짜 데이터를 사용합니다.");
      setMenus(MOCK_MENUS);
    } else {
      console.log("🚀 실전 모드: 서버에서 데이터를 가져옵니다.");
      api
        .get("/api/manual/list")
        .then((response) => setMenus(response.data))
        .catch((err) => {
          console.error("데이터 로딩 실패, Mock 데이터로 대체합니다.", err);
          setMenus(MOCK_MENUS); // 서버 에러 시에도 가짜 데이터를 보여주면 안전합니다!
        });
    }

    // Mock 모드일 때는 가짜 데이터 사용
    // fetch 대신 api.get 사용
    // baseURL이 이미 설정되어 있어 뒤쪽 경로만 적음
    api
      .get("/api/manual/list")
      .then((response) => {
        // axios는 데이터가 response.data에 들어있음
        setMenus(response.data);
      })
      .catch((err) => {
        console.error("데이터 로딩 실패:", err);
      });
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
