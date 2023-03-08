import React from "react"
import Script from "next/script"
import { useRouter } from "next/router"

export interface ShynetProps {
    scriptSrc: string
    imgSrc?: string
    ignoreEnv?: boolean
}

// Shynet - privacy-friendly web analytics
// https://github.com/milesmcc/shynet
export default function Shynet({scriptSrc, imgSrc, ignoreEnv}: ShynetProps) {
    const router = useRouter()

    // Sends information about the current page
    const sendData = () => {
        if (window["Shynet"]) window["Shynet"].newPageLoad()
    }

    React.useEffect(() => {
        router.events.on("routeChangeComplete", sendData)
        return () => router.events.off("routeChangeComplete", sendData)
    }, [router])

    // Do not load script if it is not a production environment,
    // or script loading is not allowed in any environment.
    const allowLoading = ignoreEnv || process.env.NODE_ENV === "production"
    if (!allowLoading) return <></>

    return <>
        <Script src={scriptSrc} onLoad={() => sendData()} />
        {imgSrc && <noscript>
            <img
                src={imgSrc}
                width="1"
                height="1"
                loading="lazy"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: 0,
                }}
            />
        </noscript>}
    </>
}

interface ShynetScript {
    newPageLoad: () => void
}

declare global {
    interface Window {
        Shynet?: ShynetScript
    }
}
