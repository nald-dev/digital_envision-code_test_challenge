import { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import Select from 'react-select'

import CountryItem from '../components/country-item'
import { DEFAULT_CURRENCY_ISO_CODE, PAGINATION_LIMIT } from '../references/constants'
import API from '../references/API'
import CurrencyInterface from '../models/currency-interface'
import CountryInterface from '../models/country-interface'

function Home() {
  const [ selectedCurrency, setSelectedCurrency ] = useState<CurrencyInterface>()
  const [ currencies, setCurrencies ] = useState<CurrencyInterface[]>([])

  const [ countries, setCountries ] = useState<CountryInterface[]>([])

  const [ isLastPage, setIsLastPage ] = useState(false)

  const [ isLoadingCountries, setIsLoadingCountries ] = useState(false)

  useEffect(() => {
    loadAllCurrencies()
    loadCountries()
  }, [])

  const currencyDropdownOptions = currencies.map(({ isoCode, name, countries }) => {
    const countriesName = countries.length > 0 ? `(${countries.map(country => country.name).join(', ')})` : ''

    return {
      value: isoCode,
      label: `${isoCode} - ${name} ${countriesName}`
    }
  })

  return (
    <div
      className = 'container'
    >
      <Helmet>
          <title>Currency Converter</title>
      </Helmet>

      <h1>
        Currency Converter
      </h1>

      <div
        className = 'dropdown-container'
      >
        <Select
          options = {currencyDropdownOptions}
          onChange = {selectedOption => {
            const newSelectedCurrency = currencies.find(({ isoCode }) => selectedOption!.value === isoCode)

            setSelectedCurrency(newSelectedCurrency)
          }}
          value = {
            selectedCurrency ?
              {
                value: selectedCurrency.isoCode,
                label: `${selectedCurrency.isoCode} - ${selectedCurrency.name}`
              }
              :
              undefined
          }
        />
      </div>

      {
        countries.map(country => {
          return (
            <CountryItem
              key = {country.id}
              item = {country}
              isoCodeTarget = {selectedCurrency?.isoCode}
            />
          )
        })
      }

      {
        !isLastPage &&
          (
            isLoadingCountries ?
              <div
                className = 'loader'
                style = {{
                  marginTop: 20
                }}
              />
              :
              <button
                onClick = {loadCountries}
                className = 'load-more-button'
              >
                Load More
              </button>
          )
      }
    </div>
  )

  async function loadAllCurrencies() {
    try {
      const { data } = await API.getAllCurrencies()
  
      const retrievedCurrencies = data.currencies as CurrencyInterface[]
  
      if (retrievedCurrencies.length > 0) {
        const newSelectedCurrency = retrievedCurrencies.find(({ isoCode }) => isoCode === DEFAULT_CURRENCY_ISO_CODE)
  
        setSelectedCurrency(newSelectedCurrency)
      }
  
      setCurrencies(retrievedCurrencies)
    } catch (err: any) {
      console.error(err)
    }
  }

  async function loadCountries() {
    setIsLoadingCountries(true)

    try {
      const { data } = await API.getCountries({
        limit: PAGINATION_LIMIT,
        skip: countries.length
      })
  
      const retrievedCountries = data.countries as CountryInterface[]
  
      if (retrievedCountries.length < PAGINATION_LIMIT) {
        setIsLastPage(true)
      }
  
      setCountries(countries.concat(retrievedCountries))
    } catch (err: any) {
      console.error(err)
    }

    setIsLoadingCountries(false)
  }
}

export default Home
