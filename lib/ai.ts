export async function matchEcho(content: string) {
  // Grok-mini via xAI API (gratis tier) of fallback keywords
  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.XAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'grok-beta',
      messages: [{ role: 'user', content: `Match deze echo met 3 keywords voor anonieme pairing: "${content}"` }],
      max_tokens: 50
    })
  });
  
  const { choices } = await response.json();
  return choices[0].message.content.split(',').map(s => s.trim());
}
