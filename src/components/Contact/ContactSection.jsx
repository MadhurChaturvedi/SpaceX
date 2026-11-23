import { useState } from 'react'
import './Contact.css'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    inquiryType: 'commercial-launch',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState('')

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (minimum 2 characters).'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid corporate or official email address.'
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 4) {
      newErrors.subject = 'Subject line must be at least 4 characters long.'
    }

    if (!formData.message.trim() || formData.message.trim().length < 15) {
      newErrors.message = 'Please provide details for your inquiry (minimum 15 characters).'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      const randomTicket = `SPX-TX-${Math.floor(100000 + Math.random() * 900000)}`
      setTicketId(randomTicket)
    }, 1200)
  }

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      inquiryType: 'commercial-launch',
      subject: '',
      message: '',
    })
    setIsSubmitted(false)
    setErrors({})
  }

  return (
    <section id="contact" className="contact-section" aria-label="SpaceX Communications & Contact">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <p className="contact-eyebrow">GLOBAL COMMUNICATIONS & INQUIRIES</p>
          <h2 className="contact-title">CONTACT SPACEX</h2>
          <p className="contact-lead">
            For commercial launch bookings, Starlink enterprise solutions, payload rideshare,
            or media inquiries, contact our aerospace flight operations team.
          </p>
        </div>

        <div className="contact-grid">
          {/* Form Card */}
          <div className="form-card">
            {isSubmitted ? (
              <div className="success-state" role="status">
                <span className="success-pulse" />
                <h3 className="success-title">TRANSMISSION CONFIRMED</h3>
                <p className="success-ticket">
                  REFERENCE MANIFEST ID: <strong className="ticket-code">{ticketId}</strong>
                </p>
                <p className="success-desc">
                  Thank you, <strong>{formData.fullName}</strong>. Your inquiry has been routed
                  to the SpaceX Commercial Flight Operations and Communications directorate.
                  An operations lead will review your transmission within 24 business hours.
                </p>
                <button
                  type="button"
                  className="reset-form-btn"
                  onClick={handleReset}
                >
                  TRANSMIT ANOTHER MESSAGE &rarr;
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="contact-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="fullName" className="field-label">
                      FULL NAME <span className="req">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                      placeholder="e.g. Commander Sarah Connor"
                      value={formData.fullName}
                      onChange={handleChange}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      required
                    />
                    {errors.fullName && (
                      <span id="fullName-error" className="error-message">{errors.fullName}</span>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="email" className="field-label">
                      CORPORATE / OFFICIAL EMAIL <span className="req">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`form-input ${errors.email ? 'has-error' : ''}`}
                      placeholder="e.g. ops@aerospace.org"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      required
                    />
                    {errors.email && (
                      <span id="email-error" className="error-message">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="inquiryType" className="field-label">
                    INQUIRY CLASSIFICATION
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    className="form-select"
                    value={formData.inquiryType}
                    onChange={handleChange}
                  >
                    <option value="commercial-launch">Commercial Launch Services (Falcon 9 / Heavy)</option>
                    <option value="starlink-enterprise">Starlink for Enterprise, Aviation & Maritime</option>
                    <option value="smallsat-rideshare">SmallSat Rideshare Program (Transporter Flights)</option>
                    <option value="government-defense">NASA, Space Force & National Security Space</option>
                    <option value="media-press">Media & Press Relations</option>
                    <option value="careers-talent">Human Resources & University Recruitment</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="subject" className="field-label">
                    SUBJECT LINE <span className="req">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className={`form-input ${errors.subject ? 'has-error' : ''}`}
                    placeholder="Brief summary of mission or inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    required
                  />
                  {errors.subject && (
                    <span id="subject-error" className="error-message">{errors.subject}</span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="message" className="field-label">
                    MISSION TRANSMISSION / MESSAGE <span className="req">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className={`form-textarea ${errors.message ? 'has-error' : ''}`}
                    placeholder="Provide mission details, launch schedule requirements, payload dimensions, or questions..."
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    required
                  />
                  {errors.message && (
                    <span id="message-error" className="error-message">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="form-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'TRANSMITTING TELEMETRY...' : 'TRANSMIT INQUIRY'}
                </button>
              </form>
            )}
          </div>

          {/* SpaceX Launch Sites & Facility Directory */}
          <div className="facilities-card">
            <span className="facilities-tag">FLIGHT OPERATIONS & FACILITIES</span>
            <h3 className="facilities-title">PRIMARY OPERATIONAL SITES</h3>

            <div className="facility-item">
              <span className="facility-name">STARBASE ORBITAL COMPLEX</span>
              <span className="facility-location">Boca Chica Beach, Brownsville, Texas</span>
              <p className="facility-desc">
                Production, testing, and orbital launch mounts for Starship and Super Heavy.
              </p>
            </div>

            <div className="facility-item">
              <span className="facility-name">CAPE CANAVERAL SPACE FORCE STATION</span>
              <span className="facility-location">Space Launch Complex 40 (SLC-40) & LC-39A, Florida</span>
              <p className="facility-desc">
                Primary East Coast orbital launch site for Commercial Crew, Falcon 9, and Falcon Heavy.
              </p>
            </div>

            <div className="facility-item">
              <span className="facility-name">VANDENBERG SPACE FORCE BASE</span>
              <span className="facility-location">Space Launch Complex 4E (SLC-4E), California</span>
              <p className="facility-desc">
                West Coast launchpad for polar orbits, sun-synchronous flights, and rideshare missions.
              </p>
            </div>

            <div className="facility-item">
              <span className="facility-name">ROCKET DEVELOPMENT FACILITY</span>
              <span className="facility-location">McGregor, Texas</span>
              <p className="facility-desc">
                Hot-fire test stands for every Merlin and Raptor engine prior to flight integration.
              </p>
            </div>

            <div className="facility-item">
              <span className="facility-name">GLOBAL HEADQUARTERS</span>
              <span className="facility-location">1 Rocket Road, Hawthorne, California 90250</span>
              <p className="facility-desc">
                Primary design, manufacturing, and mission control center for all SpaceX vehicles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
