/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store',
                    },
                ],
            },
        ];
    },
    'Cache-Control': ['no-cache', 'no-store', 'max-age=0', 'must-revalidate'],
};

module.exports = nextConfig;
