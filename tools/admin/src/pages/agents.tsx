export function AgentsPage() {
  return (
    <div>
      <h1 style={titleStyle}>Agent Orchestration</h1>
      <div style={placeholderStyle}>
        <div style={iconStyle}>&#9881;</div>
        <p style={messageStyle}>Agent orchestration will be configured here.</p>
        <ul style={listStyle}>
          <li>Register and manage AI agents</li>
          <li>Define agent pipelines and workflows</li>
          <li>Monitor agent execution status</li>
          <li>View logs and output</li>
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
