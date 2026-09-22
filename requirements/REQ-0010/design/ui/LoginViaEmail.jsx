function Page({ heading, children }) {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        fontFamily: 'var(--font-sans)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-md)',
      }}
    >
      <h1
        style={{
          color: 'var(--color-text)',
          fontFamily: 'var(--font-sans)',
          marginBottom: 'var(--space-md)',
          fontSize: '1.75rem',
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        {heading}
      </h1>
      {children}
    </main>
  );
}

function Field({ id, label, type = 'text', value, onChange, autoComplete }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        width: '100%',
        marginBottom: 'var(--space-md)',
      }}
    >
      <label
        htmlFor={id}
        style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-text)',
          fontSize: '0.9rem',
          fontWeight: 600,
        }}
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-text)',
          background: 'var(--color-bg)',
          border: '1.5px solid var(--color-text)',
          borderRadius: '4px',
          padding: '0.5rem 0.75rem',
          fontSize: '1rem',
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

function Button({ type = 'button', onClick, children, disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: 'var(--font-sans)',
        background: 'var(--color-accent)',
        color: 'var(--color-bg)',
        border: 'none',
        borderRadius: '4px',
        padding: '0.65rem 1.5rem',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        width: '100%',
      }}
    >
      {children}
    </button>
  );
}

function Table({ columns, rows }) {
  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-text)',
          fontSize: '0.95rem',
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                style={{
                  textAlign: 'left',
                  padding: '0.5rem 0.75rem',
                  borderBottom: '2px solid var(--color-accent)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderBottom: '1px solid var(--color-text)',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LoginViaEmail() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Please enter your email address and password.');
      return;
    }
    setLoading(true);
    // Simulate authentication attempt; real implementation posts to /api/auth/login
    setTimeout(() => {
      setLoading(false);
      // Generic error — no account enumeration
      setError('The email address or password is incorrect. Please try again.');
    }, 900);
  }

  return (
    <Page heading="Sign In">
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'var(--color-bg)',
          border: '1.5px solid var(--color-text)',
          borderRadius: '8px',
          padding: 'var(--space-md)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
        aria-label="Sign in to your account"
      >
        <Field
          id="email"
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <Field
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        {error && (
          <p
            role="alert"
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-accent)',
              fontSize: '0.9rem',
              margin: '0 0 var(--space-md) 0',
              padding: '0.5rem 0.75rem',
              border: '1px solid var(--color-accent)',
              borderRadius: '4px',
            }}
          >
            {error}
          </p>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </Button>
      </form>
    </Page>
  );
}