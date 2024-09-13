import http from 'k6/http';

export function getStoreToken(accessToken, refreshToken){
    const jar = http.cookieJar();
    
     let response=http.get('https://sangam.test.unistore.tech/auth/login',{
        headers:{
            'Content-Type': 'application/json',
            'Cookie':'access_token=' +accessToken + '; refresh_token='+refreshToken
        }
    })
    // if(response.status !== 200){
	// 	console.log("ERROR:", response.status)
	// }
    const cookiesURL = jar.cookiesForURL(response.url);
    // for(const name in  cookiesURL.cookies){
    //     if(response.cookies.hasOwnProperty(name)!== undefined){
    //         console.log(response.cookies[name][0]);
    //     }
    // }
    // console.log(cookiesURL);
  

	return cookiesURL;
}