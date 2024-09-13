import http from 'k6/http';


// get config details
// const config =  init.getActiveConfig().CONTENT
// const baseUrl = config.baseUrl;

// returns an authentication token
export function login() {
    let body = JSON.stringify({
        email: 'shivam.garg@test.com',
        password: 'Unistore@1',
    });
	let merchantResponse = http.post('https://account.test.unistore.tech/api/auth/login', body, 
        {
		headers: {
			'Content-Type': 'application/json'
		},
	})
    if(merchantResponse.status == 200){
        // merchantToken = JSON.stringify(merchantResponse.cookies);
        // console.log(merchantToken)
    }    
        return merchantResponse;
}
 