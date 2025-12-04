export const metadata = {
  title: "Muyu 28",
  description: "Farcaster Miniapp - 每天敲木鱼 28 次",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
