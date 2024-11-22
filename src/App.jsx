import React, { useState } from 'react';

function App() {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,
  });
  const [password, setPassword] = useState('');

  const handleGeneratePassword = async () => {
    try {
      const response = await fetch('http://localhost:3000/generate-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ length, options }),
      });
      const data = await response.json();
      setPassword(data.password);
    } catch (error) {
      console.error('Error generating password:', error);
    }
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div>
        <label>
          Password Length:
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min="6"
            max="64"
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={options.includeUppercase}
            onChange={(e) =>
              setOptions({ ...options, includeUppercase: e.target.checked })
            }
          />
          Include Uppercase Letters
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={options.includeLowercase}
            onChange={(e) =>
              setOptions({ ...options, includeLowercase: e.target.checked })
            }
          />
          Include Lowercase Letters
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={options.includeNumbers}
            onChange={(e) =>
              setOptions({ ...options, includeNumbers: e.target.checked })
            }
          />
          Include Numbers
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={options.includeSymbols}
            onChange={(e) =>
              setOptions({ ...options, includeSymbols: e.target.checked })
            }
          />
          Include Symbols
        </label>
      </div>
      <button onClick={handleGeneratePassword}>Generate Password</button>
      {password && (
        <div>
          <h2>Your Password:</h2>
          <p>{password}</p>
          <button
            onClick={() => navigator.clipboard.writeText(password)}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
      