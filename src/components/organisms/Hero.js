export default function Hero({ title, image }) {
    return (
        <section
            className={`hero ${image ? 'background-image' : ''}`}
                 style={image ? { backgroundImage: `url(${image})` } : {}}
        >
            <div className="container text-center">
                {title && (
                    <h1 className="gradient-text">{title}</h1>
                )}
            </div>
        </section>
    );
}