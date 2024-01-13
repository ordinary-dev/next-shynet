import React from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

import { ShynetProps, TrackingPixel, allowLoading } from './common'

/**
 * Shynet - privacy-friendly web analytics.
 *
 * Loads script and tracking pixel, calls Shynet.newPageLoad() on path change.
 * This component was developed for app router.
 *
 * @see {@link https://github.com/milesmcc/shynet}
 */
export function ShynetForAppRouter({ scriptSrc, imgSrc, ignoreEnv }: ShynetProps): JSX.Element {
    const pathname = usePathname()

    /**
     * Send information about the current page.
     */
    function sendData(): void {
        window.Shynet?.newPageLoad()
    }

    React.useEffect(() => {
        sendData()
    }, [pathname])

    if (!allowLoading(ignoreEnv)) return <></>

    return <>
        <Script src={scriptSrc} onLoad={() => { sendData() }} />
        <TrackingPixel src={imgSrc} />
    </>
}
