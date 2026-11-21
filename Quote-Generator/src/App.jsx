import { useEffect, useState } from 'react';
import './App.css';

const randomQuote = (quotes) => {
  if (!quotes.length) return null;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

function QuoteApp() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/quotes', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Quote request failed (${response.status})`);
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No quotes returned');
        }
        setQuotes(data);
        setQuote(randomQuote(data));
        setStatus('ready');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Error fetching quotes:', error);
          setStatus('error');
        }
      });

    return () => controller.abort();
  }, []);

  const handleNewQuote = () => {
    setQuote((currentQuote) => {
      let nextQuote = randomQuote(quotes);
      while (quotes.length > 1 && nextQuote?.text === currentQuote?.text) {
        nextQuote = randomQuote(quotes);
      }
      return nextQuote;
    });
  };

  return (
    <div className="quote-app">
      <h1>Random Quote Generator</h1>
      {status === 'loading' && <p>Loading quote...</p>}
      {status === 'error' && <p>Could not load a quote. Please try again.</p>}
      {quote && (
        <div className="quote-container">
          <p className="quote-text">"{quote.text}"</p>
          <p className="quote-author">- {quote.author || 'Unknown'}</p>
        </div>
      )}
      <button onClick={handleNewQuote} disabled={status !== 'ready'}>
        New Quote
      </button>
    </div>
  );
}

export default QuoteApp;