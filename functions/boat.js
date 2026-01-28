export async function onRequest() {
  const url = "https://followme.mv/api/v5/my/qDIM8KN1yfjc1Rs/17753/";

  const r = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "Mozilla/5.0"
    }
  });

  // Parse upstream as JSON (removes any html wrapper issues)
  const data = await r.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "cache-control": "no-store"
    }
  });
}
