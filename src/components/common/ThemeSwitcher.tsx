import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // or wherever your icons are from

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        setMounted(true);
        // Detect theme from localStorage or system
        const stored = localStorage.getItem("theme");
        if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);

    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        localStorage.setItem("theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 cursor-pointer"
            aria-label="Toggle Theme"
        >
            {mounted ? (
                theme === "light" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />
            ) : (
                // Optionally render nothing or a placeholder to avoid mismatch
                <span className="w-6 h-6 inline-block" />
            )}
        </button>
    );
};

export default ThemeSwitcher;