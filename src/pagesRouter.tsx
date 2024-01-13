import React from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'

import { ShynetProps, TrackingPixel, allowLoading } from './common'

/**
 * Shynet - privacy-friendly web analytics.
 *
 * Loads script and tracking pixel, calls Shynet.newPageLoad() on path change.
 * This component was developed for pages router.
 *
 * @deprecated Use ShynetForAppRouter instead.
 *
 * @see {@link https://github.com/milesmcc/shynet}
 */
export function Shynet({ scriptSrc, imgSrc, ignoreEnv }: ShynetProps): JSX.Element {
    const router = useRouter()

    /**
     * Send information about the current page.
     */
    function sendData(): void {
        window.Shynet?.newPageLoad()
    }

    React.useEffect(() => {
        router.events.on('routeChangeComplete', sendData)
        return () => {
            router.events.off('routeChangeComplete', sendData)
        }
    }, [router])

    if (!allowLoading(ignoreEnv)) return <></>

    return <>
        <Script src={scriptSrc} onLoad={() => { sendData() }} />
        <TrackingPixel src={imgSrc} />
    </>
}
