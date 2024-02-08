import Footer from "@/components/ui/Footer/Footer";
import { gormorant } from "../layout";  

import Header from "@/components/ui/Header/Header";


function LayoutRoot({children}) {
    return <>
        <Header />
        <main className={gormorant.className}>
            {children}
        </main>
        <Footer />
    </>
}

export default LayoutRoot;