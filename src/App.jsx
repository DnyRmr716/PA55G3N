import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

const evaluatePasswordStrength = (password) => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[\W_]/.test(password)) strength++;

  if (strength === 5) return 'Very Strong';
  if (strength === 4) return 'Strong';
  if (strength === 3) return 'Medium';
  if (strength === 2) return 'Weak';
  return 'Very Weak';
};

function App() {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,
  });
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleGeneratePassword = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/generate-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ length, options }),
      });
      const data = await response.json();
      setPassword(data.password);

      const strength = evaluatePasswordStrength(data.password);
      console.log('Password Strength:', strength);
      setPasswordStrength(strength);
    } catch (error) {
      console.error('Error generating password:', error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="App">
      <h1>PA55G3N</h1>
      <h3>Your #1 Password Generator</h3>
      <div className="content-wrapper">
        <div className={`options-box ${password ? 'expanded' : ''}`}>
          <div>
            <label>
              Password Length:
              <input
                type="number"
                value={length}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setLength(inputValue === '' ? '' : Math.min(Number(inputValue), 999));
                }}
                min="6"
                max="999"
              />
            </label>
            {length > 999 && (
              <p style={{ color: 'red' }}>Maximum length is 999 characters.</p>
            )}
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
            <div className="password-section">
              <h2>Your Password:</h2>
              <div className="password-container">
                <p>{password}</p>
              </div>
              <p>
                Password Strength: <strong>{passwordStrength}</strong>
              </p>
              <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
            </div>
          )}
        </div>
        {isCopied && (
          <p className="copied-notification">Password copied to clipboard!</p>
        )}
      </div>
      <a
        href="https://github.com/DnyRmr716/password-generator-project-frontend/tree/main"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub size={32} color="#FF5A5F" />
      </a>
    </div>
  );
}

export default App;
