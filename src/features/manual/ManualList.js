import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Link 대신 navigate를 쓰기 위해 추가
import "./ManualList.css"; // 아까 만든 CSS 파일을 꼭 임포트하세요!

const ManualList = () => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate(); // 페이지 이동을 위한 함수

  useEffect(() => {
    fetch("http://localhost:8001/api/manual/list")
      .then((res) => res.json())
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
    </div>
  );
};

export default ManualList;
