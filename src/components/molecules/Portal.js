import Link from "next/link";
import Event from '@/components/molecules/Event';
export default function Portal({ portal }) {
    const { name, slug, address, color, upcoming_events_count, upcoming_events = [] } = portal;

    const [firstWord, ...rest] = name.split(" ");
    const titleEnd = rest.join(" ");

    const events = upcoming_events.slice(0, 3);

    function hexToRgba(hex, alpha = 0.2) {
        const sanitized = hex.replace('#', '');

        const r = parseInt(sanitized.substring(0, 2), 16);
        const g = parseInt(sanitized.substring(2, 4), 16);
        const b = parseInt(sanitized.substring(4, 6), 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    const backgroundColor = hexToRgba(color, 0.1);



    return (
        <div className="mb-lg">
            <div className="flex flex-col lg:flex-row gap-2">

                <div className="lg:basis-8/12 w-full">
                    <Link
                        href={`/portals/${slug}`}
                        className="block h-full p-xxl border-2 lg:rounded-tl-2xl lg:rounded-bl-2xl text-neutral-100 bg-neutral-800"
                        style={{borderColor: color, backgroundColor}}
                    >
                        <h2>
                            {firstWord}{" "}
                            <span style={{color}}>
                                {titleEnd}
                            </span>
                        </h2>
                        <p>Slug: {slug}</p>
                        <p>Address: {address}</p>
                        <p>No. of events: {upcoming_events_count}</p>
                    </Link>
                </div>

                <div className="lg:basis-4/12 w-full">
                    <div className="h-full p-lg border lg:rounded-tr-2xl lg:rounded-br-2xl">
                        {events.length > 0 && (
                            <div>
                                {events.map((event) => (
                                    <Event
                                        key={event.id}
                                        event={event}/>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
