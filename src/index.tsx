import React from "react"
import Script from "next/script"
import { useRouter } from "next/router"

export interface ShynetProps {
    scriptSrc: string
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

    return <Script src={props.scriptSrc} onLoad={() => sendData()} />
}

declare global {
    interface Window {
        Shynet: any
    }
}
