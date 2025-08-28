import classNames from "classnames";
const Logo: React.FC<{ type: "footer-logo" | "navbar-logo" }> = ({
  type,
  ...props
}) => {
  return (
    <img src={"/img/logo.png"} alt="Pretium Concept logo" className={classNames("", {
      "w-12": type == "navbar-logo",
      "w-32": type == "footer-logo",
    })} {...props} />
  )

};

export default Logo;
