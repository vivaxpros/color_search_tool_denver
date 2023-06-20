import full_logo from "../data/full_logo.png";

export default function Header() {
  return (
    <div className="header_outline">
      <a href="https://www.vivaxpros.com">
        <img src={full_logo} className="header_logo"></img>
      </a>
      <h3 className="header_contact header_hidden">
        Denver <br />{" "}
        <a className="no_dec" href="tel:7203319735">
          720-331-9735
        </a>
      </h3>
      <h3 className="header_contact header_hidden">
        Grand Junction <br />{" "}
        <a className="no_dec" href="tel:9705491823">
          970-549-1823
        </a>
      </h3>
      <h3 className="header_contact header_hidden">
        Loveland / Fort Collins <br />{" "}
        <a className="no_dec" href="tel:9709888578">
          970-988-8578
        </a>
      </h3>
      {/* <h3 className="header_hidden">
        Book a free <br /> estimate!
      </h3> */}
    </div>
  );
}
