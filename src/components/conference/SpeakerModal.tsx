import { useEffect, useRef } from 'react';
import type { Speaker } from '../../data/speakers';

interface SpeakerModalProps {
  speaker: Speaker | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SpeakerModal({ speaker, isOpen, onClose }: SpeakerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23e8e8e8" width="100" height="100"/%3E%3Ctext x="50" y="55" text-anchor="middle" fill="%23999" font-size="40"%3E?%3C/text%3E%3C/svg%3E';
  };

  if (!speaker) return null;

  return (
    <div
      className={`conf-modal-overlay ${isOpen ? 'is-open' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="conf-modal" ref={modalRef}>
        <div className="conf-modal-header">
          <button
            ref={closeButtonRef}
            className="conf-modal-close"
            onClick={onClose}
            aria-label="닫기"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="conf-modal-content">
          <img
            src={speaker.image}
            alt={`${speaker.name}`}
            className="conf-modal-image"
            onError={handleImageError}
          />
          {(speaker.title || speaker.bio) && (
            <div className="conf-modal-info">
              <h2 id="modal-title" className="conf-modal-name">{speaker.name}</h2>
              {speaker.title && (
                <p className="conf-modal-title">
                  {speaker.title}
                  {speaker.company && ` @ ${speaker.company}`}
                </p>
              )}
              {speaker.bio && (
                <p className="conf-modal-bio">{speaker.bio}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
