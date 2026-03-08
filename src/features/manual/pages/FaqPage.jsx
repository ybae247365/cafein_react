import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../lib/api";
import { isMockMode } from "../../../lib/supabase";

const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);
  const navigate = useNavigate();

  // 서버 연결 안될 때를 대비한 Mock 데이터 (SQL에 넣으신 내용과 동일)
  const MOCK_FAQS = [
    {
      id: 1,
      category: "긴급",
      question: "포스기 전원이 안 들어와요",
      answer: "본체 하단의 검은색 스위치를 껐다 켜보세요.",
      is_important: true,
    },
    {
      id: 2,
      category: "업무지식",
      question: "원두 그라인더 청소 주기",
      answer: "매일 마감 직전에 호퍼를 분리하여 닦아주세요.",
      is_important: false,
    },
  ];

  useEffect(() => {
    if (isMockMode) {
      setFaqs(MOCK_FAQS);
    } else {
      // 백엔드 API 호출 (main.py에 해당 엔드포인트가 있어야 함)
      api
        .get("/api/faq/list")
        .then((res) => setFaqs(res.data))
        .catch((err) => {
          console.error("FAQ 로드 실패:", err);
          setFaqs(MOCK_FAQS);
        });
    }
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: "20px", cursor: "pointer" }}
      >
        ← 뒤로가기
      </button>

      <h1 style={{ color: "#d32f2f", marginBottom: "30px" }}>
        🚨 긴급 상황 대처 가이드
      </h1>

      {faqs.map((faq) => (
        <div
          key={faq.id}
          style={{
            borderLeft: faq.is_important
              ? "5px solid #d32f2f"
              : "5px solid #ccc",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "4px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <span
            style={{
              backgroundColor: faq.is_important ? "#d32f2f" : "#666",
              color: "white",
              padding: "3px 8px",
              borderRadius: "3px",
              fontSize: "12px",
            }}
          >
            {faq.category}
          </span>
          <h3 style={{ marginTop: "10px" }}>Q. {faq.question}</h3>
          <hr style={{ border: "0.5px solid #eee", margin: "15px 0" }} />
          <p style={{ lineHeight: "1.6", color: "#333" }}>
            <strong>A.</strong> {faq.answer}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FaqPage;
