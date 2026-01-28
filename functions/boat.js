export async function onRequest() {
  const url = "https://followme.mv/api/v5/my/3/";

  try {
    const r = await fetch(url, {
      headers: {
        "accept": "application/json",
        "user-agent": "Mozilla/5.0"
      }
    });

    const text = await r.text(); // always safe

    // Try parse JSON, but don't crash if it's HTML or garbage
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Upstream did not return JSON",
          upstreamStatus: r.status,
          sample: text.slice(0, 200)
        }),
        {
          status: 502,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*",
            "cache-control": "no-store"
          }
        }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "access-control-allow-origin": "*",
        "cache-control": "no-store"
      }
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ status: "error", message: String(e) }),
      {
        status: 500,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "access-control-allow-origin": "*",
          "cache-control": "no-store"
        }
      }
    );
  }
}

