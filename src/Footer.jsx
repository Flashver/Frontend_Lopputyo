function Footer() {
  return (
    <footer className="w-full bg-orange-900 text-yellow-200 py-4 text-center border-t-4 border-orange-950">
      <div className="inline-block bg-yellow-600 text-orange-950 border-4 border-orange-950 px-4 py-2 shadow-pixel">
        <p className="text-sm font-['Press_Start_2P'] tracking-wide">
          &copy; {new Date().getFullYear()} Course NoteApp.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
