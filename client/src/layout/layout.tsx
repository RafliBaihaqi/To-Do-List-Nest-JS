import Header from "../components/header"
import Hero from "../components/hero";
import Footer from "../components/footer";

interface Props{
    children: React.ReactNode;
}

const Layout = ({children}: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;

<div className="container mx-auto py-10 flex-1"></div>