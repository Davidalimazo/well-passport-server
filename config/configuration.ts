export default () => ({
  port: parseInt(process.env.PORT, 10) || 3010,
  jwtScret: process.env.JWT_SECRET,
  cloudinaryName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  emailServer: process.env.EMAIL_SERVER_USER,
  emailPassword: process.env.EMAIL_SERVER_PASSWORD,
  emailHost: process.env.EMAIL_SERVER_HOST,
  emailSecure: JSON.parse(process.env.EMAIL_SECURE as string) || true,
  emailPort: parseInt(process.env.EMAIL_SERVER_HOST, 10) || 465,
  mailFrom: process.env.EMAIL_FROM,
  database: {
    uri: process.env.DATABASE_URL,
    dbName: process.env.MONGO_DB_NAME,
  },
});

interface IConfig {
  port: string;
  database: {
    uri: string;
    dbName: string;
  };
}
