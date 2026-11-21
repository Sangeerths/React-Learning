import { useState } from "react";
import "./App.css";

function GithubSearch() {
const [query, setQuery] = useState("");
const [userData, setUserData] = useState(null);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

const handleSearch = async(e) => {
e.preventDefault();
if (!query) {
  return;
}
setLoading(true);
setError(null);
setUserData(null);

try {
      const response = await fetch(  `https://api.github.com/users/${query}`
);
       if (!response.ok) {
        throw new Error('User not found');
      }

      const data = await response.json();
      setUserData(data);
}
catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <section className="search-shell" aria-labelledby="page-title">
        <header className="app-header">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .08 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.64-1.36-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 7.1c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.2 10.2 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
              </svg>
            </span>
            <span>GitHub Finder</span>
          </div>
          <span className="status"><span /> API live</span>
        </header>

        <div className="intro">
          <h1 id="page-title">Find a developer</h1>
          <p>Search GitHub profiles in seconds.</p>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <label className="sr-only" htmlFor="github-username">GitHub username</label>
          <div className="input-wrap">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
            <input
              id="github-username"
              type="text"
              placeholder="Enter GitHub username"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        <div className="result-area" aria-live="polite">
          {loading && (
            <div className="loading-card">
              <span className="spinner" />
              <p>Looking up {query}...</p>
            </div>
          )}

          {error && (
            <div className="error-card">
              <span aria-hidden="true">!</span>
              <p>{error}</p>
            </div>
          )}

          {userData && (
            <article className="profile-card">
              <div className="profile-main">
                <img
                  className="avatar"
                  src={userData.avatar_url}
                  alt={`${userData.login}'s avatar`}
                />
                <div className="profile-info">
                  <h2>{userData.name || userData.login}</h2>
                  <a className="username" href={userData.html_url} target="_blank" rel="noreferrer">
                    @{userData.login}
                  </a>
                  {userData.bio && <p className="bio">{userData.bio}</p>}
                  {userData.location && (
                    <p className="location">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      {userData.location}
                    </p>
                  )}
                </div>
              </div>

              <div className="profile-stats">
                <div><strong>{userData.public_repos}</strong><span>Repositories</span></div>
                <div><strong>{userData.followers}</strong><span>Followers</span></div>
                <div><strong>{userData.following}</strong><span>Following</span></div>
              </div>

              <a className="profile-link" href={userData.html_url} target="_blank" rel="noreferrer">
                View GitHub Profile
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </article>
          )}
        </div>
      </section>
    </main>
  );
}

export default GithubSearch;