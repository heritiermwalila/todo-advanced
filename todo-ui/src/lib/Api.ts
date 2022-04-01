export default class Api {
   
    constructor(private readonly host: string){
        
    }

    /**
     * 
     * @returns 
     */
    request(){
        let timer = setTimeout(() =>Promise.reject('Request timeout'), 30000)

           return {
               /**
                * 
                * @param endpoint 
                * @returns 
                */
               get: async (endpoint: string) => {
                    try {
                        const res = await fetch(this.getEndpoint(endpoint))
                        const data = await res.json()
                        if(data){
                            clearTimeout(timer)
                        }
                        return data
                    } catch (error) {
                        return Promise.reject(error)
                    }
               },
               post: async <T>(endpoint: string, payload: T) => {
                    try {
                        const res = await fetch(this.getEndpoint(endpoint), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(payload)
                        })
                        const data = await res.json()

                        if(data){
                            clearTimeout(timer)
                        }
                        return data
                    } catch (error) {
                        return Promise.reject(error)
                    }
               },
               delete: async <T>(endpoint: string, payload:T) => {
                    try {
                        const res = await fetch(this.getEndpoint(endpoint), {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(payload)
                        })
                        const data = await res.json()

                        if(data){
                            clearTimeout(timer)
                        }
                        return data
                    } catch (error) {
                        return Promise.reject(error)
                    }
               },
               patch: async <T>(endpoint: string, payload: T) => {
                    try {
                        const res = await fetch(this.getEndpoint(endpoint), {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(payload)
                        })
                        const data = await res.json()

                        if(data){
                            clearTimeout(timer)
                        }
                        return data
                    } catch (error) {
                        return Promise.reject(error)
                    }

               }
           }
    }

    /**
     * 
     * @param endpoint 
     * @returns 
     */
    private getEndpoint(endpoint: string){
        return `${this.host}/${endpoint}`
    }


}