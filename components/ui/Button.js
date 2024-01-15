import Link from 'next/link';
import classes from './Button.module.css';

const Button = ({ link, children, onClick }) => {
  if (!link) {
    return (
      <button onClick={onClick} className={classes.btn}>
        {children}
      </button>
    );
  }

  return (
    <Link href={link} className={classes.btn}>
      {children}
    </Link>
  );
};

export default Button;
