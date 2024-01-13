import React from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'

export interface ShynetProps {
    /**
     * Link to your shynet script.
     * @example
     * "https://shynet.org/.../index.js"
     */
    scriptSrc: string
    /**
     * Optional link to tracking pixel.
     * @example
     * "https://shynet.org/.../pixel.gif"
     */
    imgSrc?: string
    /** Set this parameter to `true`, if you want to load shynet even during development. */
    ignoreEnv?: boolean
}

/**
 * Shynet - privacy-friendly web analytics.
 *
 * Loads script and tracking pixel, calls Shynet.newPageLoad() on path change.
 * This component was developed for pages router.
 *
 * @see {@link https://github.com/milesmcc/shynet}
 */
export default function Shynet({ scriptSrc, imgSrc, ignoreEnv }: ShynetProps): JSX.Element {
    const router = useRouter()

    /**
     * Send information about the current page.
     */
    function sendData(): void {
        if (window.Shynet !== undefined) window.Shynet.newPageLoad()
    }

    React.useEffect(() => {
        router.events.on('routeChangeComplete', sendData)
        return () => {
            router.events.off('routeChangeComplete', sendData)
        }
    }, [router])

    // Do not load script if it is not a production environment,
    // or script loading is not allowed in any environment.
    const allowLoading = ignoreEnv === true || process.env.NODE_ENV === 'production'
    if (!allowLoading) return <></>

    return <>
        <Script src={scriptSrc} onLoad={() => { sendData() }} />
        {imgSrc !== undefined && <noscript>
            <img
                src={imgSrc}
                width='1'
                height='1'
                loading='lazy'
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 0,
                }}
            />
        </noscript>}
    </>
}

interface ShynetScript {
    /** This function should be called on path change. */
    newPageLoad: () => void
}

// Typescript hack
declare global {
    interface Window {
        Shynet?: ShynetScript
    }
}
