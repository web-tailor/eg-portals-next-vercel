import Hero from "@/components/organisms/Hero";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

export default async function Page() {

    return (
        <div>
            <Header />

            <main>
                <Hero title='Hello'/>

                <section>
                    <div className="container">

                    </div>
                </section>
            </main>


            <Footer/>
        </div>
    );
}