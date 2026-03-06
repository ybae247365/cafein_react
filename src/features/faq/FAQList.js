import React, { useEffect, useState } from "react";

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/api/faq/list")
      .then((res) => res.json())
      .then((data) => setFaqs(data))
      .catch((err) => console.error("FAQ 로드 실패:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#d35400" }}>🚨 긴급 상황 및 업무 FAQ</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {faqs.map((faq) => (
          <div
            key={faq.id}
            style={{
              padding: "15px",
              border: faq.is_important ? "2px solid #e74c3c" : "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: faq.is_important ? "#fff5f5" : "#fff",
            }}
          >
            <span
              style={{
                backgroundColor: faq.is_important ? "#e74c3c" : "#95a5a6",
                color: "white",
                padding: "2px 8px",
                borderRadius: "5px",
                fontSize: "12px",
              }}
            >
              {faq.category}
            </span>
            <h3 style={{ margin: "10px 0" }}>{faq.question}</h3>
            <p style={{ color: "#555", lineHeight: "1.5" }}>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQList;
