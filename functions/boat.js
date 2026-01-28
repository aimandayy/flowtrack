export async function onRequest() {
  const url = "https://followme.mv/api/v5/my/qDIM8KN1yfjc1Rs/17753/";

  const r = await fetch(url, { headers: { "accept": "application/json" } });
  const text = await r.text();

  return new Response(text, {
    status: r.status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "cache-control": "no-store"
    }
  });
}
