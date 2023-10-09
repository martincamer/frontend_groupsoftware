import { Link } from "react-router-dom";

export const Button = ({ cssPersonalizado, texto, href }) => {
  return (
    <div>
      <Link className={`${cssPersonalizado}`} to={`${href}`}>
        {texto}
      </Link>
    </div>
  );
};
