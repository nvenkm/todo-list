import "./App.css";
import TodoList from "./components/large/TodoList";

function App() {
  return (
    <main className="w-full h-screen grid ">
      <div className="flex flex-col items-center gap-10 pt-5 md:pt-10 lg:pt-20 w-full h-full">
        <h1 className="text-5xl font-bold text-center">
          Naveen&apos;s TO-DO List
        </h1>

        <TodoList />
      </div>
    </main>
  );
}

export default App;
