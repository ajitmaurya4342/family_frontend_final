import axios from 'axios'
import { getOptions } from './collection'
import { URL_BASE } from './constants'
import { TokenService, CountryService } from '@/services/storage.service'

export const makeRequest = (endpoint, method = null, token = null, data = null) => {
    if (data == null) {
        data = {}
    }
    let country = CountryService.getCountry()
    let city = window.localStorage.getItem('City')
    city = JSON.parse(city)
    if (!country) {
        country = 195
    }
    if (!token) {
        token = TokenService.getToken();
    }


    data['CountryID'] = country.CountryID
    data['CityID'] = city == null ? 0 : city.CityID
    console.log('URL_BASE :', URL_BASE)
    const url = URL_BASE + endpoint
        // const url = endpoint
    const options = getOptions(url, method, token, data)
    return new Promise((resolve, reject) => {
        axios(options)
            .then(res => resolve({ error: false, res: res }))
            .catch(error => {
                reject({ error: true, res: null })
            })
    })
}

export const makeRequestDirect = (endpoint, method = null, token = null, data = null) => {
    // const url = URL_BASE + endpoint;
    const url = URL_BASE
    const options = getOptions(url, method, token, data)
    return new Promise((resolve, reject) => {
        axios(options)
            .then(res => resolve({ error: false, res: res }))
            .catch(error => {
                reject({ error: true, res: null })
            })
    })
}