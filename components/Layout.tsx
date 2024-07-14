import { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import InfoModal from "./InfoModal";
import useInfoModal from "../hooks/useInfoModal";

type Props = {
    children: ReactNode
}

const Layout: FC<Props> = ({children}) => {
    const { isOpen, closeModal } = useInfoModal();
    
    return (
        <>
            <Navbar />
            <main className="flex py-20 px-5 justify-center gap-5">
                {children}
            </main>
            <InfoModal visible={isOpen} onClose={closeModal} />
        </>
    )
}

export default Layout;
