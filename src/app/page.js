import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Hero from "@/components/organisms/Hero";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

async function getBaseUrl() {
    const headersList = await headers(); // ✅ await now required
    const host = headersList.get("host");
    const protocol = host?.includes("localhost") ? "http" : "https";
    return `${protocol}://${host}`;
}

export default async function Page() {

    const baseUrl = await getBaseUrl();
    const path = 'portals';
    const limit = 9999;
    const response = await fetch(`${baseUrl}/api/getRequest?path=${path}&limit=${limit}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        console.error("Failed to fetch portals:", response.statusText);
        return <div>Error loading portals.</div>;
    }
    const portals = await response.json();


    return (
        <div>
            <Header />

            <main>
                <Hero title='Hello'/>

                <section>
                    <div className="container">
                        <pre className="p-2 rounded text-neutral-100">{JSON.stringify(portals, null, 2)}</pre>

                    </div>
                </section>
            </main>


            <Footer/>
        </div>
    );
}