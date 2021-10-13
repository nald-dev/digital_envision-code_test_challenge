import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: `https://api.everbase.co/graphql?api_key=${process.env.REACT_APP_API_KEY}`,
  cache: new InMemoryCache()
})

const API = {
    getAllCurrencies,
    getCountries,
    getSingleCountryDetails,
    getRate
}

export default API

async function getAllCurrencies() {
    return await client.query({
        query: gql`
            query getAllCurrencies {
                currencies {
                    name
                    isoCode,
                    countries {
                        name
                    }
                }
            }
        `
    })
}

interface GetCountriesParamsInterface {
    limit: number
    skip: number
}

async function getCountries(preferences: GetCountriesParamsInterface) {
    const { limit, skip } = preferences

    return await client.query({
        query: gql`
            query getCountries {
                countries(limit: ${limit}, skip: ${skip}) {
                    id
                    name
                    alpha2Code
                    alpha3Code
                    callingCodes
                    capital {
                        name
                    }
                    continent {
                        name
                    }
                    cities {
                        id
                    }
                    languages {
                        id
                        name
                    }
                    location {
                        lat
                        long
                    }
                    population
                    vatRate
                    currencies {
                        name
                        isoCode
                        unitSymbols
                    }
                }
            }
        `
    })
}

interface GetSingleCountryDetails {
    name: string;
}

async function getSingleCountryDetails(preferences: GetSingleCountryDetails) {
    const { name } = preferences

    return await client.query({
        query: gql`
            query getCountries {
                countries(where: {name: {eq: "${name}"}}) {
                    id
                    name
                    alpha2Code
                    alpha3Code
                    callingCodes
                    capital {
                        name
                    }
                    continent {
                        name
                    }
                    cities {
                        id
                    }
                    languages {
                        id
                        name
                    }
                    location {
                        lat
                        long
                    }
                    population
                    vatRate
                    currencies {
                        name
                        isoCode
                        unitSymbols
                    }
                }
            }
        `
    })
}

interface GetRateParamsInterface {
    fromCountryName: string,
    isoCodeTarget: string
}

async function getRate(preferences: GetRateParamsInterface) {
    const { fromCountryName, isoCodeTarget } = preferences

    return await client.query({
        query: gql`
            query getRates {
                countries(where: {name: {eq: "${fromCountryName}"}}) {
                    currencies {
                        rate: convert(amount: 1, to: "${isoCodeTarget}")
                    }
                }
            }
        `
    })
}
