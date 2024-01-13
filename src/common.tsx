import React from 'react'

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
 * Do not load the script if it is not a production environment
 * and script loading is not allowed in any environment.
 */
export function allowLoading(ignoreEnv?: boolean): boolean {
    return ignoreEnv === true || process.env.NODE_ENV === 'production'
}

export function TrackingPixel({src}: {src?: string}): JSX.Element {
    if (!src) return <></>
    
    return (
        <noscript>
            <img
                src={src}
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
        </noscript>
    )
}
