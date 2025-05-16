import { headers } from "next/headers";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import Hero from '@/components/organisms/Hero';
import Event from '@/components/molecules/Event';

async function getBaseUrl() {
    const headersList = await headers(); // ✅ await now required
    const host = headersList.get("host");
    const protocol = host?.includes("localhost") ? "http" : "https";
    return `${protocol}://${host}`;
}

export default async function Page({ params }) {
    const { slug } = await params;
    const baseUrl = await getBaseUrl();

    const path = `portals/${slug}`;
    const include = encodeURIComponent("events,events.tickets.ticketCategory");

    const response = await fetch(
        `${baseUrl}/api/getRequest?path=${path}&limit=999&include=${include}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        console.error("Failed to fetch portal:", response.statusText);
        return <div>Error loading portal.</div>;
    }

    const result = await response.json();
    const portal = result.data;

    return (
        <div>
            <Header/>

            <main>
                <Hero
                    title={portal.name}
                    image={portal.image}
                />

                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <div
                                    className="text-neutral-100 py-[250px]"
                                    dangerouslySetInnerHTML={{__html: portal.description}}
                                />
                            </div>
                            <div className="col-lg-5">
                                <div
                                    className="background-image w-full h-full portal-image"
                                    style={{ backgroundImage: `url(${portal.secondary_image})` }}
                                >

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container">
                        {portal.upcoming_events.length > 0 && (
                            <div>
                                {portal.upcoming_events.map((event) => (
                                    <div
                                        className="h-full p-lg border rounded-lg mb-md"
                                        key={event.id}
                                    >
                                        <Event event={event}/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

               {/* <section>
                    <div className="container">
                        <pre className="p-2 rounded text-neutral-100">{JSON.stringify(portal, null, 2)}</pre>
                    </div>
                </section>*/}
            </main>

            <Footer/>
        </div>
    );
}