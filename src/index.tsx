import { Shynet } from './pagesRouter'
export { ShynetForAppRouter } from "./appRouter"
export default Shynet

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
