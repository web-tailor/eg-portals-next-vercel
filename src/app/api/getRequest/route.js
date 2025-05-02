export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");
    const limit = searchParams.get("limit");

    console.log("Path:", path);
    console.log("Limit:", limit);

    if (!path) {
        return Response.json({ error: "Path is required" }, { status: 400 });
    }
    if (!limit) {
        return Response.json({ error: "Limit is required" }, { status: 400 });
    }

    const url = `https://api.event-go.nl/internal/${path}?limit=${limit}`;
    const token = process.env.EVENT_API_TOKEN;

    console.log("Requesting external URL:", url);
    console.log("Using token:", token ? "✅ Present" : "❌ Missing");

    if (!token) {
        return Response.json({ error: "API token missing" }, { status: 500 });
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        console.log("External response status:", response.status);

        if (!response.ok) {
            const errText = await response.text();
            console.error("External error response:", errText);
            throw new Error(`External API error: ${response.status}`);
        }

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error("API Route Error:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}