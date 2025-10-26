import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.post('/graphql', { query: `{ events { id name date location } }` })
      .then(res => setEvents(res.data.data.events))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>🎟️ Evently</h1>
      <ul>
        {events.map(e => (
          <li key={e.id}>{e.name} – {e.location}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
