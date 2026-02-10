import { useState } from 'react';
import { faqItems } from '../../data/faq';

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(id);
    }
  };

  return (
    <section id="faq" className="conf-section">
      <span className="conf-section-label">FAQ</span>
      <h2 className="conf-section-title">혹시나 넣어놓은 질문</h2>

      <div className="conf-faq-list">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className={`conf-faq-item ${isOpen ? 'is-open' : ''}`}
            >
              <button
                className="conf-faq-question"
                onClick={() => toggleItem(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
              >
                <span className="conf-faq-question-text">{item.question}</span>
                <svg
                  className="conf-faq-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div
                id={`faq-answer-${item.id}`}
                className="conf-faq-answer-wrapper"
              >
                <div className="conf-faq-answer">
                  <p className="conf-faq-answer-content">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
