import { CodeForm } from "@/components/code-form";

export default function Home() {
  return (
    <div className="flex min-h-svh w-full items-start justify-center p-6 md:p-10 ">
      <div className="w-full max-w-sm">
        <CodeForm />
      </div>
    </div>
  );
}
