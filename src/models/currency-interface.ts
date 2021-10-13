export default interface CurrencyInterface {
  __typename: string;
  name: string;
  isoCode: string;
  countries: {
    name: string;
  }[]
}