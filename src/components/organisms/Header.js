import IconLogo from "@/components/atoms/icons/IconLogo";
import IconChevronRight from "@/components/atoms/icons/IconChevronRight";

export default function Header() {
    return (
        <header id="header" className="absolute w-full">
            <div className="container flex items-center justify-between">
                <div className="bg-neutral-100 w-full flex justify-between items-center px-lg py-md rounded-full border-[1px] border-solid border-neutral-200">
                    <a href="/">
                        <IconLogo/>
                    </a>
                    <nav>
                        <ul className="flex justify-center items-center text-[16px] font-800">
                            <li className="px-md py-sm">About us</li>
                            <li className="px-md py-sm">Help</li>
                            <li className="px-md py-sm">Contact</li>
                        </ul>
                    </nav>
                    <a href="http://localhost" className="button bg-primary-600 text-neutral-100">Contact <IconChevronRight/></a>
                </div>
            </div>
        </header>
    );
}