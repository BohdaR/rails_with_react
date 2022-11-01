import React from 'react';
import {container,
  footer,
  copyright,
  support,
  facebook,
  social,
  tweeter,
  linkedin} from '../stylesheets/footer.module.css'

const Footer = () => {
  return (
    <footer className={footer}>
      <div className={container}>
        <div className={copyright}>
          <p>Copyright &copy;2022 CyberCraft</p>
        </div>
        <div className={social}>
          <a href="#" className={support}>Contact Us</a>
          <a href="#" className={facebook}>f</a>
          <a href="#" className={tweeter}>t</a>
          <a href="#" className={linkedin}>in</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
