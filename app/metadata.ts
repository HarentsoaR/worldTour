const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "World Tour - Virtual Travel Experience",
  description: "Embark on virtual journeys to breathtaking destinations around the globe.",
}

