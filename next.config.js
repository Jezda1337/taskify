module.exports = {
  async redirects() {
    return [
      {
        source: "/auth",
        destination: "/auth/login",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
};
