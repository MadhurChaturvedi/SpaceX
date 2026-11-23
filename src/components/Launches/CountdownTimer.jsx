import { useState, useEffect } from 'react'
import './Launches.css'

export default function CountdownTimer({ targetHours }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  })

  useEffect(() => {
    // Calculate target timestamp based on targetHours from initial page visit
    const targetTime = Date.now() + targetHours * 60 * 60 * 1000

    const updateTimer = () => {
      const difference = targetTime - Date.now()

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [targetHours])

  const formatDigit = (num) => String(num).padStart(2, '0')

  return (
    <div className="countdown-card" aria-label="Launch Countdown Timer">
      <div className="countdown-header">
        <div className="countdown-pulse-tag">
          <span className="pulse-indicator" />
          <span>T-MINUS COUNTDOWN</span>
        </div>
        <span className="countdown-timezone">UTC CLOCK SYNCHRONIZED</span>
      </div>

      <div className="countdown-digits-grid">
        <div className="digit-column">
          <span className="digit-number">{formatDigit(timeLeft.days)}</span>
          <span className="digit-label">DAYS</span>
        </div>
        <span className="digit-separator">:</span>
        <div className="digit-column">
          <span className="digit-number">{formatDigit(timeLeft.hours)}</span>
          <span className="digit-label">HOURS</span>
        </div>
        <span className="digit-separator">:</span>
        <div className="digit-column">
          <span className="digit-number">{formatDigit(timeLeft.minutes)}</span>
          <span className="digit-label">MINUTES</span>
        </div>
        <span className="digit-separator">:</span>
        <div className="digit-column">
          <span className="digit-number digit-seconds">{formatDigit(timeLeft.seconds)}</span>
          <span className="digit-label">SECONDS</span>
        </div>
      </div>
    </div>
  )
}
