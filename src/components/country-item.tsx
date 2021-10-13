import { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import API from '../references/API'
import CountryInterface from '../models/country-interface'

interface PropsInterface {
  item: CountryInterface,
  isoCodeTarget?: string
}

function CountryItem({ item, isoCodeTarget }: PropsInterface) {
  const [ rate, setRate ] = useState<number>()
  const [ isLoadingRate, setIsLoadingRate ] = useState(false)

  const history = useHistory()

  useEffect(() => {
    getRate()
  }, [isoCodeTarget])

  return (
    <div
      className = 'country-item-container'
    >
      <a
        href = 'javascript:void(0)'
        onClick = {() => {
          history.push(`country?name=${item.name}`, { item })
        }}
      >
        1 {item.name} ({item.currencies.length > 0 ? item.currencies[0].name : 'No Currency Data Available'})
      </a>

      {
        isLoadingRate ?
          <div
            className = 'loader'
          />
          :
          <div
            className = 'country-item-rate'
            style = {{
              color: rate ? 'green' : 'darkgray',
              fontWeight: rate ? 'bold' : 'normal'
            }}
          >
            {rate ? `${rate} ${isoCodeTarget}` : 'null'}
          </div>
      }
    </div>
  )

  async function getRate() {
    setIsLoadingRate(true)
    setRate(undefined)

    try {
        const { data } = await API.getRate({
          fromCountryName: item.name,
          isoCodeTarget: isoCodeTarget!
        })
    
        if (data.countries.length > 0 && data.countries[0].currencies.length > 0) {
          setRate(data.countries[0].currencies[0].rate)
        }
    } catch (err: any) {
        console.error(err)
    }

    setIsLoadingRate(false)
  }
}

export default CountryItem
