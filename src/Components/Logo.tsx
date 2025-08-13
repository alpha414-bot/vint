import classNames from "classnames";
const Logo: React.FC<{ type: "footer-logo" | "navbar-logo" }> = ({
  type,
  ...props
}) => {
  return (
    <img src={type == "footer-logo" ? "/img/logo.png" : "/img/icon.png"} alt="Emeralds venture logo" className={classNames("", {
      "w-12": type == "navbar-logo",
      "w-32": type == "footer-logo",
    })} {...props} />
  )

};

export default Logo;
