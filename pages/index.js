export default function Home() {
  async function runAudit(e){
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      business: form.get('business'),
      url: form.get('url'),
      city: form.get('city')
    };
    // TODO: replace with your Make webhook URL
    const res = await fetch('/api/run-audit', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    alert(res.ok ? 'Audit started!' : 'Failed to start audit');
  }
  return (
    <main style={{padding:24, fontFamily:'system-ui'}}>
      <h1>Ōkha Local Visibility Audit</h1>
      <form onSubmit={runAudit} style={{display:'grid', gap:12, maxWidth:480}}>
        <input name="business" placeholder="Business name" required />
        <input name="url" placeholder="https://your-site.com" required />
        <input name="city" placeholder="City, ST" required />
        <button type="submit">Run Audit</button>
      </form>
    </main>
  );
}
