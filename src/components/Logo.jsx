import './logo.css';
import logo from '../logo/logo.svg';

const Logo = () => {
  return (
    <div className="logo">
      <object type="image/svg+xml" data={logo}>
        <img src={logo} alt="logo" id="logo" />
      </object>
    </div>
  );
};

export default Logo;
