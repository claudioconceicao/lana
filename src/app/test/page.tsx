import { createClient } from "../../../utils/supabase/client";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient();

  const { data: todos, error } = await supabase.from("profiles").select("*");
  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }
  if (!todos) {
    return <p className="text-gray-500">No profiles found.</p>;
  }
  return (
    <html lang="en">
      <body>
        <div>
          <h1 className="text-2xl font-bold mb-4">Profiles</h1>
          <div className="mb-4">
            <p className="text-gray-600">Total profiles: {todos.length}</p>
          </div>

          <ul className="list-disc pl-5">
            {todos.map((todo) => (
              <li key={todo.id} className="mb-2">
                <p className="text-gray-800">Email: {todo.email}</p>
                <p className="text-gray-500">ID: {todo.id}</p>
              </li>
            ))}
          </ul>
        </div>
      </body>
    </html>
  );
}
