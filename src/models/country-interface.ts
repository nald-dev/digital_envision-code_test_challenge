export default interface CountryInterface {
  __typename: string;
  id: string;
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: CapitalInterface;
  continent: CapitalInterface;
  cities: CityInterface[];
  languages: LanguageInterface[];
  location: LocationInterface;
  population: number;
  vatRate: number;
  currencies: CurrencyInterface[];
}

interface CurrencyInterface {
  __typename: string;
  rate: number;
  name: string;
  isoCode: string;
  unitSymbols: string[];
}

interface LocationInterface {
  __typename: string;
  lat: number;
  long: number;
}

interface LanguageInterface {
  __typename: string;
  id: string;
  name: string;
}

interface CityInterface {
  __typename: string;
  id: string;
}

interface CapitalInterface {
  __typename: string;
  name: string;
}