import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl">My Ghost Blog</h1>
      </header>
      <main className="container mx-auto py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default App