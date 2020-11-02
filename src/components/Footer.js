import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="Footer bg-dark text-light">
      Made with
      <i className="material-icons heart">favorite</i> by
      <a
        href="https://github.com/Clumsynite"
        title="Github Profile"
        className="link"
        target="_blank"
        rel="noreferrer"
      >
        Clumsyknight
      </a>
    </footer>
  );
};

export default Footer;
