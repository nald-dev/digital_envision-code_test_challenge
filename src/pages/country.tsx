import { useEffect, useState } from "react"

import { useLocation } from "react-router"
import queryString from 'qs'
import { Helmet } from 'react-helmet'

import CountryInterface from "../models/country-interface"
import API from "../references/API"
import InformationPoint from "../components/information-point"

function Country() {
    const { search, state } = useLocation()

    const [ countryDetails, setCountryDetails ] = useState<CountryInterface | undefined>((state as any)?.item)

    useEffect(() => {
        if (countryDetails === undefined) {
            loadCountryDetails()
        }
    }, [countryDetails])

    return (
        <div
            className = 'container'
        >
            <Helmet>
                <title>{countryDetails?.name || 'Country Details'}</title>
            </Helmet>

            <h1>
                Country Details
            </h1>
            
            <InformationPoint
                title = 'Name'
                value = {countryDetails?.name}
            />

            <InformationPoint
                title = 'Alpha 2 Code'
                value = {countryDetails?.alpha2Code}
            />

            <InformationPoint
                title = 'Alpha 3 Code'
                value = {countryDetails?.alpha3Code}
            />

            <InformationPoint
                title = 'Continent'
                value = {countryDetails?.continent?.name}
            />

            <InformationPoint
                title = 'Capital'
                value = {countryDetails?.capital?.name}
            />

            <InformationPoint
                title = 'Cities'
                value = {`${(countryDetails?.cities.length || 0).toLocaleString()} cities`}
            />

            <InformationPoint
                title = 'Languages'
                value = {countryDetails?.languages.map(language => language.name).join(', ')}
            />

            <InformationPoint
                title = 'Coordinate'
                value = {countryDetails ? `${countryDetails.location.lat}, ${countryDetails.location.long}` : ''}
            />

            <InformationPoint
                title = 'Population'
                value = {`${(countryDetails?.population || 0).toLocaleString()} persons`}
            />

            <InformationPoint
                title = 'VAT Rate'
                value = {(countryDetails?.vatRate || '').toString()}
            />

            <InformationPoint
                title = 'Currencies'
                value = {countryDetails?.currencies.map(currency => currency.name).join(', ')}
            />

            <InformationPoint
                title = 'Calling Codes'
                value = {countryDetails?.callingCodes.join(', ')}
            />
        </div>
    )

    async function loadCountryDetails() {
        const query = queryString.parse(search, {
            ignoreQueryPrefix: true
        })

        const name = query.name as string

        try {
            const { data } = await API.getSingleCountryDetails({
                name
            })
    
            if (data.countries.length > 0) {
                setCountryDetails(data.countries[0])
            }
        } catch (err: any) {
            console.error(err)
        }
    }
}

export default Country