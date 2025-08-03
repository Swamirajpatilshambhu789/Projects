export async function POST(request) {
  const data = await request.json();
  // You can add your login logic here
  return new Response(JSON.stringify({ message: "Login received", data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
