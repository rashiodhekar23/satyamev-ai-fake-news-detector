export default function Badge({ verdict }) {
  const styles = {
    FAKE:       { color: '#ff4d6d', bg: 'rgba(255,77,109,0.1)'  },
    REAL:       { color: '#2dd4a0', bg: 'rgba(45,212,160,0.1)'  },
    MISLEADING: { color: '#ffb347', bg: 'rgba(255,179,71,0.1)'  },
    UNVERIFIED: { color: '#a0a0c0', bg: 'rgba(160,160,192,0.1)' },
  };
  const s = styles[verdict] || styles.UNVERIFIED;
  return (
    <span style={{
      color: s.color,
      background: s.bg,
      padding: '4px 12px',
      borderRadius: '100px',
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.06em'
    }}>
      {verdict}
    </span>
  );
}