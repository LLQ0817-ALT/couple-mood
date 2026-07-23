export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const room = url.searchParams.get("room");
  const role = url.searchParams.get("role");
  const key = `room_${room}_${role}`;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  if (!room || !role) {
    return Response.json({error:"缺少参数"}, {status:400, headers:corsHeaders})
  }

  if (request.method === "POST") {
    const body = await request.json();
    await env.MOOD_KV.put(key, JSON.stringify({mood: body.mood}));
    return Response.json({ ok: true }, { headers: corsHeaders });
  } else {
    const raw = await env.MOOD_KV.get(key);
    const data = raw ? JSON.parse(raw) : {};
    return Response.json(data, { headers: corsHeaders });
  }
}
