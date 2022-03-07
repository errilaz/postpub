import React from "react"
import { Link } from "react-router-dom"
import { InitialProps } from "../common";
import { Country } from "../common/api";

interface Props {
  countries: Country[];
}

const Home = ({ countries }: Props) => {
  return (
    <div>
      <div>
        <Link to="/about">About</Link>
      </div>
      <ul>
        {countries.map(country => (
          <li key={country.numeric_code}>{country.official_name} is <b>real great</b></li>
        ))}
      </ul>
    </div>
  );
};

Home.getInitialProps = async ({ api }: InitialProps) => {
  const countries = await api.country.select("*").fetch();
  return { countries };
};

export default Home;
