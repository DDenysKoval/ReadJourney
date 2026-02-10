export default function Workout() {
  return (
    <div className="w-full bg-light-gray rounded-xl p-5">
      <h1 className="mb-5 text-white">Start your workout</h1>
      <ol className="mb-5 flex flex-col gap-5">
        <li className="flex gap-3">
          <div className="flex justify-center items-center w-10 h-10 rounded-[50%] bg-white shrink-0 text-[18px] font-bold">
            1
          </div>
          <p className="text-very-light-gray text-[14px] leading-[1.29] tracking-[-0.02em]">
            <span className="text-white">Create a personal library:</span> add
            the books you intend to read to it.
          </p>
        </li>
        <li className="flex gap-3">
          <div className="flex justify-center items-center w-10 h-10 rounded-[50%] bg-white shrink-0 text-[18px] font-bold">
            2
          </div>
          <p className="text-very-light-gray text-[14px] leading-[1.29] tracking-[-0.02em]">
            <span className="text-white">Create your first workout:</span>{" "}
            define a goal, choose a period, start training.
          </p>
        </li>
      </ol>
      <div className="flex justify-between">
        <a
          className="text-very-light-gray hover:text-white underline"
          href="/library"
        >
          My library
        </a>
        <a href="/login">
          <svg height={24} width={24}>
            <use href="/icons.svg#login"></use>
          </svg>
        </a>
      </div>
    </div>
  );
}
