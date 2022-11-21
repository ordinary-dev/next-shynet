import React from "react"
import Script from "next/script"
import { useRouter } from "next/router"

export interface ShynetProps {
    scriptSrc: string
    imgSrc?: string
}

// Shynet - privacy-friendly web analytics
// https://github.com/milesmcc/shynet
export default function Shynet(props: ShynetProps) {
    const router = useRouter()

    const sendData = () => {
        if (window["Shynet"]) window["Shynet"].newPageLoad()
    }

    React.useEffect(() => {
        sendData()
    }, [router.asPath, router.locale])

    return (
        <>
            <Script src={props.scriptSrc} onLoad={() => sendData()} />
            {props.imgSrc && (
                <noscript>
                    <img
                        src={props.imgSrc}
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
                </noscript>
            )}
        </>
    )
}

interface ShynetScript {
    newPageLoad: () => void
}

declare global {
    interface Window {
        Shynet?: ShynetScript
    }
}
