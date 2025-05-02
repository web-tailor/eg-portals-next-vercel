import IconLogo from "@/components/atoms/icons/IconLogo";

export default function Header() {
    return (
        <header id="header">
            <div className="container flex items-center justify-between">
                <IconLogo/>
            </div>
        </header>
    );
}