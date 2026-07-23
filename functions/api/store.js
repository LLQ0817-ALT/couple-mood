const storage = {};
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const room = url.searchParams.get("room");
  const role = url.searchParams.get("role");
  const key = `${room}_${role}`;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  if (request.method === "POST") {
    const body = await request.json();
    storage[key] = body.mood;
    return Response.json({ ok: true }, { headers: corsHeaders });
  } else {
    const data = storage[key] || {};
    return Response.json(data, { headers: corsHeaders });
  }
}
