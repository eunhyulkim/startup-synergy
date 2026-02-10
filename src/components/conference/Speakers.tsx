import { useState } from 'react';
import { parts, getSpeakersByPart, type Speaker } from '../../data/speakers';
import { SpeakerModal } from './SpeakerModal';

export function Speakers() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpeakerClick = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23e8e8e8" width="100" height="100"/%3E%3Ctext x="50" y="55" text-anchor="middle" fill="%23999" font-size="40"%3E?%3C/text%3E%3C/svg%3E';
  };

  return (
    <section id="speakers" className="conf-section conf-speakers">
      <span className="conf-section-label">Speakers</span>
      <h2 className="conf-section-title">스피커</h2>

      {parts.map((part) => {
        const partSpeakers = getSpeakersByPart(part.id);

        return (
          <div key={part.id} className="conf-part">
            <div className="conf-part-header">
              <div className="conf-part-number">0{part.id}</div>
              <h3 className="conf-part-title">{part.titleEn}</h3>
              <p className="conf-part-description">{part.description}</p>
            </div>

            <div className="conf-speakers-grid">
              {partSpeakers.map((speaker) => (
                <button
                  key={speaker.id}
                  className="conf-speaker-card"
                  onClick={() => handleSpeakerClick(speaker)}
                  aria-label={`${speaker.name} 상세 보기`}
                  type="button"
                >
                  <div className="conf-speaker-image-wrapper">
                    <img
                      src={speaker.image}
                      alt={`${speaker.name} 프로필`}
                      className="conf-speaker-image"
                      loading="lazy"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="conf-speaker-info">
                    <span className="conf-speaker-name">{speaker.name}</span>
                    {speaker.title && (
                      <span className="conf-speaker-title">{speaker.title}</span>
                    )}
                  </div>
                  {speaker.participants && (
                    <div className="conf-speaker-participants">
                      {speaker.participants.join(', ')}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <SpeakerModal
        speaker={selectedSpeaker}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
