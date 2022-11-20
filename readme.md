# Next-Shynet

A library for integrating [Shynet](https://github.com/milesmcc/shynet)
into your [next.js](https://nextjs.org/) project.

## Usage

Install this library:

```bash
npm install --save-dev next-shynet
```

Change your `_app.js`:

```diff
+import Shynet from "next-shynet"

const YourApp = ({ Component, pageProps }) => {
    return (
        <div>
+           <Shynet scriptSrc="http://your-shynet-instance/xyz/index.js" />
            <Component {...pageProps} />
        </div>
    )
}
```
