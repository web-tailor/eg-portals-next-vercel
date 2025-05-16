export default function Event({ event }) {
    const { name, subtitle, start_date } = event;
    const formattedDate = new Date(start_date).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
    });
    return (
        <div className="mb-2 text-neutral-500 text-sm">
            <h5 className="text-neutral-100 text-lg">{name}</h5>
            <p>{subtitle}</p>
            <p>{formattedDate}</p>
        </div>
    );
}
