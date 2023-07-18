// import { withContentlayer } from "next-contentlayer"

// import "./env.mjs"

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// };

// export default withContentlayer(nextConfig);

const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withContentlayer(nextConfig);