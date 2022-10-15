export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js hello</title>
      </head>
      <body>{children}</body>
    </html>
  );
}