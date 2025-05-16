import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Hero from "@/components/organisms/Hero";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import Portal from '@/components/molecules/Portal';

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
                <Hero title='E&G Portals'/>

                <section>
                    <div className="container">
                        {portals?.data
                            .filter((portal) => portal.upcoming_events_count > 0)
                            .map((portal) => (
                                <Portal
                                    key={portal.id}
                                    portal={portal}
                                />
                            ))}

                    </div>
                </section>

                {/*<section>
                    <div className="container">
                        <pre className="p-2 rounded text-neutral-100">{JSON.stringify(portals, null, 2)}</pre>

                    </div>
                </section>*/}
            </main>


            <Footer/>
        </div>
    );
}