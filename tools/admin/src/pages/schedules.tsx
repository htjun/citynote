export function SchedulesPage() {
  return (
    <div>
      <h1 style={titleStyle}>Schedules</h1>
      <div style={placeholderStyle}>
        <div style={iconStyle}>&#128337;</div>
        <p style={messageStyle}>Task scheduling will be configured here.</p>
        <ul style={listStyle}>
          <li>Create and manage scheduled tasks</li>
          <li>Set cron expressions and intervals</li>
          <li>View execution history</li>
          <li>Enable / disable schedules</li>
        </ul>
      </div>
    </div>
  )
}

const titleStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  marginTop: 0,
  marginBottom: 24,
}

const placeholderStyle: React.CSSProperties = {
  border: "2px dashed #d0d0d0",
  borderRadius: 8,
  padding: 40,
  textAlign: "center",
  color: "#888",
}

const iconStyle: React.CSSProperties = {
  fontSize: 36,
  marginBottom: 12,
}

const messageStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 500,
  marginBottom: 16,
}

const listStyle: React.CSSProperties = {
  textAlign: "left",
  display: "inline-block",
  fontSize: 14,
  lineHeight: 1.8,
}
