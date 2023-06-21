import SearchForm from "./SearchForm";

export default function Home() {
  return (
    <main
      style={{
        height: "calc(100vh - 210px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      className="mx-auto w-11/12 text-center py-5"
    >
      <SearchForm />
    </main>
  );
}
