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
          marginBottom: 'var(--space-md)',
          fontSize: '1.75rem',
          fontFamily: 'var(--font-sans)',
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
          color: 'var(--color-text)',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.875rem',
          fontWeight: '600',
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
          padding: 'var(--space-md)',
          background: 'var(--color-bg)',
          color: 'var(--color-text)',
          border: '1.5px solid var(--color-accent)',
          borderRadius: '4px',
          fontFamily: 'var(--font-sans)',
          fontSize: '1rem',
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

function Button({ children, onClick, type = 'button', disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: 'var(--color-accent)',
        color: 'var(--color-bg)',
        fontFamily: 'var(--font-sans)',
        fontSize: '1rem',
        fontWeight: '700',
        border: 'none',
        borderRadius: '4px',
        padding: 'var(--space-md)',
        width: '100%',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        letterSpacing: '0.02em',
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
                scope="col"
                style={{
                  textAlign: 'left',
                  padding: 'var(--space-md)',
                  borderBottom: '2px solid var(--color-accent)',
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-accent)',
                  fontWeight: '700',
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
                    padding: 'var(--space-md)',
                    borderBottom: '1px solid var(--color-text)',
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--color-text)',
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
  const [busy, setBusy] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Please enter your email address and password.');
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setError('Your email address or password is incorrect. Please try again.');
    }, 900);
  }

  return (
    <Page heading="Sign in to Room Bookings">
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Sign in form"
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'var(--color-bg)',
          padding: 'var(--space-md)',
          borderRadius: '6px',
          border: '1px solid var(--color-accent)',
          boxSizing: 'border-box',
        }}
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
            aria-live="assertive"
            style={{
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              marginBottom: 'var(--space-md)',
              marginTop: 0,
              padding: 'var(--space-md)',
              border: '1px solid var(--color-accent)',
              borderRadius: '4px',
              background: 'var(--color-bg)',
            }}
          >
            {error}
          </p>
        )}
        <Button type="submit" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign In'}
        </Button>
      </form>
    </Page>
  );
}