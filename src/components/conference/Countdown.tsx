import { useState, useEffect, memo } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type EventStatus = 'upcoming' | 'live' | 'ended';

const TARGET_DATE = new Date('2026-02-11T14:00:00+09:00').getTime();
const EVENT_END_DATE = new Date('2026-02-11T18:00:00+09:00').getTime();

const CountdownUnit = memo(({
  value,
  label,
  isPulsing
}: {
  value: number;
  label: string;
  isPulsing: boolean;
}) => (
  <div className="conf-countdown-unit">
    <span className={`conf-countdown-value ${isPulsing ? 'pulse' : ''}`}>
      {String(value).padStart(2, '0')}
    </span>
    <span className="conf-countdown-label">{label}</span>
  </div>
));

CountdownUnit.displayName = 'CountdownUnit';

export const Countdown = memo(() => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [status, setStatus] = useState<EventStatus>('upcoming');
  const [pulsingUnit, setPulsingUnit] = useState<string | null>(null);

  useEffect(() => {
    const calculateState = () => {
      const now = Date.now();

      if (now >= EVENT_END_DATE) {
        setStatus('ended');
        setTimeLeft(null);
        return null;
      }

      if (now >= TARGET_DATE) {
        setStatus('live');
        setTimeLeft(null);
        return null;
      }

      setStatus('upcoming');
      const diff = TARGET_DATE - now;

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    const newTime = calculateState();
    setTimeLeft(newTime);

    const timer = setInterval(() => {
      const prevTime = timeLeft;
      const newTime = calculateState();

      if (newTime && prevTime) {
        if (newTime.seconds !== prevTime.seconds) {
          setPulsingUnit('seconds');
          setTimeout(() => setPulsingUnit(null), 400);
        }
      }

      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (status === 'ended') {
    return (
      <div className="conf-ended-message">
        행사가 종료되었습니다. 참여해 주셔서 감사합니다.
      </div>
    );
  }

  if (status === 'live') {
    return (
      <div className="conf-live-badge">
        <span>LIVE NOW</span>
      </div>
    );
  }

  if (!timeLeft) return null;

  return (
    <div className="conf-countdown" role="timer" aria-label="행사까지 남은 시간">
      <CountdownUnit
        value={timeLeft.days}
        label="Days"
        isPulsing={pulsingUnit === 'days'}
      />
      <CountdownUnit
        value={timeLeft.hours}
        label="Hours"
        isPulsing={pulsingUnit === 'hours'}
      />
      <CountdownUnit
        value={timeLeft.minutes}
        label="Min"
        isPulsing={pulsingUnit === 'minutes'}
      />
      <CountdownUnit
        value={timeLeft.seconds}
        label="Sec"
        isPulsing={pulsingUnit === 'seconds'}
      />
    </div>
  );
});

Countdown.displayName = 'Countdown';
