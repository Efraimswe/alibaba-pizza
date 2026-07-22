import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="font-display text-2xl font-bold text-ink">Admin</h1>
      <form action={login} className="card mt-6 flex flex-col gap-3 p-6">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink-soft">
          Wachtwoord
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="card-inset rounded-lg px-3 py-2 text-ink outline-none"
          />
        </label>
        {error && <p className="text-sm font-medium text-red-600">Verkeerd wachtwoord.</p>}
        <button
          type="submit"
          className="press mt-1 rounded-xl bg-primary px-4 py-2.5 font-display font-bold text-on-primary"
        >
          Inloggen
        </button>
      </form>
    </div>
  );
}
