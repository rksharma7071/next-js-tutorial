import Header from "@/components/Header";

export default function UsersLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}