const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-1 pt-5">
      <p className="text-center mt-1 fw-bold">
        ShopIT &copy; {currentYear} All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
