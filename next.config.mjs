/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      use: [
        {
          loader: 'raw-loader',
        },
        {
          loader: 'glslify-loader',
        },
      ],
    })

    return config
  },
}

export default nextConfig
