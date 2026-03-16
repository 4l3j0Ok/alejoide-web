import type { APIRoute } from 'astro'
import { PROJECTS_API_URL } from "astro:env/server";


export const GET: APIRoute = async () => {
    const response = await fetch(PROJECTS_API_URL + `/projects`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
    if (!response.ok) {
        const errorData = await response.json();
        return new Response(
            JSON.stringify({ error: errorData?.detail || 'Error fetching data' }),
            { status: response.status, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const projects = await response.json();
    return new Response(JSON.stringify(projects), { status: 200, headers: { 'Content-Type': 'application/json' } });
}