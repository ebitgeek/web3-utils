import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home.tsx";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="z-50 sticky top-0 flex flex-row gap-4 p-2 border-b backdrop-blur-md bg-background/80 mb-2">
        <div className="flex flex-row mx-2 font-black items-center justify-center text-center">
          WEB3 UTILS
        </div>
        <div className="flex flex-1 flex-row justify-end items-center">
          <ModeToggle />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
