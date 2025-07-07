export async function GET(request, { params })
{
    console.log("🚀 ~ params:", params);
    console.log("🚀 ~ request:", request);
    return Response.json({ test: "test" });
}
