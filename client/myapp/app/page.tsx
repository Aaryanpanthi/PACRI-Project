import Link from "next/link";

export default function Home() {
  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>Improving the Health of Urban Minority Asthmatic Children Living in Public Housing</h1>
      <img 
        src="/PACRI.png" 
        alt="Description of image" 
        style={{ maxWidth: "100%", height: "auto", margin: "20px 0" }} 
      />
      <Link href="/demographic">Start Interview</Link>
    </main>
  );
}
