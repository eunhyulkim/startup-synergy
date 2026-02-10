import { timetable } from '../../data/timetable'
import { speakerMap } from '../../data/speakers'

export function Timetable() {
  return (
    <section id="timetable" className="conf-section">
      <span className="conf-section-label">Timetable</span>
      <h2 className="conf-section-title">프로그램</h2>

      <div className="conf-timetable-list">
        {timetable.map((entry) => {
          const isBreak = entry.type === 'break'
          const speakers = entry.speakerIds
            ?.map((id) => speakerMap.get(id)?.name)
            .filter(Boolean)
            .join(', ')

          return (
            <div
              key={entry.id}
              className={`conf-timetable-item ${isBreak ? 'is-break' : ''}`}
            >
              <span className="conf-timetable-time">{entry.startTime}</span>
              <div className="conf-timetable-content">
                <span className="conf-timetable-title">{entry.title}</span>
                {entry.description && (
                  <span className="conf-timetable-description">
                    {entry.description}
                  </span>
                )}
                {speakers && (
                  <span className="conf-timetable-speakers">{speakers}</span>
                )}
              </div>
              <span className="conf-timetable-duration">
                {entry.duration}min
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
