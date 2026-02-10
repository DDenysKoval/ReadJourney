export default function LogoLink() {
  return (
    <a className="block" href="/">
      <svg width={42} height={17}>
        <use href="/icons.svg#logo"></use>
      </svg>
    </a>
  );
}
