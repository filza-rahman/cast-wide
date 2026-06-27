export async function POST(req: Request) {
  const { email, password } = await req.json()
  if (email === "judge@castwide.app" && password === "demo2026") {
    return Response.json({ success: true, token: "vl-demo-token" })
  }
  return Response.json({ error: "Invalid credentials" }, { status: 401 })
}