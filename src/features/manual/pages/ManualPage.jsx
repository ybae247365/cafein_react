// cafein_react\src\features\manual\pages\ManualPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../ManualList.css"; // 한 단계 위(manual 폴더)에 있는 CSS 불러오기

const ManualList = () => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate(); // 페이지 이동을 위한 함수

  useEffect(() => {
    // 1. .env에 적은 VITE_API_URL을 가져옵니다.
    // 만약 설정이 안 되어 있다면 기본값으로 http://localhost:8001을 씁니다.
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8001";

    // 2. 주소가 잘 만들어졌는지 콘솔로 확인 (나중에 지워도 됩니다)
    console.log("현재 호출 중인 API:", `${apiUrl}/api/manual/list`);

    fetch(`${apiUrl}/api/manual/list`)
      .then((res) => {
        if (!res.ok) throw new Error("서버 응답 에러");
        return res.json();
      })
      .then((data) => setMenus(data))
      .catch((err) => console.error("데이터 로딩 실패:", err));
  }, []);

  // 기존 return 부분을 아래 내용으로 통째로 교체합니다.
  return (
    <div className="manual-container">
      <h1 style={{ fontWeight: 900, marginBottom: "20px" }}>☕ 메뉴 매뉴얼</h1>

      <div className="manual-grid">
        {menus.map((item) => (
          <div
            key={item.id}
            className="manual-card"
            onClick={() => navigate(`/manual/${item.id}`)}
          >
            <div className="menu-name">{item.item_name}</div>
            <div className="menu-price">{item.price.toLocaleString()}원</div>
            <div className="recipe-preview">
              {/* 레시피가 있을 때만 앞부분 살짝 보여주기 */}
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
