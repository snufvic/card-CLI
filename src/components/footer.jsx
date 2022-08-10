const Footer = () => {
  return (
    <footer className="border-top py-3 text-center bg-dark text-light">
      <span>
        <i className="bi bi-window-sidebar"></i> Amit W App
      </span>
      <span className="mx-1">&copy;</span>
      <span>{new Date().getFullYear()}</span>
    </footer>
  );
};

export default Footer;
