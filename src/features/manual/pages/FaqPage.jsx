import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../lib/api";
import { isMockMode } from "../../../lib/supabase";

const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);
  const navigate = useNavigate();

  // 서버 연결 안될 때를 대비한 Mock 데이터
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
    {
      id: 3,
      category: "긴급",
      question: "머신에서 물이 새요",
      answer:
        "즉시 전원을 끄고 수건으로 주변 물기 제거 후 점장님께 보고하세요.",
      is_important: true,
    },
  ];

  useEffect(() => {
    const processFaqs = (data) => {
      // "긴급" 카테고리를 맨 위로 올리는 정렬 로직
      const sorted = [...data].sort((a, b) => {
        if (a.category === "긴급" && b.category !== "긴급") return -1;
        if (a.category !== "긴급" && b.category === "긴급") return 1;
        return 0;
      });
      setFaqs(sorted);
    };

    if (isMockMode) {
      processFaqs(MOCK_FAQS);
    } else {
      api
        .get("/api/manual/faq")
        .then((res) => processFaqs(res.data))
        .catch((err) => {
          console.error("FAQ 로드 실패:", err);
          processFaqs(MOCK_FAQS);
        });
    }
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "8px 16px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          backgroundColor: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ← 뒤로가기
      </button>

      <h1
        style={{
          color: "#d32f2f",
          marginBottom: "30px",
          borderBottom: "2px solid #d32f2f",
          paddingBottom: "10px",
        }}
      >
        🚨 긴급 상황 대처 가이드
      </h1>

      {faqs.map((faq) => {
        // '긴급' 카테고리 여부 확인
        const isUrgent = faq.category === "긴급";

        return (
          <div
            key={faq.id}
            style={{
              borderLeft: isUrgent ? "6px solid #d32f2f" : "6px solid #666",
              backgroundColor: isUrgent ? "#fff5f5" : "#f9f9f9", // 긴급은 연한 붉은 배경
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  backgroundColor: isUrgent ? "#d32f2f" : "#666",
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {faq.category}
              </span>
              {isUrgent && (
                <span
                  style={{
                    color: "#d32f2f",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  ● 즉시조치
                </span>
              )}
            </div>

            <h3
              style={{
                marginTop: "12px",
                color: isUrgent ? "#d32f2f" : "#333", // 긴급만 빨간 글씨
                fontSize: "1.2rem",
              }}
            >
              Q. {faq.question}
            </h3>

            <hr style={{ border: "0.5px solid #eee", margin: "15px 0" }} />

            <p
              style={{
                lineHeight: "1.7",
                color: "#444",
                fontSize: "1rem",
                whiteSpace: "pre-wrap",
              }}
            >
              <strong style={{ color: isUrgent ? "#d32f2f" : "#333" }}>
                A.
              </strong>{" "}
              {/* 2. 문자열 내의 \\n을 실제 개행 문자로 변환 */}
              {faq.answer.split("\\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FaqPage;
