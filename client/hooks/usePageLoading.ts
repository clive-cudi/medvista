import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function usePageLoading() {
    const router = useRouter();
    const [isPageLoading, setIsPageLoading] = useState(false);

    useEffect(() => {
        router.events.on("routeChangeError", (e) => setIsPageLoading(false));
        router.events.on("routeChangeStart", (e) => setIsPageLoading(true));
        router.events.on("routeChangeComplete", (e) => setIsPageLoading(false));

        console.log(isPageLoading);

        return () => {
            router.events.off("routeChangeError", (e) => setIsPageLoading(false));
            router.events.off("routeChangeStart", (e) => setIsPageLoading(true));
            router.events.off("routeChangeComplete", (e) => setIsPageLoading(false));
        }

    }, [router.events]);

    return {
        isPageLoading
    }
}