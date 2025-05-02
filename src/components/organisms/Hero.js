export default function Hero({ title }) {
    if (!title) return (
        <section className="hero">
            <div className="container text-center">
                <h2 className="mb-0 text-white">E&G Portals</h2>
                <h1 className="gradient-text">...</h1>
            </div>
        </section>
    );

    return (
        <section className="hero">
            <div className="container text-center">
                <h2 className="mb-0 text-white">E&G Portals</h2>
                {title && (
                    <h1 className="gradient-text">{title}</h1>
                )}
            </div>
        </section>
    );
}