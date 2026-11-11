/** Elegant placeholder shown instantly while a branch page loads. */
export default function LoadingBranch() {
  const block = "animate-pulse rounded-xl bg-copper/15";

  return (
    <div className="bg-cream pb-16" aria-busy="true" aria-label="Loading branch">
      <div className="container-site pt-6 sm:pt-10">
        <div className={`h-3 w-28 ${block}`} />
        <div className={`mt-6 h-10 w-56 sm:h-14 sm:w-80 ${block}`} />
        <div className={`mt-3 h-5 w-44 ${block}`} />
      </div>

      <div className="container-site mt-6 sm:mt-8">
        <div className={`aspect-[4/3] w-full sm:aspect-[21/9] ${block}`} />
      </div>

      <div className="container-site mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-36 ${block}`} />
        ))}
      </div>
    </div>
  );
}