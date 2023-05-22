import axios from 'axios'

export const conekta = async (resource: string) => {
  const options = {
    url: `https://api.conekta.io/${resource}`,
    headers: {
      'accept': 'application/vnd.conekta-v2.1.0+json',
      'Accept-Language': 'es',
      'content-type': 'application/json',
      // TODO: remplazar lectura de token desde env
      'authorization': 'Bearer key_koFabVrcTbXD3Xla4fTCdNX'
    },
    data: { corporate: false }
  }

  const get = async () => {}
  const post = async (data: any) => {
    return await axios
      .request({ ...options, method: 'POST', data: { ...options.data, ...data } })
      .then((response) => response.data)
  }
  const put = async () => {}
  const destroy = async () => {}

  return {
    get,
    post,
    put,
    delete: destroy
  }
}
