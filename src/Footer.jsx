function Footer() {
  return (
    <footer className="w-full bg-[#5a3825] text-yellow-200 py-4 text-center border-t-4 border-[#3a2418]">
      <div className="inline-block bg-[#d1a355] text-[#3a2418] border-4 border-[#3a2418] px-4 py-2 shadow-pixel">
        <p className="text-sm font-['Press_Start_2P'] tracking-wide">
          &copy; {new Date().getFullYear()} Course NoteApp.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
